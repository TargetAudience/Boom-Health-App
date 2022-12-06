import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { formatPhoneNumber, formatPostalCode } from '@utils/Globals';
import { AppText, CustomHeaderBack, LoaderList } from '@components/common';
import images from '@assets/images';
import styles from './CaregiverCalendarDetails.styles';
import { Globals } from '@constants/GlobalStyles';
import { utils } from '@utils/Globals';

import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

class CaregiverCalendarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      note: ''
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;

    if (params && params.item) {
      const item = params.item;

      this.setState({ item });
    }

    ////this.mixpanel.track('View Caregivers Calendar Item');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    const { item } = this.state;

    const dateRequested = utils.momentDateFormat(
      item.calendarDate,
      'MMMM Do, YYYY'
    );
    const showNoteToCaregiver = item.noteToCaregiver !== null ? true : false;
    const showAdditionalPhoneNumber = item.additionalPhoneNumber !== '' ? true : false;
    const noteToPerson = `Note to ${item.providerFirstName}`;

    const itemTitle = item.caregiverUserId
      ? `${item.serviceName} with ${item.providerName}`
      : item.serviceName;

    let timeDisplay = moment(item.startTimePatient, 'H:mm')
      .format('h:mm a')
      .toUpperCase();

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack
          title="Appointment Details"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>

          <View style={styles.textContainer}>
            <AppText textWeight="500" style={styles.requestedOnText}>
              {itemTitle}
            </AppText>
            <View style={styles.iconContainer}>
              <Image style={styles.iconCalendar} source={images.calendar} />
              <AppText textWeight="500" style={styles.iconText}>
                {timeDisplay} on {dateRequested}
              </AppText>
            </View>

            {showNoteToCaregiver ? (
              <>
                <View style={styles.iconNoteContainer}>
                  <Image style={styles.iconNote} source={images.note} />
                  <AppText textWeight="500" style={styles.iconText}>
                    {noteToPerson}
                  </AppText>
                </View>
                <View>
                  <AppText textWeight="300" style={styles.messageText}>
                    {item.noteToCaregiver}
                  </AppText>
                </View>
              </>
            ) : null}

            <>
              <View style={styles.iconNoteContainer}>
                <Image style={styles.iconNote} source={images.note} />
                <AppText textWeight="500" style={styles.iconText}>
                  Client Information
                </AppText>
              </View>
              <View>
                <AppText textWeight="300" style={styles.messageText}>
                  {item.firstName} {item.lastName}
                </AppText>
                <AppText textWeight="300" style={styles.messageText2}>
                  {item.street}
                </AppText>
                <AppText textWeight="300" style={styles.messageText2}>
                  {item.city}, {item.province} {item.postalCode}
                </AppText>
                <AppText textWeight="300" style={styles.messageText2}>
                  {formatPhoneNumber(item.phoneNumber)}
                </AppText>
                {showAdditionalPhoneNumber ? (
                  <AppText textWeight="300" style={styles.messageText2}>
                    {formatPhoneNumber(item.additionalPhoneNumber)}
                  </AppText>
                ) : null}
              </View>
            </>
          </View>
          <View style={styles.noteContainer}>
            <AppText textWeight="300" style={styles.cancelText}>
              Call Boom if you're going to be late or need to cancel at (437) 218-7900.
            </AppText>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...MyCalendarActions,
      ...TodaysAppointmentsActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverCalendarDetails);
