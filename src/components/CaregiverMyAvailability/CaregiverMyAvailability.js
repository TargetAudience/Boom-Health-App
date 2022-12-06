import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import { CustomHeaderBack, LoaderList, TopNav } from '@components/common';
import styles from './CaregiverMyAvailability.styles';
import ScheduleViewRowSet from './ScheduleViewRowSet';
import ModalSchedule from './ModalSchedule';

import CaregiverAvailabilityApi from '@api/caregiverAvailabilityApi';

import * as CaregiverAvailabilityActions from '@ducks/caregiverAvailability';
import * as AlertActions from '@ducks/alert';

const daysData = [
  {
    key: 0,
    short: 'mon',
    label: 'Mon',
    fullLabel: 'Monday',
    styles: { borderTopRightRadius: 8, borderTopLeftRadius: 8 }
  },
  {
    key: 1,
    short: 'tue',
    label: 'Tues',
    fullLabel: 'Tuesday',
    styles: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
    }
  },
  {
    key: 2,
    short: 'wed',
    label: 'Wed',
    fullLabel: 'Wednesday',
    styles: { borderBottomWidth: StyleSheet.hairlineWidth }
  },
  {
    key: 3,
    short: 'thu',
    label: 'Thu',
    fullLabel: 'Thursday',
    styles: { borderBottomWidth: StyleSheet.hairlineWidth }
  },
  {
    key: 4,
    short: 'fri',
    label: 'Fri',
    fullLabel: 'Friday',
    styles: { borderBottomWidth: StyleSheet.hairlineWidth }
  },
  {
    key: 5,
    short: 'sat',
    label: 'Sat',
    fullLabel: 'Saturday',
    styles: { borderBottomWidth: StyleSheet.hairlineWidth }
  },
  {
    key: 6,
    short: 'sun',
    label: 'Sun',
    fullLabel: 'Sunday',
    styles: { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }
  }
];

class CaregiverMyAvailability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      page: null,
      actionLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    CaregiverAvailabilityApi.getDefaultAvailability()
      .promise.then(result => {
        const data = result.data.times;

        let newDefaultTimes = {
          mon: [],
          tue: [],
          wed: [],
          thu: [],
          fri: [],
          sat: [],
          sun: []
        };

        data.forEach(function (item, index) {
          const day = item.day;
          const start = moment(item.startTime, 'HH:mm').format('h:mm A');
          const end = moment(item.endTime, 'HH:mm').format('h:mm A');

          const timesArray = newDefaultTimes[day];

          newDefaultTimes[day] = [...timesArray, { start, end }];
        });

        actions.setDefaultTimes(newDefaultTimes);

        this.setState({ actionLoading: false });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressDay = page => {
    this.setState({ page: page, isOpen: true });
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressTopNav = page => {
    const { navigation } = this.props;

    navigation.navigate(page);
  };

  onPressCancel = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { navigation, defaultTimes } = this.props;
    const { isOpen, page, actionLoading } = this.state;

    return (
      <SafeAreaView>
        <CustomHeaderBack
          title="My Availability"
          onPressBack={this.onPressBack}
        />
        <TopNav navigation={navigation} onPress={this.onPressTopNav} />
        <LoaderList loading={actionLoading} />

        {!actionLoading ? (
          <>
            <ScrollView style={styles.scrollView}>
              <View style={styles.callsWrap}>
                {daysData.map((route, idx) => {
                  return (
                    <ScheduleViewRowSet
                      defaultTimes={defaultTimes[route.short]}
                      onPress={page => this.onPressDay(page)}
                      key={route.key}
                      data={route}
                      navigation={this.props.navigation}
                    />
                  );
                })}
              </View>
            </ScrollView>
            <ModalSchedule
              page={page}
              data={daysData}
              isOpen={isOpen}
              onPressCancel={this.onPressCancel}
            />
          </>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  defaultTimes: state.caregiverAvailability.defaultTimes
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
)(CaregiverMyAvailability);
