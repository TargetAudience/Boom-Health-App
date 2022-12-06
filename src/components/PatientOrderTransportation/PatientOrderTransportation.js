import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import MixpanelManager from '@utils/Analytics';
import moment from 'moment';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  CustomHeaderBack,
  AppButton,
  ListItem,
  AppText,
} from '@components/common';
import {Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientOrderTransportation.styles';
import {nearestPastMinutes} from '@utils/Globals';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as TransportationActions from '@ducks/transportation';

const {width} = Dimensions.get('screen');

class PatientOrderTransportation extends Component {
  constructor(props) {
    super(props);

    this.stateSAVE = {
      pickupDate: 'THU, FEB. 3, 2020',
      pickupTime: '8:45 AM',
      pickupLocation: '123 Front St.',
      dropOffLocation: '123 Oak St.',
      specialInstructions: '',
      pickupAddress: {
        city: 'St. Catharines',
        name: 'Rob2 Stevenson2',
        phoneNumber: '9055555555',
        postalCode: 'L4S2M6',
        province: 'ON',
        street: '123 Front St.',
      },
      dropOffAddress: {
        additionalPhoneNumber: '4165555555',
        addressId: 92,
        city: 'Toronto',
        firstName: 'Jane',
        lastName: 'Smith',
        name: 'Jane Smith',
        nickname: 'My Nickname',
        phoneNumber: '4165555555',
        postalCode: 'M4L1G2',
        province: 'ON',
        street: '123 Oak St.',
      },
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      timeChanged: true,
      dateChanged: true,
      pickupAddressChanged: true,
      dropOffAddressChanged: true,
      pickupAddressSelected: 'patient',
      dropOffAddressSelected: 92,
      pickupTimeToSend: '8:45 am',
      pickupDateToSend: '2020-12-03',
      initialTime: new Date(),
      minimumTime: new Date(),
    };

    this.state = {
      pickupDate: '',
      pickupTime: '',
      pickupLocation: '',
      dropOffLocation: '',
      specialInstructions: '',
      pickupAddress: null,
      dropOffAddress: null,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      timeChanged: false,
      dateChanged: false,
      pickupAddressChanged: false,
      dropOffAddressChanged: false,
      pickupAddressSelected: null,
      dropOffAddressSelected: null,
      pickupTimeToSend: null,
      pickupDateToSend: null,
      initialTime: new Date(),
      minimumTime: new Date(),
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Transportation Home');
  }

  componentDidUpdate(prevProps, prevState) {
    const pickupAddress = this.props.navigation.getParam('pickupAddress', []);
    const dropOffAddress = this.props.navigation.getParam('dropOffAddress', []);
    const selectedAddress = this.props.navigation.getParam(
      'selectedAddress',
      [],
    );

    if (
      pickupAddress.length !== 0 &&
      prevState.pickupAddress !== pickupAddress
    ) {
      this.props.navigation.state.params = undefined;
      this.setState({pickupAddress, pickupAddressChanged: true});
    }
    if (
      dropOffAddress.length !== 0 &&
      prevState.dropOffAddress !== dropOffAddress
    ) {
      this.props.navigation.state.params = undefined;
      this.setState({dropOffAddress, dropOffAddressChanged: true});
    }
  }

  onPressBack = () => {
    const {actions, navigation} = this.props;

    actions.clearAllTransportation();

    navigation.goBack('');
  };

  onPressNext = () => {
    const {actions, navigation, transportation, subRole} = this.props;
    const {
      timeChanged,
      dateChanged,
      pickupAddressChanged,
      dropOffAddressChanged,
      pickupDateToSend,
    } = this.state;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    if (!dateChanged) {
      actions.setAlert('Please select a date for your pickup.');
      return;
    }

    if (!timeChanged) {
      actions.setAlert('Please select a time for your pickup.');
      return;
    }

    const nowFormat = 'YYYY-MM-DD HH:mm';
    const nowTime = moment().format(nowFormat);
    const earliestBookingToday = moment({hour: 8, minute: 0}).format(nowFormat);
    const lastestBookingToday = moment({hour: 22, minute: 0}).format(nowFormat);

    const isToday = moment(0, 'HH').diff(pickupDateToSend, 'days') == 0;
    if (isToday) {
      if (
        !moment(nowTime).isBetween(
          earliestBookingToday,
          lastestBookingToday,
          null,
          '[]',
        )
      ) {
        actions.setAlert(
          "Same day bookings can only be scheduled if it's currently after 8:00am or before 10:00pm.",
          'mediumDuration',
        );
        return;
      }
    }

    if (!pickupAddressChanged) {
      actions.setAlert('Please select a location for your pickup.');
      return;
    }

    if (!dropOffAddressChanged) {
      actions.setAlert('Please select a location for your drop off.');
      return;
    }

    this.setState(
      prevState => ({
        pickupAddressSelected: transportation.selectedPickup,
        dropOffAddressSelected: transportation.selectedDropOff,
      }),
      () => {
        navigation.navigate('PatientOrderTransportationPayment', {
          savedState: this.state,
        });
      },
    );
  };

  onPressPickupDate = () => {
    const {navigation, subRole} = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    this.setState({isDatePickerVisible: true});
  };

  onPressPickupTime = () => {
    const {navigation, subRole} = this.props;
    const {pickupDate} = this.state;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    const isTimeDisabled = pickupDate === '' ? true : false;

    if (!isTimeDisabled) {
      this.setState({isTimePickerVisible: true});
    }
  };

  onPressPickupLocation = () => {
    const {navigation, subRole} = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate('PatientOrderTransportationAddress', {
      addressType: 'pickup',
    });
  };

  onPressDropOffLocation = () => {
    const {navigation, subRole} = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate('PatientOrderTransportationAddress', {
      addressType: 'dropOff',
    });
  };

  onAddNote = data => {
    this.setState({specialInstructions: data.specialInstructions});
  };

  onPressSpecialInstructions = () => {
    const {navigation, subRole} = this.props;
    const {specialInstructions} = this.state;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate('PatientOrderTransportationNote', {
      onAddNote: this.onAddNote,
      specialInstructions,
    });
  };

  onPressTimeConfirm = time => {
    const nearestPastMin = nearestPastMinutes(15, moment(time));
    const formattedTime = moment(time).format('h:mm a').toUpperCase();

    const formattedTimeToSend = moment(nearestPastMin).format('h:mm a');

    this.setState({
      pickupTime: formattedTime,
      pickupTimeToSend: formattedTimeToSend,
      timeChanged: true,
    });

    this.hideTimePicker();
  };

  onPressDateConfirm = date => {
    const {pickupDateToSend, dateChanged, pickupDate} = this.state;

    const formattedDate = moment(date)
      .format('ddd, MMM. D, YYYY')
      .toUpperCase();
    const formattedDateToSendRevised = moment(date).format('YYYY-MM-DD');

    let initialTime = new Date();
    let minimumTime = new Date();

    const isToday = moment(0, 'HH').diff(date, 'days') == 0;

    if (isToday) {
      const addHours = moment().add(2, 'hours').format();
      const nearestPastMin = nearestPastMinutes(15, moment(addHours));
      initialTime = new Date(nearestPastMin);
      minimumTime = new Date(nearestPastMin);

      if (pickupDate !== '') {
        this.setState({pickupTime: null});
      }
    } else {
      minimumTime = null;
    }

    this.setState(
      prevState => ({
        initialTime,
        minimumTime,
        dateChanged: true,
        pickupDate: formattedDate,
        pickupDateToSend: formattedDateToSendRevised,
      }),
      () => {
        this.forceUpdate();
      },
    );

    this.hideDatePicker();
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  render() {
    const {transportation} = this.props;
    const {
      initialTime,
      minimumTime,
      pickupDate,
      pickupTime,
      pickupLocation,
      dropOffLocation,
      specialInstructions,
      isTimePickerVisible,
      isDatePickerVisible,
    } = this.state;

    const selectedNoteDisplay =
      specialInstructions.length < 20
        ? specialInstructions
        : `${specialInstructions.substring(0, 20)}...`;
    const isTimeDisabled = pickupDate === '' ? true : false;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingTop: insets.top, paddingBottom: insets.bottom},
            ]}>
            <CustomHeaderBack
              title="Order Transportation"
              onPressBack={this.onPressBack}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={new Date()}
              minimumDate={new Date()}
              minuteInterval={15}
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
              minimumDate={minimumTime}
              minuteInterval={15}
              onConfirm={this.onPressTimeConfirm}
              onCancel={this.hideTimePicker}
              headerTextIOS="Select a time"
              isDarkModeEnabled={false}
              textColor="black"
            />
            <ScrollView style={styles.containerB}>
              <ListItem
                onPress={this.onPressPickupDate}
                mainText="Pickup Date"
                selectionText={pickupDate}
              />
              <ListItem
                disabled={isTimeDisabled}
                onPress={this.onPressPickupTime}
                mainText="Pickup Time"
                selectionText={pickupTime}
              />
              <ListItem
                onPress={this.onPressPickupLocation}
                mainText="Pickup Location"
                selectionText={transportation.selectedPickupPreview}
              />
              <ListItem
                onPress={this.onPressDropOffLocation}
                mainText="Drop Off Location"
                selectionText={transportation.selectedDropOffPreview}
              />
              <ListItem
                onPress={this.onPressSpecialInstructions}
                mainText="Optional Instructions"
                selectionText={selectedNoteDisplay}
              />
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...TransportationActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole,
  transportation: state.transportation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientOrderTransportation);
