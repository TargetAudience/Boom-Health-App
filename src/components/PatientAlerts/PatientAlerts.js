import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import _ from 'lodash';
import moment from 'moment';
import { CustomHeaderBack, LoaderList } from '@components/common';
import images from '@assets/images';
import { Colors, Globals } from '@constants/GlobalStyles';
import styles from './PatientAlerts.styles';
import { utils, uppercaseFirst } from '@utils/Globals';

import TodaysAppointmentsApi from '@api/todaysAppointmentsApi';

import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

class PatientAlerts extends Component {
  constructor(props) {
    super(props);

    const today = utils.momentDateFormat(new Date(), 'YYYY-MM-DD');

    this.state = {
      actionLoading: false,
      pullRefreshing: false,
      today
    }

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const { addListener } = this.props.navigation;

    this.listeners = [addListener('didFocus', this.handleDidFocus)];

    this.loadApiData();

    ////this.mixpanel.track('View Upcoming Appointments');
  }

  componentWillUnmount() {
    this.listeners.forEach(sub => sub.remove());
  }

  handleDidFocus = () => {
    const { actions, flagUpdate } = this.props;

    this.loadApiData();

    if (flagUpdate === 1) {
      // this.loadApiData();
      actions.clearTodaysAppointmentsUpdate();
    }
  };

  onPullRefresh = () => {
    this.setState({ pullRefreshing: true }, () => {
      this.loadApiData();
    });
  };

  loadApiData() {
    const { actions } = this.props;
    const { today } = this.state;

    this.setState({ actionLoading: true });

    TodaysAppointmentsApi.loadTodaysAppointments({ today })
      .promise.then(result => {
        const appointments = result.data.appointments;

        actions.setAppointmentsToday(appointments);

        this.setState({ actionLoading: false, pullRefreshing: false });
      })
      .catch(error => {
        console.log('PatientAlerts error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  renderBlankState() {
    const { appointments } = this.props;

    if (!appointments.length) {
      return (
        <View style={styles.blankStateContainer}>
          <Image style={styles.dateTimeIcon} source={images.appointments} resizeMode="cover" />
          <Text
            style={styles.blankStateText}>
            You have no upcoming appointments.
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  renderItem(item) {
    const dateRequested = utils.momentDateFormat(item.calendarDate, 'MMMM Do, YYYY');
    const showNoteToCaregiver = _.isNil(item.noteToCaregiver) ? false : true;
    const noteToPerson = item.caregiverUserId ? `Note to ${item.providerFirstName}` : 'Note';
    const timeDisplay = moment(item.startTimePatient, 'H:mm').format('h:mm a').toUpperCase();
    const itemTitle = item.caregiverUserId ? `${item.serviceName} with ${item.providerName}` : item.serviceName;

    let topValue = '';
    if (item.appointmentType === 'meals') {
        topValue = 'Delivery (Between 5pm and 8pm)';
    } else if (item.appointmentType === 'equipment') {
        if (item.typeSpecific === 'standard') {
            topValue = uppercaseFirst(item.typeSpecificB) + ' Delivery';
        } else {
            topValue = 'Rush Delivery';
        }
    } else {
        topValue = moment(item.startTimePatient, 'H:mm').format('h:mm a').toUpperCase();
    }

    return (
      <View key={`key_${Date.now()}${Math.random()}`} style={styles.textContainer}>
        <Text style={styles.requestedOnText}>{itemTitle}</Text>
        <View style={styles.iconContainer}>
          <Image style={styles.iconCalendar} source={images.calendar} />
          <Text style={styles.iconText}>{topValue} on {dateRequested}</Text>
        </View>

        {showNoteToCaregiver ? (
          <>
            <View style={styles.iconNoteContainer}>
              <Image style={styles.iconNote} source={images.note} />
              <Text style={styles.iconText}>{noteToPerson}</Text>
            </View>
            <View style={styles.datesContainer}>
              <Text style={styles.messageText}>{item.noteToCaregiver}</Text>
            </View>
          </>
        ) : null}
      </View>
    );
  }

  render() {
    const { appointments } = this.props;
    const { actionLoading, pullRefreshing } = this.state;

    const itemList = [];

    {appointments.forEach(item => {
      itemList.push(this.renderItem(item))
    })};

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <CustomHeaderBack title="Upcoming Appointments" loading={actionLoading && !pullRefreshing} />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={pullRefreshing}
                onRefresh={this.onPullRefresh}
              />
            }>
            {itemList}
            {this.renderBlankState()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  appointments: state.todaysAppointments.appointments,
  flagUpdate: state.todaysAppointments.flagUpdate
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...TodaysAppointmentsActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientAlerts);
