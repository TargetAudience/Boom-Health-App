import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  RefreshControl,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Calendar, LocaleConfig } from '../../../src/@custom/react-native-calendars';
import _ from 'lodash';
import moment from 'moment';
import {
  HeaderFancy,
  Indicator,
  Avatar,
  LoadingModal,
  AppText,
  CustomHeaderBack,
  AppointmentItem,
  TopNav,
  AppButton,
  SpecificTimeItem,
  CheckmarkToggle,
  LoaderList
} from '@components/common';
import images from '@assets/images';
import styles from './CaregiverMyAvailabilityCalendar.styles';
import { Colors, Globals } from '@constants/GlobalStyles';
import { utils } from '@utils/Globals';
import ModalAddTime from './ModalAddTime';

import CaregiverAvailabilityApi from '@api/caregiverAvailabilityApi';

import * as CaregiverAvailabilityActions from '@ducks/caregiverAvailability';
import * as AlertActions from '@ducks/alert';

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
LocaleConfig.defaultLocale = 'en';

class CaregiverMyAvailabilityCalendar extends Component {
  constructor(props) {
    super(props);

    const today = utils.momentDateFormat(new Date(), 'YYYY-MM-DD');

    this.state = {
      isOpen: false,
      today,
      selectedDate: today,
      actionLoading: false,
      pageLoading: false,
      isLoading: false,
      selectedCheckmarkItem: 1,
    };

    this.onPressDay = this.onPressDay.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  onPressDay(day) {
    const { dailyNotAvailable } = this.props;

    const isUnavailableFilter = dailyNotAvailable.filter(item => item === day.dateString);
    const isUnavailable = isUnavailableFilter.length === 1 ? 2 : 1;

    this.setState({
      selectedDate: day.dateString,
      selectedCheckmarkItem: isUnavailable
    });
  }

  onPressRemoveItem = item => {
    const { actions } = this.props;

    actions.removeSpecificTime(item.id);

    this.setState({ pageLoading: true });

    CaregiverAvailabilityApi.removeSpecificTime({id: item.id})
      .promise.then(result => {
        this.setState({ pageLoading: false });
      })
      .catch(error => {
        this.setState({ pageLoading: false });
        actions.setAlert(error.data.error);
      });
  };

  onPressTopNav = page => {
    const { navigation } = this.props;

    navigation.navigate(page);
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    this.setState({ isOpen: false });
  };

  onPressSaved = () => {
    this.setState({ isOpen: false });
    this.onCheckmarkItemPress(1);
  };

  onPressAddTime = () => {
    this.setState({ isOpen: true });
  }

  onCheckmarkItemPress = item => {
    const { actions } = this.props;
    const { selectedCheckmarkItem, selectedDate } = this.state;

    if (item !== selectedCheckmarkItem) {
      this.setState({
        selectedCheckmarkItem: item
      });
    }

    if (item === 2) {
      actions.addDailyAvailability(selectedDate);
    } else {
      actions.removeDailyAvailability(selectedDate);
    }

    this.setState({ pageLoading: true });

    CaregiverAvailabilityApi.setDailyNotAvailable({type: item, date: selectedDate})
      .promise.then(result => {
        this.setState({ pageLoading: false });
      })
      .catch(error => {
        this.setState({ pageLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  keyExtractor = () => `key_${Date.now()}${Math.random()}`;

  refreshSelectedDay() {
    const { selectedDate } = this.state;

    this.onPressDay({ dateString: selectedDate });
  }

  loadData() {
    const { actions } = this.props;
    const { today } = this.state;

    this.setState({ actionLoading: true });

    CaregiverAvailabilityApi.loadAvailabilityCalendar()
      .promise.then(result => {
        const specificTimes = result.data.specificTimes;
        const unavailable = result.data.unavailable;

        actions.setSpecificTimes(specificTimes);
        actions.setDailyAvailability(unavailable);

        this.onPressDay({ dateString: today });

        this.setState({ actionLoading: false });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  getMarkedDates = () => {
    const { schedule, defaultTimes, dailyNotAvailable, specificTimes } = this.props;
    const { selectedDate } = this.state;

    const dim = { disabled: true };
    const selected = { selected: true };
    const selectedDot = { selected: true, marked: true, dotColor: 'orange' };
    const amended = { marked: true, dotColor: 'orange'};

    let items = {}

    const daysOfWeekDefaultUnavailable = [];
    Object.keys(defaultTimes).forEach( key => {
      const day = defaultTimes[key];
      if (!day.length) {
        daysOfWeekDefaultUnavailable.push(key);
      }
    });

    const unavailableDays = [];
    const dateStart = moment();
    const dateEnd = moment().add(180, 'days');
    while (dateEnd.diff(dateStart, 'days') >= 0) {
      var weekDayName = moment(dateStart).format('ddd').toLowerCase();
      if (daysOfWeekDefaultUnavailable.includes(weekDayName)) {
        unavailableDays.push(dateStart.format('YYYY-MM-DD'));
      }
      dateStart.add(1, 'days');
    }

    const specificTimesArrPre2 = specificTimes.map(item => item.date);
    const specificTimesArrPre = specificTimesArrPre2.filter(f => !dailyNotAvailable.includes(f));
    const specificTimesArr = [...new Set(specificTimesArrPre)]; 

    unavailableDays.push(...dailyNotAvailable);
    const unavailableDaysNew = unavailableDays.filter(f => !specificTimesArr.includes(f));
    // const unavailableDaysNew = unavailableDaysNewPre.filter(f => !dailyNotAvailable.includes(f));

    // Places dots on amended days.
    specificTimesArr.forEach(day => {
      const dateString = moment(day).format('YYYY-MM-DD');
      items = {
        ...items,
        [dateString]: amended
      }
    });

    // Dim days means not working.
    unavailableDaysNew.forEach(day => {
      const dateString = moment(day).format('YYYY-MM-DD');
      items = {
        ...items,
        [dateString]: dim
      }
    });

    // Today's highlight type.
    let selectedWithDot = false;
    if (specificTimesArr.includes(selectedDate)) {
      selectedWithDot = true;
    }

    // Highlights today.
    items[selectedDate] = selectedWithDot ? selectedDot : selected;

    return items;
  };

  renderCalender = () => {
    const { schedule, defaultTimes, specificTimes } = this.props;
    const { isOpen, isLoading, today, selectedDate, selectedCheckmarkItem } = this.state;

    const dayOfWeek = moment(selectedDate).format('ddd').toLowerCase();
    const defaultDayDate = defaultTimes[dayOfWeek];

    const calendarDataToday = specificTimes.filter(item => item.date === selectedDate);

    const minDate = moment().format('YYYY-MM-DD');

    return (
      <>
        <Calendar
          minDate={minDate}
          onDayPress={this.onPressDay}
          current={selectedDate}
          theme={{
            lineHeight: 20,
            calendarBackground: Colors.calendarBackground,
            textSectionTitleColor: 'gray',
            selectedDayBackgroundColor: Colors.blue,
            selectedDayTextColor: 'white',
            dayTextColor: 'black',
            textDayFontWeight: '500',
            textDisabledColor: '#b3bbc2',
            dotColor: Colors.orange,
            arrowColor: 'black',
            monthTextColor: 'black',
            textDayFontSize: 15,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 15,
            textDayHeaderFontWeight: '400',
            textDayHeaderFontColor: 'red',
            textMonthFontWeight: 'bold',
            'stylesheet.calendar.main': {
              container: {
                padding: 0
              },
              week: {
                paddingVertical: 6,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            },
            'stylesheet.calendar.header': {
              header: {
                backgroundColor: Colors.calendarBackground,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 8,
                alignItems: 'center'
              },
              week: {
                backgroundColor: Colors.calendarBackground,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 12,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8
              },
              monthText: {
                color: Colors.black,
                fontSize: 17,
                fontWeight: '400'
              },
              dayHeader: {
                color: Colors.black,
                fontWeight: '500',
                fontSize: 16,
                textAlign: 'center',
                width: 25
              }
            }
          }}
          
          markedDates={this.getMarkedDates()}
          style={styles.calendar}
        />
        <Text
          style={[
            styles.dateHeadingText 
          ]}>
          {utils.momentDateFormat(selectedDate, 'dddd')}
        </Text>
        <Text
          style={[
            styles.dateHeadingSubText 
          ]}>
          {utils.momentDateFormat(selectedDate, 'MMMM Do, YYYY')}
        </Text>

        <View style={styles.listContainer}>
          <View style={styles.nonTabContainerIndent}>
            {this.renderDefaultAvailability(defaultDayDate)}
          </View>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.tabContainer}>
            <View style={styles.adjustCheckmark}>
              <CheckmarkToggle 
                checked={selectedCheckmarkItem === 1}
                onPress={() => this.onCheckmarkItemPress(1)} />
            </View>
            <View>
              <TouchableHighlight
                onPress={() => this.onCheckmarkItemPress(1)}
                activeOpacity={1}
                underlayColor={Colors.white}>
                <>
                  <Text style={styles.overrideText}>
                    Amend availability for today:
                  </Text>
                  <Text style={styles.overrideText2}>
                    You can override the default availability times
                  </Text>
                </>
              </TouchableHighlight>

              {this.renderItems(calendarDataToday)}
            </View>
          </View>

          <View style={styles.bottomButtonContainer}>
            <AppButton
              onPress={this.onPressAddTime}
              width={230}
              height={38}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <Text style={styles.buttonText}>Add or Remove Specific Time</Text>
            </AppButton>
          </View>
        </View>

        <View style={styles.lineTop}></View>

        <View style={styles.listContainer2}>
          <View style={styles.tabContainer}>
            <View style={styles.adjustCheckmark}>
              <CheckmarkToggle 
                checked={selectedCheckmarkItem === 2}
                onPress={() => this.onCheckmarkItemPress(2)} />
            </View>
            <TouchableHighlight
              onPress={() => this.onCheckmarkItemPress(2)}
              activeOpacity={1}
              underlayColor={Colors.white}>
              <Text style={styles.notAvailabileText}>
                UNAVAILABLE ALL DAY TODAY
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
  };

  renderDefaultAvailability(defaultDayDate) {
    const { selectedCheckmarkItem } = this.state;

    if (defaultDayDate.length === 0 && selectedCheckmarkItem === 1) {
      return (
        <>
          <Text style={styles.defaultAvailabilityText}>
            Currently scheduled availability: 
          </Text>
          <Text style={styles.defaultAvailabilityText3}>NONE SET</Text>
        </>
      )
    }

    const itemList = defaultDayDate.map(item => (
      <Text style={styles.defaultAvailabilityText3}>{item.start} to {item.end}</Text>
    ));

    const notScheduledText = <Text style={styles.defaultAvailabilityText3}>NOT SCHEDULED TODAY</Text>;

    const display = selectedCheckmarkItem === 1 ? itemList : notScheduledText;

    return (
      <>
        <Text style={styles.defaultAvailabilityText}>
          Currently scheduled availability:
        </Text>
        {display}
      </>
    )
  }

  renderItems(data) {
    const itemList = data.map(item => (
      <SpecificTimeItem key={item.key} data={item} handler={() => this.onPressRemoveItem(item)} />
    ));
    if (!data.length) {
      return this.renderBlankState();
    }
    return itemList;
  }

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Image style={styles.dateTimeIcon} source={images.dateTime} resizeMode="cover" />
        <Text
          style={styles.blankStateText}>
          You have no specific times set for today.
        </Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { actionLoading, pageLoading, isOpen, selectedDate } = this.state;

    return (
      <SafeAreaView style={Globals.container}>
        <View style={Globals.backgroundWhite}>
          <CustomHeaderBack title="My Availability" onPressBack={this.onPressBack} />
          <TopNav navigation={navigation} onPress={this.onPressTopNav} />
          <LoaderList loading={actionLoading} />
          <LoadingModal visible={pageLoading} color={Colors.white} />
          <ScrollView>
            {this.renderCalender()}
          </ScrollView>
        </View>
        <ModalAddTime isOpen={isOpen} selectedDate={selectedDate} onPressCancel={this.onPressCancel} onPressSaved={this.onPressSaved} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  defaultTimes: state.caregiverAvailability.defaultTimes,
  specificTimes: state.caregiverAvailability.specificTimes,
  dailyNotAvailable: state.caregiverAvailability.dailyNotAvailable
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...CaregiverAvailabilityActions,
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverMyAvailabilityCalendar);
