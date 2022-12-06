import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import _ from 'lodash';
import TimesGridItem from './TimesGridItem';
import DaysGrid from './DaysGrid';
import { ButtonLoading, AlertModal } from '@components/common';
import { calculateSchedule } from '@selectors';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import { getItemFromKey, nearestPastMinutes } from '@utils/Globals';

import CaregiverAvailabilityApi from '@api/caregiverAvailabilityApi';

import * as CaregiverAvailabilityActions from '@ducks/caregiverAvailability';
import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class ModalSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      currentDay: 0,
      resetGrid: false,
      actionLoading: false,
      isTimePickerVisible: false,
      timeType: '',
      startTimeDisplay: '12:00 AM',
      endTimeDisplay: '12:00 PM',
      startTimeChanged: false,
      endTimeChanged: false,
      timesArrChanged: false,
      gridArray: [false, false, false, false, false, false, false],
      timesPendingRemove: []
    };
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    this.setState({ currentDay: newprops.page });
  }

  onPressClose = () => {
    const { onPressCancel } = this.props;
    onPressCancel();
  };

  onPressSave = () => {
    const { actions, defaultTimes } = this.props;
    const {
      startTimeChanged,
      endTimeChanged,
      startTimeDisplay,
      endTimeDisplay,
      gridArray,
      currentDay,
      data,
      timesPendingRemove
    } = this.state;

    if (startTimeChanged && endTimeChanged) {
      const today = getItemFromKey(data, currentDay);
      const times = defaultTimes[today.short];

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

      if (times.length === 0) {
        if (startChanged.isSame(endChanged)) {
          actions.setAlertModal('The start time and end time are the same.');
          return;
        }
        if (moment(endChanged).isBefore(startChanged)) {
          actions.setAlertModal('The end time is before the start time.');
          return;
        }
      }
    }

    let newTime = null;
    if (startTimeChanged && endTimeChanged) {
      newTime = { start: startTimeDisplay, end: endTimeDisplay };
    }

    const extract = timesPendingRemove.map(item => item.index);

    let newDefaultTimes = [];
    if (timesPendingRemove.length) {
      newDefaultTimes = calculateSchedule({
        defaultTimes,
        extract,
        currentDay,
        newTime,
        gridArray,
      });
    } else {
      newDefaultTimes = calculateSchedule({
        defaultTimes,
        extract: null,
        currentDay,
        newTime,
        gridArray,
      });
    }

    actions.setDefaultTimes(newDefaultTimes);

    this.setState({ actionLoading: true });

    CaregiverAvailabilityApi.setDefaultAvailability({ times: newDefaultTimes })
      .promise.then(() => {
        this.setState({ actionLoading: false });
        this.resetTime();
      })
      .catch(error => {
        console.debug('error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  };

  onPressPrev = () => {
    this.setState({ currentDay: this.getYesterday(), resetGrid: true });
    this.resetTime();
  };

  onPressNext = () => {
    this.setState({ currentDay: this.getTomorrow(), resetGrid: true });
    this.resetTime();
  };

  resetTime() {
    this.setState({
      resetGrid: true,
      startTimeDisplay: '12:00 AM',
      endTimeDisplay: '12:00 PM',
      startTimeChanged: false,
      endTimeChanged: false,
      timesArrChanged: false,
      timeType: '',
      gridArray: [false, false, false, false, false, false, false],
      timesPendingRemove: []
    });
    setTimeout(() => {
      this.setState({ resetGrid: false });
    }, 100);
  }

  isResetDayGrid = () => {
    const { resetGrid } = this.state;

    return resetGrid;
  };

  onPressStartTime = () => {
    this.setState({ isTimePickerVisible: true, timeType: 'startTime' });
  };

  onPressEndTime = () => {
    this.setState({ isTimePickerVisible: true, timeType: 'endTime' });
  };

  onPressTimeConfirm = time => {
    const { timeType } = this.state;

    const nearestPastMin = nearestPastMinutes(15, moment(time));
    const formattedTime = moment(nearestPastMin).format('h:mm a').toUpperCase();

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

  onPressRemoveItem = (day, index) => {
    const {
      timesPendingRemove,
      startTimeChanged,
      endTimeChanged
    } = this.state;

    const daysGridEnabled = !startTimeChanged && !endTimeChanged;

    if (daysGridEnabled) {
      this.clearDaysGrid();
    }

    const pressedItem = { day, index };

    let find = timesPendingRemove.find(
      item => item.day === day && item.index === index
    );

    if (!find) {
      timesPendingRemove.push(pressedItem);
      this.setState({ timesPendingRemove, timesArrChanged: true });
    }

    this.forceUpdate();
  };

  onGridSelected = daysArr => {
    this.setState({ gridArray: daysArr });
  };

  onModalHide = () => {
    const { actions } = this.props;

    this.resetTime();

    actions.clearAlertModal();
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  clearDaysGrid() {
    this.setState({ resetGrid: true });

    setTimeout(() => {
      this.setState({ resetGrid: false });
    }, 100);
  }

  getTomorrow() {
    const { currentDay, data } = this.state;

    return (currentDay + 1) % data.length;
  }

  getYesterday() {
    const { currentDay, data } = this.state;

    return (currentDay + (data.length - 1)) % data.length;
  }

  renderTimesGrid() {
    const { defaultTimes } = this.props;
    const { currentDay, data, timesPendingRemove } = this.state;

    let today = getItemFromKey(data, currentDay);

    const times = defaultTimes[today.short];

    const gridItems = times.map((info, i) => {
      const find = timesPendingRemove.find(
        item => item.day === currentDay && item.index === i
      );

      const selected = find ? true : false;

      return (
        <TimesGridItem
          key={i}
          index={i}
          info={info}
          selected={selected}
          onPress={index => this.onPressRemoveItem(currentDay, index)}
        />
      );
    });
    return <View style={styles.timesGridContainer}>{gridItems}</View>;
  }

  render() {
    const { isOpen, onPressCancel, defaultTimes } = this.props;
    const {
      currentDay,
      actionLoading,
      isTimePickerVisible,
      startTimeDisplay,
      endTimeDisplay,
      startTimeChanged,
      endTimeChanged,
      data,
      timesArrChanged
    } = this.state;

    let today = getItemFromKey(data, currentDay);
    let tomorrow = getItemFromKey(data, this.getTomorrow());
    let yesterday = getItemFromKey(data, this.getYesterday());

    const times = defaultTimes[today.short];

    const showTimeDisplay = times.length;
    const textStartTimeStyle = startTimeChanged ? styles.timeActive : '';
    const textEndTimeStyle = endTimeChanged ? styles.timeActive : '';

    const buttonActive =
      (startTimeChanged && endTimeChanged) || timesArrChanged;

    const daysGridEnabled = startTimeChanged && endTimeChanged;
    const daysGridStyle = !daysGridEnabled ? styles.dim : '';

    return (
      <Modal
        onModalHide={() => {
          this.onModalHide();
        }}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCancel}>
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
        <AlertModal />
        {!_.isNil(today) ? (
          <View style={styles.modalContent}>
            <TouchableHighlight
              style={styles.topButtonContainer}
              onPress={this.onPressClose}
              underlayColor="transparent"
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
              <Image source={images.cancel} style={styles.iconCancel} />
            </TouchableHighlight>

            <View style={styles.containerTop}>
              <TouchableHighlight
                onPress={this.onPressPrev}
                underlayColor="transparent"
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                <View style={[styles.row, styles.rowFirst]}>
                  <Image
                    source={images.chevronBack}
                    style={[styles.icon, styles.iconFirst]}
                  />
                  <Text style={styles.textTopLabelPagination}>
                    {yesterday.label}
                  </Text>
                </View>
              </TouchableHighlight>
              <View style={styles.row}>
                <Text style={styles.textTopLabel}>{today.fullLabel}</Text>
              </View>
              <TouchableHighlight
                onPress={this.onPressNext}
                underlayColor="transparent"
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                <View style={[styles.row, styles.rowLast]}>
                  <Text style={styles.textTopLabelPagination}>
                    {tomorrow.label}
                  </Text>
                  <Image
                    source={images.chevronForward}
                    style={[styles.icon, styles.iconLast]}
                  />
                </View>
              </TouchableHighlight>
            </View>

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

            <View style={styles.daysWrap}>
              <Text style={[styles.textMessageSet, daysGridStyle]}>
                Set the same schedule for the following days:
              </Text>
              <DaysGrid
                disabled={!daysGridEnabled}
                data={data}
                onGridSelected={index => this.onGridSelected(index)}
                resetGrid={this.isResetDayGrid()}
              />
            </View>

            {showTimeDisplay ? (
              <ScrollView style={styles.timesWrap}>
                {this.renderTimesGrid()}
              </ScrollView>
            ) : (
              <Text style={styles.timesText}>
                No times are set for this day.
              </Text>
            )}

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
        ) : null}
      </Modal>
    );
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
  defaultTimes: state.caregiverAvailability.defaultTimes
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSchedule);

const styles = StyleSheet.create({
  timesGridContainer: {
    marginHorizontal: 15
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
    marginLeft: 15,
    marginTop: 18
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    borderRadius: 8,
    justifyContent: 'flex-start',
    height: 438,
    width: '100%'
  },
  topButtonContainer: {
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
    marginRight: 15
  },
  containerTime: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  timesWrap: {
    flex: 1,
    marginTop: 18,
    width: '100%',
    marginBottom: 70
  },
  daysWrap: {
    marginTop: 12,
    marginHorizontal: 15
  },
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
  icon: {
    marginTop: 4,
    width: 7.5,
    height: 12.5
  },
  iconFirst: {
    marginRight: 5
  },
  iconLast: {
    marginLeft: 5
  },
  iconCancel: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20
  },
  rowFirst: {
    width: 60
  },
  row: {
    flexDirection: 'row'
  },
  rowLast: {
    justifyContent: 'flex-end',
    width: 60
  },
  feedbackGrid: {
    marginTop: 14
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 60
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
});
