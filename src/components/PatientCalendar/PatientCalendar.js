import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, Platform } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { bindActionCreators } from 'redux';
import { Calendar, LocaleConfig } from '../../../src/@custom/react-native-calendars';
import moment from 'moment';
import { normalizeFont } from '@utils/Responsive';
import {
  CustomHeaderBack,
  AppointmentItem,
  AppText
} from '@components/common';
import styles from './PatientCalendar.styles';
import { Colors, Globals } from '@constants/GlobalStyles';
import { utils } from '@utils/Globals';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import MyCalendarApi from '@api/myCalendarApi';

import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';

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

class PatientCalendar extends Component {
  constructor(props) {
    super(props);

    const today = utils.momentDateFormat(new Date(), 'YYYY-MM-DD');

    this.state = {
      today,
      selectedDate: today,
      selectedDateData: [],
      pullRefreshing: false,
      actionLoading: false,
      isLoading: false
    };

    this.onPressDay = this.onPressDay.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const { addListener } = this.props.navigation;

    this.listeners = [addListener('didFocus', this.handleDidFocus)];

    this.loadApiData();

   // //this.mixpanel.track('View Calendar Home');
  }

  componentWillUnmount() {
    this.listeners.forEach(sub => sub.remove());
  }

  handleDidFocus = () => {
    const { actions, flagUpdate } = this.props;

    if (flagUpdate === 1) {
      this.loadApiData();
      actions.clearMyCalendarUpdate();
    } else {
      this.refreshSelectedDay();
    }
  };

  loadApiData() {
    const { actions } = this.props;
    const { today } = this.state;

    this.setState({ actionLoading: true });

    MyCalendarApi.loadMyCalendar({ var: 'empty' })
      .promise.then(result => {
        const appointments = result.data.appointments;

        actions.setAppointments(appointments);

        this.onPressDay({ dateString: today });

        this.setState({ actionLoading: false, pullRefreshing: false });
      })
      .catch(error => {
        console.log('loadAvailabilityCalendar error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressDay(day) {
    const { appointments } = this.props;

    let justToday = appointments.filter(
      item => item.calendarDate === day.dateString
    );

    this.setState({
      selectedDate: day.dateString,
      selectedDateData: justToday
    });
  }

  onPressItem = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientCalendarDetails', { item });
  };

  keyExtractor = () => `key_${Date.now()}${Math.random()}`;

  onPullRefresh = () => {
    this.setState({ pullRefreshing: true }, () => {
      this.loadApiData();
    });
  };

  refreshSelectedDay() {
    const { selectedDate } = this.state;

    this.onPressDay({ dateString: selectedDate });
  }

  renderItems() {
    const { selectedDateData } = this.state;

    if (!selectedDateData.length) {
      return this.renderBlankState();
    }

    const itemList = [];

    var that = this;
    selectedDateData.forEach(function(item, index) {
      const hasTopLine = index === 0 ? 1 : 0;
      const time = item.startTimePatient;
      const timeDisplay = moment(time, 'H:mm')
        .format('h:mm a')
        .toUpperCase();
      const data = {
        time: timeDisplay,
        description: item.serviceName,
        addTopLine: hasTopLine,
        appointmentType: item.appointmentType,
        typeSpecific: item.typeSpecific,
        typeSpecificB: item.typeSpecificB
      };
      const element = (
        <AppointmentItem
          key={`key_${Date.now()}${Math.random()}`}
          data={data}
          handler={() => that.onPressItem(item)}
        />
      );
      itemList.push(element);
    });

    return itemList;
  }

  renderCalender = () => {
    const { appointments } = this.props;
    const { isLoading, today, selectedDate } = this.state;

    const markedDates = {};

    // Mark date when current user has shift.
    appointments.forEach(item => {
      const dateString = moment(item.calendarDate).format('YYYY-MM-DD');
      markedDates[dateString] = {
        customStyles: {
          container: {
            borderColor: Colors.buttonMain,
            borderWidth: 1
          },
          text: {
            color: Colors.buttonMain,
            lineHeight: Platform.OS === 'ios' ? 18 : normalizeFont(19),
          }
        },
        marked: true,
        selected: selectedDate === dateString
      };
    });

    // Currently selected date.
    markedDates[selectedDate] = {
      customStyles: {
        container: {
          backgroundColor: Colors.buttonMain
        },
        text: {
          color: 'white',
          lineHeight: Platform.OS === 'ios' ? 19 : normalizeFont(20),
        }
      }
    };

    if (selectedDate !== today) {
      if (!markedDates[today]) {
        markedDates[today] = {
          customStyles: {
            container: {
              backgroundColor: Colors.buttonMain
            },
            text: {
              color: 'white',
              lineHeight: Platform.OS === 'ios' ? 18 : normalizeFont(19),
            }
          }
        };
      }
    }

    return (
      <>
        <Calendar
          onDayPress={this.onPressDay}
          current={selectedDate}
          theme={{
            lineHeight: 0,
            calendarBackground: Colors.calendarBackground,
            textSectionTitleColor: 'gray',
            selectedDayBackgroundColor: Colors.buttonMain,
            selectedDayTextColor: 'white',
            dayTextColor: 'black',
            textDayFontWeight: Platform.OS === 'ios' ? '500' : '600',
            textDayFontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
            textDisabledColor: '#d9e1e8',
            dotColor: Colors.orange,
            arrowColor: 'black',
            monthTextColor: 'black',
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
                paddingLeft: Platform.OS === 'ios' ? 14 : 3,
                paddingRight: Platform.OS === 'ios' ? 14 : 3,
                paddingTop: Platform.OS === 'ios' ? 8 : 2,
                alignItems: 'center'
              },
              week: {
                backgroundColor: Colors.calendarBackground,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 12,
                paddingLeft: Platform.OS === 'ios' ? 16 : 13,
                paddingRight: Platform.OS === 'ios' ? 16 : 13,
                paddingBottom: 8
              },
              monthText: {
                color: Colors.black,
                fontSize: Platform.OS === 'ios' ? 17 : normalizeFont(16),
                fontWeight: Platform.OS === 'ios' ? '500' : '700',
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
          markingType="custom"
          markedDates={markedDates}
          style={styles.calendar}
        />
        <AppText textWeight="600" style={styles.dateHeadingText}>{utils.momentDateFormat(selectedDate, 'dddd')}</AppText>
        <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.dateHeadingSubText}>{utils.momentDateFormat(selectedDate, 'MMMM Do, YYYY')}</AppText>

        {!isLoading ? this.renderItems() : null}
      </>
    );
  };

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.blankStateText}>You have no appointments scheduled for this day.</AppText>
      </View>
    );
  }

  render() {
    const { pullRefreshing, actionLoading } = this.state;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top}]}>
          <CustomHeaderBack title="My Calendar" loading={actionLoading && !pullRefreshing} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={pullRefreshing}
                onRefresh={this.onPullRefresh}
              />
            }>
            {this.renderCalender()}
          </ScrollView>
        </View>
       )}
       </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  appointments: state.myCalendar.appointments,
  flagUpdate: state.myCalendar.flagUpdate
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...MyCalendarActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientCalendar);
