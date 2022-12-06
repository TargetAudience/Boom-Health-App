import React, { Component } from 'react'
import { TouchableHighlight, TouchableOpacity, Image, StyleSheet, View, Easing, Dimensions, Text } from 'react-native'
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ButtonLoading, InputWithLabel, FormWrapper, CheckmarkToggle, AlertModal } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import { getItemFromKey, nearestPastMinutes } from '@utils/Globals';
import _ from 'lodash';
import moment from 'moment';

import CaregiverAvailabilityApi from '@api/caregiverAvailabilityApi';

import * as CaregiverAvailabilityActions from '@ducks/caregiverAvailability';
import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class ModalAddTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: props.selectedDate,
      buttonEnabled: true,
      actionLoading: false,
      note: '',
      isTimePickerVisible: false,
      startTimeDisplay: '12:00 AM',
      endTimeDisplay: '12:00 PM',
      startTimeChanged: false,
      endTimeChanged: false
    }
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    this.setState({selectedDate: newprops.selectedDate});
  }

  onPressClose = () => {
    const { onPressCancel } = this.props;
    onPressCancel();
  }

  onPressSave = () => {
    const { actions, defaultTimes, onPressSaved, specificTimes } = this.props;
    const {
      startTimeDisplay,
      endTimeDisplay,
      note,
      selectedDate
    } = this.state;

    const times = specificTimes.filter(item => item.date === selectedDate);

    const format = 'HH:mm';

    const startChanged = moment(startTimeDisplay, ['h:mm A'], format);
    const endChanged = moment(endTimeDisplay, ['h:mm A'], format);

    let stop = false;
    
    times.some(function (item, index) {
      const start = moment(item.start, ['h:mm A'], format);
      const end = moment(item.end, ['h:mm A'], format);

      if (startChanged.isSame(endChanged)) {
        actions.setAlertModal('The start time and end time are the same.');
        stop = true;
        return;
      }
      if (moment(endChanged).isBefore(startChanged)) {
        actions.setAlertModal('The end time is before the start time.');
        stop = true;
        return;
      }
      if (startChanged.isBetween(start, end) || startChanged.isSame(start)) {
        actions.setAlertModal('The time is between an existing time.');
        stop = true;
        return;
      }
      if (start.isBetween(startChanged, endChanged)) {
        actions.setAlertModal('The time is between an existing time.');
        stop = true;
        return;
      }
    });

    if (stop) {
      return;
    }

    this.setState({ actionLoading: true });

    CaregiverAvailabilityApi.addSpecificTime({start: startTimeDisplay, end: endTimeDisplay, note, date: selectedDate })
      .promise.then(result => {
        const id = result.data.id;

        actions.addSpecificTime({id, start: startTimeDisplay, end: endTimeDisplay, note, date: selectedDate });

        onPressSaved();

        this.setState({ actionLoading: false });
        this.resetTime();
      })
      .catch(error => {
        console.debug('error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  };

  onPressStartTime = () => {
    this.setState({ isTimePickerVisible: true, timeType: 'startTime' });
  };

  onPressEndTime = () => {
    this.setState({ isTimePickerVisible: true, timeType: 'endTime' });
  };

  onPressTimeConfirm = time => {
    const { timeType, timesArrChanged } = this.state;

    const nearestPastMin = nearestPastMinutes(15, moment(time));
    const formattedTime = moment(nearestPastMin)
      .format('h:mm a')
      .toUpperCase();

    if (timeType === 'startTime') {
      this.setState({
        startTimeDisplay: formattedTime,
        startTimeChanged: true
      });
    } else {
      this.setState({ endTimeDisplay: formattedTime, endTimeChanged: true });
    }
    this.hideTimePicker();
  };

  resetTime() {
    this.setState({
      startTimeDisplay: '12:00 AM',
      endTimeDisplay: '12:00 PM',
      startTimeChanged: false,
      endTimeChanged: false,
      note: ''
    });
  }

  onModalHide = () => {
    const { actions } = this.props;

    this.resetTime();
    
    actions.clearAlertModal();
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  render() {
    const { isOpen, onPressCancel } = this.props;
    const { currentDay, buttonEnabled, actionLoading, note, isTimePickerVisible, startTimeChanged, endTimeChanged, startTimeDisplay, endTimeDisplay } = this.state;

    const textStartTimeStyle = startTimeChanged ? styles.timeActive : '';
    const textEndTimeStyle = endTimeChanged ? styles.timeActive : '';

    const buttonActive = startTimeChanged && endTimeChanged;

    return (
      <Modal
        onModalHide = {() => {this.onModalHide()}}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCancel}>
          <AlertModal />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            is24Hour={false}
            date={new Date()}
            minuteInterval={15}
            onConfirm={this.onPressTimeConfirm}
            onCancel={this.hideTimePicker}
            headerTextIOS="Select a time"
            isDarkModeEnabled={false}
            textColor="black"
          />
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>
              Add Specific Time
            </Text>

            <TouchableHighlight style={styles.topButtonClose} onPress={this.onPressClose} underlayColor="transparent" hitSlop={ {top: 15, bottom: 15, left: 15, right: 15} }>
              <Image source={images.cancel} style={styles.iconCancel} />
            </TouchableHighlight>

            <View style={styles.container}>
              <View style={styles.containerTimes}>
                <View style={styles.containerTime}>
                  <Text style={styles.textTime}>START</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.onPressStartTime}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <View style={styles.timeButtonBackground}>
                      <Text style={[styles.textTimeButton, textStartTimeStyle]}>
                        {startTimeDisplay}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.containerTime, { marginLeft: 15 }]}>
                  <Text style={styles.textTime}>END</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.onPressEndTime}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <View style={styles.timeButtonBackground}>
                      <Text style={[styles.textTimeButton, textEndTimeStyle]}>
                        {endTimeDisplay}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <FormWrapper style={styles.topGap}>
                <InputWithLabel
                  onRef={this.lastNameInputRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={64}
                  numberOfLines={1}
                  returnKeyType="next"
                  label="Note"
                  value={note}
                  onChangeText={text => this.setState({ note: text })}
                />
              </FormWrapper>
            </View>

            <View style={styles.buttonBottomContainer}>
              <ButtonLoading
                onPress={this.onPressSave}
                disabled={!buttonActive}
                isLoading={actionLoading}
                containerDisabledStyle={styles.buttonBottomDisabled}
                containerStyle={styles.buttonBottom}>
                <Text
                  style={
                    !buttonActive
                      ? styles.buttonBottomTextDisabled
                      : styles.buttonBottomText
                  }>
                  Save
                </Text>
              </ButtonLoading>
            </View>
          </View>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...CaregiverAvailabilityActions,
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  caregiverAvailability: state.caregiverAvailability,
  defaultTimes: state.caregiverAvailability.defaultTimes,
  specificTimes: state.caregiverAvailability.specificTimes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddTime);

const Checkmark = ({ text, secondaryText, checked, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={1}
    underlayColor={Colors.white}>
    <View style={styles.deliveryOuter}>
      <View style={styles.deliveryInner}>
        <CheckmarkToggle checked={checked} onPress={onPress} />
        <Text style={styles.textCheckmark}>{text}</Text>
      </View>
      <Text style={styles.textCheckmark2}>{secondaryText}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  deliveryOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deliveryContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  deliveryBottomLine: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  textDelivery: {
    fontSize: 14.5,
    paddingBottom: 12,
    textAlign: 'left',
    fontWeight: '600'
  },
  textDelivery2: {
    fontSize: 14.5,
    paddingBottom: 12,
    lineHeight: 19,
    textAlign: 'left',
    fontWeight: '400'
  },
  deliveryInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  textCheckmark: {
    fontSize: 14,
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'left',
    fontWeight: '500'
  },
  textCheckmark2: {
    fontSize: 14,
    marginLeft: 12,
    marginTop: 2,
    textAlign: 'left',
    fontWeight: '400'
  },
  leftLabelText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 12,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  checkMarkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'flex-start',
  },
  topGap: {
    marginTop: 16,
    marginBottom: 20
  },
   container: {
    marginTop: 20,
    flex: 1
  },
  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 18,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#4c4c4c',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },
  iconDelete: {
    marginTop: 1,
    width: 18, 
    height: 18
  },
  timesText: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    borderRadius: 8,
    justifyContent: 'flex-start',
    height: 360, 
    width: '100%'
  },
  topButtonClose: {
    position: 'absolute',
    height: 50,
    width: 60,
    alignSelf: 'flex-end'
  },
  containerTop: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  containerTimes: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  containerTime: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  daysWrap: { marginTop: 22, marginHorizontal: 15 },
  textMessageSet: {
    fontSize: 13.5,
    lineHeight: 17,
    marginBottom: 12,
    marginLeft: 0,
    fontWeight: '400'
  },
  textTime: {
    fontSize: 14,
    lineHeight: 23,
    alignSelf: 'center',
    marginBottom: 4,
    fontWeight: '500'
  },
  icon: { marginTop: 4, width: 7.5, height: 12.5 },
  iconCancel: { position: 'absolute', top: 12, right: 12, width: 20, height: 20},
  row: { flexDirection: 'row' },
  feedbackGrid: {
    marginTop: 14,
  },
  containerText: {
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 12
  },
  textMessageMessage: {
    fontSize: 9.5,
    lineHeight: 14,
    marginBottom: 6,
    marginRight: 15,
    flex: 0,
    justifyContent: 'flex-end',
    marginTop: 20,
    textAlign: 'right',
    color: '#535353'
  },
  buttonWrap: {
    justifyContent: 'center', alignItems: 'center'
  },
  center: {
    marginTop: 20,
    justifyContent: 'center', alignItems: 'center'
  },
  textTitle: {
    fontSize: 14.5,
    lineHeight: 23
  },
  textTopLabel: {
    fontSize: 14.5,
    lineHeight: 18.5,
    fontWeight: '600'
  },
  textTopLabelPagination: {
    fontSize: 14,
    lineHeight: 18.5,
    fontWeight: '400'
  },
  textBody: {
    fontSize: 13,
    lineHeight: 18
  },
  timeButtonBackground: {
    alignSelf: 'stretch',
    backgroundColor: '#f1f1f1',
    borderRadius: 3,
    marginBottom: 6,
    height: 60,
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '600'
  },
  cancelLinkContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  buttonSignInText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.white
  },
  buttonSignInTextDisabled: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.greenTextDisabled
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 40
  },
  buttonSignInDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: '100%',
    height: 40
  },
  titleText: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 14.5,
    fontWeight: '600',
  },
  textTimeButton: {
    alignSelf: 'stretch',
    color: '#000000',
    opacity: 0.12,
    fontSize: 29,
    textAlignVertical: 'top',
    paddingHorizontal: 6,
    paddingTop: 13
  },
  timeActive: {
    opacity: 1
  },
  buttonBottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 16,
    alignSelf: 'center'
  },
  buttonBottomText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.white
  },
  buttonBottomTextDisabled: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.greenTextDisabled
  },
  buttonBottom: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 40
  },
  buttonBottomDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: '100%',
    height: 40
  },
  dim: {
    opacity: 0.5
  }
})
