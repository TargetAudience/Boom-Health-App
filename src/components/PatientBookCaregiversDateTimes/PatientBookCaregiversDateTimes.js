import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Colors, Globals} from '@constants/GlobalStyles';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  ListItemImage,
  AppText,
} from '@components/common';
import images from '@assets/images';
import styles from './PatientBookCaregiversDateTimes.styles';
import {FormStyles} from '@constants/GlobalStyles';
import {pluralize} from '@utils/Globals';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

const distances = [
  {key: '1', label: '1 hour', value: '1'},
  {key: '2', label: '2 hours', value: '2'},
  {key: '3', label: '3 hours', value: '3'},
  {key: '4', label: '4 hours', value: '4'},
  {key: '5', label: '5 hours', value: '5'},
  {key: '6', label: '6 hours', value: '6'},
  {key: '7', label: '7 hours', value: '7'},
  {key: '8', label: '8 hours', value: '8'},
  {key: '9', label: '9 hours', value: '9'},
  {key: '10', label: '10 hours', value: '10'},
  {key: '11', label: '11 hours', value: '11'},
  {key: '12', label: '12 hours', value: '12'},
  {key: '13', label: '13 hours', value: '13'},
  {key: '14', label: '14 hours', value: '14'},
  {key: '15', label: '15 hours', value: '15'},
  {key: '16', label: '16 hours', value: '16'},
];

class PatientBookCaregiversDateTimes extends Component {
  constructor(props) {
    super(props);

    const services = this.props.navigation.getParam('services', []);

    this.state = {
      time: null,
      services,
      isDatePickerVisible: false,
      isTimePickerVisible: false,

      caregiverTimes: {
        date: '',
        dateB: '',
        startTime: '',
        numberOfHours: '',
        urgency: 'non-urgent',
      },
      initialTime: new Date(),
    };

    this.hoursRef = React.createRef();

    this.onPressLengthOfVisit = this.onPressLengthOfVisit.bind(this);
    this.inputAccessoryView = this.inputAccessoryView.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Book Caregivers Scheduled Care');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {actions, navigation, subRole} = this.props;
    const {services, caregiverTimes} = this.state;

    if (
      caregiverTimes.date === '' ||
      caregiverTimes.startTime === '' ||
      caregiverTimes.numberOfHours === ''
    ) {
      actions.setAlert(
        'Be sure to enter a date, start time, and length of visit.',
      );
      return;
    }

    const caregiverSend = {
      caregiverTimes,
      extra: null,
    };

    navigation.navigate('PatientBookCaregiversResult', {
      services,
      caregiverTimes: caregiverSend,
    });
  };

  // First button
  onPressDateTime = () => {
    this.setState({isDatePickerVisible: true});
  };

  // Second button
  onPressStartTime = () => {
    this.setState({isTimePickerVisible: true});
  };

  // Third button
  onPressLengthOfVisit() {
    if (Platform.OS === 'android') {
      this.hoursRef.current.focus();
    } else {
      this.hoursRef.current.togglePicker(true);
    }
  }

  onPressLengthOfVisitConfirm() {
    const {caregiverTimes, time} = this.state;

    if (Platform.OS === 'ios') {
      this.hoursRef.current.togglePicker(false);
    }

    let revisedCaregiver = _.cloneDeep(caregiverTimes);
    revisedCaregiver.numberOfHours = time;
    this.setState({caregiverTimes: revisedCaregiver});
  }

  onPressTimeConfirm = time => {
    const {caregiverTimes} = this.state;

    const formattedTime = moment(time).format('h:mm a').toUpperCase();

    let revisedCaregiver = _.cloneDeep(caregiverTimes);
    revisedCaregiver.startTime = formattedTime;
    this.setState({caregiverTimes: revisedCaregiver});
    this.hideTimePicker();
  };

  onPressDateConfirm = date => {
    const {caregiverTimes} = this.state;

    const formattedDate = moment(date).format('ddd, MMM. D, YYYY');
    const dateB = moment(date).format('YYYY-MM-DD');

    let revisedCaregiver = _.cloneDeep(caregiverTimes);
    revisedCaregiver.date = formattedDate;
    revisedCaregiver.dateB = dateB;
    this.setState({caregiverTimes: revisedCaregiver});

    this.hideDatePicker();
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  inputAccessoryView() {
    return (
      <View style={defaultStyles.modalViewMiddle}>
        <Text></Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.onPressLengthOfVisitConfirm();
          }}
          hitSlop={{top: 4, right: 4, bottom: 4, left: 4}}>
          <View testID="needed_for_touchable">
            <Text style={defaultStyles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const {
      time,
      initialTime,
      isTimePickerVisible,
      isDatePickerVisible,
      caregiverTimes,
    } = this.state;

    const displayNumHours = caregiverTimes.numberOfHours
      ? pluralize(caregiverTimes.numberOfHours, 'hour', true)
      : '';

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingBottom: insets.bottom, paddingTop: insets.top},
            ]}>
            <CustomHeaderBack
              title="Scheduled Care"
              onPressBack={this.onPressBack}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={new Date()}
              minuteInterval={30}
              onConfirm={this.onPressDateConfirm}
              onCancel={this.hideDatePicker}
              headerTextIOS="Select a date"
              isDarkModeEnabled={false}
              textColor="black"
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              is24Hour={false}
              date={initialTime}
              minuteInterval={30}
              onConfirm={this.onPressTimeConfirm}
              onCancel={this.hideTimePicker}
              headerTextIOS="Select a time"
              isDarkModeEnabled={false}
              textColor="black"
            />
            <RNPickerSelect
              ref={Platform.OS === 'ios' ? this.hoursRef : null}
              pickerProps={{
                ref: Platform.OS === 'android' ? this.hoursRef : null,
              }}
              value={time}
              onValueChange={text => {
                this.setState({time: text});
                if (Platform.OS === 'android') {
                  this.onPressLengthOfVisitConfirm();
                }
              }}
              useNativeAndroidPickerStyle={true}
              style={pickerStyles}
              items={distances}
              fixAndroidTouchableBug={true}
              InputAccessoryView={this.inputAccessoryView}
            />
            <ScrollView style={styles.containerB}>
              <View style={styles.introContainer}>
                <AppText textWeight="300" style={styles.textIntro}>
                  Please select the arrival time for your caregiver:
                </AppText>
              </View>
              <View style={styles.messageContainerB}>
                <ListItemImage
                  onPress={this.onPressDateTime}
                  mainText="Date"
                  selectionText={caregiverTimes.date}
                  selectionImage={images.calendarDate}
                  selectionImageStyle={styles.listItemImage}
                />
                <ListItemImage
                  onPress={this.onPressStartTime}
                  mainText="Start Time"
                  selectionText={caregiverTimes.startTime}
                  selectionImage={images.clockWhite}
                  selectionImageStyle={styles.listItemImage}
                />
                <ListItemImage
                  onPress={this.onPressLengthOfVisit}
                  mainText="Length of Visit"
                  selectionText={displayNumHours}
                  selectionImage={images.clockWhite}
                  selectionImageStyle={styles.listItemImage}
                />
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerInner}>
                <AppButton
                  style={styles.button}
                  onPress={this.onPressNext}
                  width={width - 20}
                  height={42}
                  backgroundColor={Colors.buttonMain}
                  disabled={false}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.buttonText}>
                    NEXT
                  </AppText>
                </AppButton>
              </View>
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const inputStyles = {
  ...FormStyles.inputContainer,
  paddingLeft: 10,
  backgroundColor: null,
  borderWidth: 0,
  justifyContent: 'flex-start',
  color: '#1c1c1c',
};

const pickerStyles = StyleSheet.create({
  useNativeAndroidPickerStyle: false,
  inputAndroid: inputStyles,
  inputIOSContainer: inputStyles,
  viewContainer: {height: 0},
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  subRole: state.auth.subRole,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBookCaregiversDateTimes);
