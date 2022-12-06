import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwipeableRating from 'react-native-swipeable-rating';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import {
  AppText,
  CustomHeaderBack,
  ButtonLoading,
  LoaderList,
  FormWrapper,
  InputWithLabel,
  GenericModal,
  ScreenWrapper
} from '@components/common';
import images from '@assets/images';
import styles from './PatientCalendarDetails.styles';
import { Globals, FormStyles } from '@constants/GlobalStyles';
import { utils, timeConvert, uppercaseFirst } from '@utils/Globals';

import MyCalendarApi from '@api/myCalendarApi';

import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

class PatientCalendarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpText: '',
      item: {},
      note: '',
      stars: 0,
      feedbackLoading: false,
      actionLoading: false,
      isCancelAppointmentModalOpen: false,
      passedCutoffTime: 0,
      modalHeight: 240
    };

    this.onPressSendFeedback = this.onPressSendFeedback.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {
      navigation: {
        state: { params },
      },
    } = this.props;

    if (params && params.item) {
      const item = params.item;

      const appointmentDateTimePre = moment(
        item.calendarDate + ' ' + item.startTimePatient,
        'YYYY/MM/DD HH:mm'
      );
      const cutoffTime = moment(appointmentDateTimePre)
        .subtract(item.cancelMinutes, 'minutes')
        .toDate();

      let passedCutoffTime = 0;
      if (moment().isAfter(cutoffTime)) {
        passedCutoffTime = 1;
      }

      let modalHeight;
      if (item.appointmentType === 'transportation') {
        modalHeight = 140;
      } else {
        modalHeight = 240;
      }

      this.setState({ item, passedCutoffTime, modalHeight }, () => {
        this.loadHelpText();
      });
    }

   // //this.mixpanel.track('View Calendar Item');
  }

  loadHelpText() {
    const { item, passedCutoffTime } = this.state;

    MyCalendarApi.getAppointmentMessage({
      appointmentId: item.appointmentId,
      passedCutoffTime,
    })
      .promise.then(result => {
        const data = result.data;

        this.setState({ helpText: data.helpText }, () => {
          this.forceUpdate();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onPressCancel = () => {
    this.setState({ isCancelAppointmentModalOpen: false });
  };

  onPressOkay = () => {};

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressOpenCancelModal = () => {
    this.setState({ isCancelAppointmentModalOpen: true });
  };

  onPressCancelRequest = () => {
    const { actions, navigation } = this.props;
    const { item, passedCutoffTime } = this.state;

    this.setState({ actionLoading: true, isCancelAppointmentModalOpen: true });

    MyCalendarApi.cancelAppointment({
      appointmentId: item.appointmentId,
      passedCutoffTime
    })
      .promise.then(() => {
        setTimeout(() => {
          this.setState({
            actionLoading: false,
            isCancelAppointmentModalOpen: false,
          });
          actions.removeAppointment(item.appointmentId);
          actions.flagTodaysAppointmentsUpdate();
          actions.flagMyCalendarUpdate();
          //('Calendar Cancel Appointment');
          navigation.goBack();
        }, 500);
      })
      .catch(error => {
        console.log(error);
        this.setState({ actionLoading: false });
      });
  };

  async onPressSendFeedback() {
    const { actions, navigation } = this.props;
    const { item, note, stars } = this.state;

    if (note === '') {
      actions.setAlert('Please enter a feedback note.');
      return;
    }

    this.setState({ feedbackLoading: true });

    await MyCalendarApi.sendAppointmentFeedback({
      appointmentId: item.appointmentId,
      note,
      stars
    })
      .promise.then(async result => {
        this.setState({ feedbackLoading: false, note: '' });

        const appointmentFeedbackId = result.data.id;

        actions.addFeedbackSent({
          appointmentId: item.appointmentId,
          appointmentFeedbackId
        });

        actions.setAlert(
          "You feedback has been sent. If applicable, you'll hear from us soon. Thank you!",
          'mediumDuration'
        );

        //('Calendar Sent Feedback');

        navigation.navigate('PatientCalendar');
      })
      .catch(error => {
        this.setState({ feedbackLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  renderPastAppointmentTime = () => {
    const { item, note, feedbackLoading, stars } = this.state;

    const appointmentDateTimePre = moment(
      item.calendarDate + ' ' + item.startTimePatient,
      'YYYY/MM/DD HH:mm'
    );
    const appointmentDateTime = appointmentDateTimePre.format(
      'YYYY-MM-DD HH:mm'
    );

    let passedAppointmentTime = false;
    if (moment().isAfter(appointmentDateTime)) {
      passedAppointmentTime = true;
    }

    const isFeedbackCompleted = !_.isNil(item.appointmentFeedbackId);

    if (passedAppointmentTime && !isFeedbackCompleted) {
      return (
        <FormWrapper style={styles.topGap}>
          <AppText textWeight="500" style={styles.instructionsText}>
            We hope your appointment was fantastic!
          </AppText>
          <AppText textWeight="300" style={styles.instructionsText}>
            Your feedback is much appreciated and helps us provide you and other
            families better service.
          </AppText>
          <View style={styles.starContainer}>
            <AppText textWeight="400" style={styles.instructionsStarsText}>
              Please rate from 0 to 5 stars:
            </AppText>
            <View style={styles.ratingContainer}>
              <SwipeableRating
                color="#fac917"
                emptyColor="#fac917"
                rating={stars}
                maxRating={5}
                size={38}
                gap={2}
                minRating={0}
                allowHalves
                xOffset={20}
                onPress={val => {
                  this.setState({ stars: val });
                }}
              />
            </View>
          </View>
          <InputWithLabel
            containerStyle={[
              FormStyles.inputContainer,
              FormStyles.inputContainerMultiLine,
              FormStyles.inputContainerLabel
            ]}
            labelStyle={styles.semiBold}
            maxLength={1000}
            textAlignVertical="top"
            multiline
            style={FormStyles.inputStyleMultiLine}
            autoCorrect={true}
            autoFocus={false}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            returnKeyType="next"
            label="Feedback"
            value={note}
            onChangeText={text => this.setState({ note: text })}
          />
          <View>
            <ButtonLoading
              onPress={this.onPressSendFeedback}
              isLoading={feedbackLoading}
              containerStyle={FormStyles.button}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.buttonText}>
                SEND FEEDBACK
              </AppText>
            </ButtonLoading>
          </View>
        </FormWrapper>
      );
    } else if (passedAppointmentTime && isFeedbackCompleted) {
      return (
        <FormWrapper style={styles.topGap}>
          <AppText textWeight="400" style={styles.instructionsText}>
            Your feedback for this appointment has been sent. Thank you!
          </AppText>
        </FormWrapper>
      );
    }
    return null;
  };

  renderAppointmentIsCancellable = () => {
    const { item, passedCutoffTime } = this.state;

    let showButton = true;
    if (item.appointmentType === 'equipment' && item.typeSpecific === 'rush') {
      showButton = false;
    }

    if (passedCutoffTime === 0) {
      let cancelNote;
      if (item.appointmentType === 'meals') {
        cancelNote = `Your order can be cancelled at any time, but we can only issue refunds on cancellations within ${timeConvert(
          item.minimumChargeMinutes
        )} of the 5pm delivery time.`;
      } else if (item.appointmentType === 'caregiver') {
        cancelNote = `Appointments can be cancelled at any time, but charges will be incurred for cancellations within ${timeConvert(
          item.minimumChargeMinutes
        )} of the appointment.`;
      } else if (item.appointmentType === 'equipment') {
        cancelNote = `Your order can be cancelled at any time, but we can only issue refunds on cancellations within ${timeConvert(
          item.minimumChargeMinutes
        )} of the delivery time.`;
      } else if (item.appointmentType === 'personalcare') {
        cancelNote = `Appointments can be cancelled at any time, but charges will be incurred for cancellations within ${timeConvert(
          item.minimumChargeMinutes
        )} of the appointment.`;
      } else if (item.appointmentType === 'transportation') {
        cancelNote = `Appointments can be cancelled at any time, but charges will be incurred for cancellations within ${timeConvert(
          item.minimumChargeMinutes
        )} of the appointment.`;
      }

      if (showButton) {
        return (
          <>
            <AppText textWeight="300" style={styles.textCancel}>
              {cancelNote}
            </AppText>
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressOpenCancelModal}
                containerStyle={styles.button}>
                <AppText
                  textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                  style={styles.buttonText}>
                  Cancel Appointment
                </AppText>
              </ButtonLoading>
            </View>
          </>
        );
      }
    }
    return null;
  };

  render() {
    const {
      item,
      helpText,
      modalHeight,
      isCancelAppointmentModalOpen,
      actionLoading,
    } = this.state;

    const show = item.appointmentId !== undefined ? true : false;

    const dateRequested = utils.momentDateFormat(
      item.calendarDate,
      'MMMM Do, YYYY'
    );
    const showNoteToCaregiver = item.noteToCaregiver !== null ? true : false;
    const noteToPerson = item.caregiverUserId
      ? `Note to ${item.providerFirstName}`
      : 'Note';

    const itemTitle = item.caregiverUserId
      ? `${item.serviceName} with ${item.providerName}`
      : item.serviceName;

    let timeDisplay = '';
    if (item.appointmentType === 'meals') {
      timeDisplay = 'Delivery Today (Between 5pm and 8pm)';
    } else if (item.appointmentType === 'equipment') {
      if (item.typeSpecific === 'standard') {
        timeDisplay = uppercaseFirst(item.typeSpecificB) + ' Delivery';
      } else {
        timeDisplay = 'Delivery Today';
      }
    } else {
      timeDisplay = moment(item.startTimePatient, 'H:mm')
        .format('h:mm a')
        .toUpperCase();
    }

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Appointment Details"
          onPressBack={this.onPressBack}
        />
        <LoaderList loading={!show} />
        <KeyboardAwareScrollView
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER} style={styles.container}>
          {show ? (
            <>
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
                      <AppText textWeight="300" style={styles.iconText}>
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
              </View>

              {this.renderAppointmentIsCancellable()}
            </>
          ) : null}

          {this.renderPastAppointmentTime()}

          <GenericModal
            onPressOne={this.onPressCancel}
            actionLoading={actionLoading}
            onPressButtonLoading={this.onPressCancelRequest}
            buttonOneLabel="Yes, Cancel Appointment"
            isModalOpen={isCancelAppointmentModalOpen}
            onPressCloseButton={this.onPressCancel}
            titleText="Cancel Appointment Confirmation"
            buttonOneWidth={200}
            modalHeight={modalHeight}
            scrollHeight={90}
            helpText={helpText}
          />
        </KeyboardAwareScrollView>
      </ScreenWrapper>
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
)(PatientCalendarDetails);
