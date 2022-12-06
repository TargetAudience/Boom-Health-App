import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { Calendar, LocaleConfig } from '../../../src/@custom/react-native-calendars';
import moment from 'moment';
import {
  LoadingModal,
  CustomHeaderBack,
  LoaderList,
  GenericModal
} from '@components/common';
import styles from './PatientBookHomePersonalCareDaySelect.styles';
import { Colors, Globals } from '@constants/GlobalStyles';
import { utils } from '@utils/Globals';

import HomePersonalCareApi from '@api/homePersonalCareApi';

import * as HomePersonalCareActions from '@ducks/homePersonalCare';
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

class PatientBookHomePersonalCareDaySelect extends Component {
  constructor(props) {
    super(props);

    const today = utils.momentDateFormat(new Date(), 'YYYY-MM-DD');

    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const startOfMonth = moment().month(month).year(year).startOf('month');
    const endOfMonth = moment().month(month).year(year).endOf('month');

    const futureMonth = moment(startOfMonth).add(3, 'M');
    const endOfPeriod = moment(futureMonth).endOf('month');

    const endOfDays = moment(today).add(90, 'd');

    this.state = {
      startOfMonth,
      endOfPeriod,
      endOfDays,
      today,
      selectedDate: today,
      selectedDateData: [],
      actionLoading: false,
      actionLoadingDay: false,
      showCalendarRightArrow: true,
      personalCareTimes: [],
      item: this.props.navigation.getParam('item', ''),
      isModalOpen: false
    };

    this.onPressDay = this.onPressDay.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { actions } = this.props;
    const { today, item } = this.state;

    this.setState({ actionLoading: true });

    HomePersonalCareApi.loadPersonalCareAvailabilityCalendar({serviceId: item.serviceSubCategoryId})
      .promise.then(result => {
        const calendar = result.data.allUsersCalendarArr;
        const isOutOfRange = result.data.isOutOfRange;

        actions.setPersonalCareDays(calendar);

        if (isOutOfRange === 1) {
          setTimeout(() => {
            this.setState({ isModalOpen: true });
          }, 1000);
        } else {
          this.onPressDay({ dateString: today });
        }

        this.setState({ actionLoading: false });
      })
      .catch(error => {
        console.log('loadPersonalCareAvailabilityCalendar error', error)
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCart = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientBookHomePersonalCareCart');
  };

  onPressCancel = () => {
    this.setState({ isModalOpen: false });
  };

  onPressDay(day) {
    this.setState({
      selectedDate: day.dateString
    });

    const { actions } = this.props;
    const { item } = this.state;

    this.setState({ actionLoadingDay: true });

    HomePersonalCareApi.loadAvailabilityDay({date: day.dateString, serviceId: item.serviceSubCategoryId})
      .promise.then(result => {
        const times = result.data.times;

        this.setState({ actionLoadingDay: false, personalCareTimes: times });
      })
      .catch(error => {
        console.log('loadAvailabilityDay error', error)
        this.setState({ actionLoadingDay: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressTimeItem = ({timeItem, time, timeDisplay}) => {
    const { navigation } = this.props;
    const { selectedDate, item } = this.state;

    navigation.navigate('PatientBookHomePersonalCareCart', { time, timeDisplay, selectedDate, pressItem: item, timeItem });
  };

  getMarkedDates = () => {
    const { personalCareDays } = this.props;
    const { selectedDate, startOfMonth, endOfPeriod, endOfDays } = this.state;

    const selected = { selected: true };
    const disabled = { disabled: true, disableTouchEvent: true };
    const enabled = { disableTouchEvent: false };

    let items = {};

    for (let m = moment(startOfMonth); m.isSameOrBefore(endOfPeriod); m.add(1, 'days')) {
      items[m.format('YYYY-MM-DD')] = disabled;
    }

    personalCareDays.forEach(available => {
      const dateString = moment(available).format('YYYY-MM-DD');
      let m = moment(dateString);
      if (m.isSameOrBefore(endOfDays)) {
        items = {
          ...items,
          [available]: enabled
        }
      }
    });

    // Highlights today.
    items[selectedDate] = selected;

    return items;
  };

  updateCurrentMonth = data => {
    const firstDate = new Date(data.dateString);
    const secondDate  = moment().add(90, 'd');

    let showArrow = true;
    if (firstDate > secondDate) {
      showArrow = false;
    }

    this.setState({ showCalendarRightArrow: showArrow });
  }

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Text
          style={styles.blankStateText}>
          Sorry! No times are available for this day. All of Boom personal care providers are booked. Please choose another day.
        </Text>
      </View>
    );
  }

  renderItems() {
    const { personalCareTimes } = this.state;

    if (!Object.keys(personalCareTimes).length) {
      return this.renderBlankState();
    }

    const itemList = [];

    for(var key in personalCareTimes) {
      const timeItem = personalCareTimes[key];
      const time = timeItem[0].time;
      const timeDisplay = moment(time, 'H:mm').format('h:mm a').toUpperCase();

      const element = <TouchableOpacity
        key={`key_${Date.now()}${Math.random()}`}
        activeOpacity={0.6}
        onPress={() => this.onPressTimeItem({timeItem, time, timeDisplay})}
        style={styles.timeItemContainer}>
        <Text style={styles.timeText}>{timeDisplay}</Text>
      </TouchableOpacity>
      itemList.push(element);
    };

    return itemList;
  }

  renderCalender = () => {
    const { actionLoadingDay, selectedDate, showCalendarRightArrow } = this.state;

    const minDate = moment().format('YYYY-MM-DD');
    const futureMonth = moment(minDate).add(90, 'd');
    const maxDate = moment(futureMonth).format('YYYY-MM-DD');

    return (
      <>
        <Calendar
          minDate={minDate}
          maxDate={maxDate}
          onDayPress={this.onPressDay}
          hideExtraDays={true}
          onMonthChange={(month) => this.updateCurrentMonth(month)}
          disableArrowRight={!showCalendarRightArrow}
          theme={{
            disabledArrowColor: '#d9e1e8',
            lineHeight: 20,
            calendarBackground: Colors.calendarBackground,
            textSectionTitleColor: 'gray',
            selectedDayBackgroundColor: Colors.buttonMain,
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

        {!actionLoadingDay ? (
          <View style={styles.renderItemsContainer}>
            {this.renderItems()}
          </View>
        ) : (
          <View style={styles.loaderListContainer}>
            <LoaderList loading={actionLoadingDay} />
          </View>
        )}
      </>
    );
  };

  render() {
    const { cartQuantity } = this.props;
    const { actionLoading, isModalOpen } = this.state;

    return (
      <SafeAreaView style={Globals.container}>
        <View style={Globals.background}>
          <CustomHeaderBack title="Select Day and Time" onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
          <LoadingModal
            visible={actionLoading}
            color={Colors.white}
          />
          <GenericModal
            onPressOne={this.onPressCancel}
            buttonOneLabel={'OK'}
            isModalOpen={isModalOpen}
            onPressCloseButton={this.onPressCancel}
            titleText="Personal Care Services"
            buttonOneWidth={120}
            modalHeight={220}
            scrollHeight={135}
            helpText={"Sorry! Our Boom personal care providers haven't reached your area yet."}
          />
          <ScrollView>
            {this.renderCalender()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  personalCareDays: state.homePersonalCare.personalCareDays,
  cartQuantity: state.homePersonalCare.cart.quantity
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...HomePersonalCareActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCareDaySelect);