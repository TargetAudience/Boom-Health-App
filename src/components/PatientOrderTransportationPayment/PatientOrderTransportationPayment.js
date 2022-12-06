import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {
  CustomHeaderBack,
  ButtonLoading,
  PaymentCard,
  PaymentFamily,
  AppText,
  PromoCodeButton,
  PromoCodeModal,
  PromoCodeDisplay,
  ScreenWrapper
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './PatientOrderTransportationPayment.styles';

import PaymentApi from '@api/paymentApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';
import * as TransportationActions from '@ducks/transportation';

class PatientOrderTransportationPayment extends Component {
  constructor(props) {
    super(props);

    const savedState = props.navigation.getParam('savedState', null);

    this.state = {
      pickupAddressSelected: savedState.pickupAddressSelected,
      dropOffAddressSelected: savedState.dropOffAddressSelected,
      dropOffAddress: savedState.dropOffAddress,
      pickupAddress: savedState.pickupAddress,
      pickupDate: savedState.pickupDateToSend,
      pickupTime: savedState.pickupTimeToSend,
      specialInstructions: savedState.specialInstructions,
      actionLoading: false,
      buttonEnabled: true,
      selectedCard: this.getDefaultCard(),
      selectedFamilyMembers: [],
      isModalOpen: false,
      savings: null,
      promoCode: '',
      resetFamilySelected: false
    };

    this.onPressPayment = this.onPressPayment.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Transportation Reservation');
  }

  onPressCancelModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  promoCodeButtonCallback = () => {
    this.setState({
      isModalOpen: true
    });
  };

  promoCodeRemoveCallback = () => {
    this.setState({ savings: null, promoCode: null });
  };

  onPressModalSave = props => {
    const { promoCode, savings } = props;

    this.setState({ isModalOpen: false, savings, promoCode });
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    const { navigation, actions } = this.props;

    actions.clearAllTransportation();

    navigation.navigate('PatientHome');
  };

  selectedCardCallback = value => {
    if (value === 'default') {
      this.setState({ selectedCard: this.getDefaultCard() });
    } else {
      this.setState({ selectedCard: value });
    }
  };

  selectedFamilyCallback = values => {
    this.setState({ selectedFamilyMembers: values });
  };

  async onPressPayment() {
    const { navigation, actions } = this.props;
    const {
      selectedCard,
      dropOffAddress,
      pickupAddress,
      pickupDate,
      pickupTime,
      savings,
      promoCode
    } = this.state;

    this.setState({
      preAuthsData: {},
      actionLoading: true,
      buttonEnabled: false
    });

    const extraData = {
      paymentVertical: 'transportation',
      customerOrderIdPrefix: 'TRN',
      savings,
      promoCode
    };

    await PaymentApi.processPreAuths({
      purchaseData: this.state,
      extraData
    })
      .promise.then(async result => {
        const processPaymentData = result.data;

        this.setState({ preAuthsData: processPaymentData });

        if (processPaymentData.failedPreAuths) {
          navigation.navigate('PaymentInterimPreAuths', {
            processPaymentData,
            purchaseData: this.state,
            extraData,
            paymentCallback: this.paymentCallback
          });
        } else {
          const customerOrderId = processPaymentData.customerOrderId;

          actions.flagMyCalendarUpdate();
          actions.flagTodaysAppointmentsUpdate();
          actions.clearAllTransportation();
          actions.flagDocumentsUpdate();
          
          analytics().logEvent('transportation', { customerOrderId });

          const resetAction = StackActions.reset({
            index: 0,
            key: undefined,
            actions: [
              NavigationActions.navigate({
                routeName: 'PatientOrderTransportationPurchaseSuccess',
                params: {
                  dropOffAddress,
                  pickupAddress,
                  pickupDate,
                  pickupTime,
                  customerOrderId,
                  selectedCard
                }
              })
            ]
          });

          navigation.dispatch(resetAction);
        }

        setTimeout(() => {
          this.setState({ actionLoading: false, buttonEnabled: true });
        }, 450);
      })
      .catch(error => {
        console.log('makePurchase error', error);
        this.setState({ actionLoading: false, buttonEnabled: true });
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  getDefaultCard() {
    const { cardData } = this.props;

    if (cardData.length) {
      const defaultCard = cardData.find(card => card.isDefault);
      if (defaultCard) {
        return defaultCard.cardUuid;
      }
    }
    return null;
  }

  render() {
    const { navigation, actions, cardData } = this.props;
    const {
      buttonEnabled,
      actionLoading,
      selectedCard,
      isModalOpen,
      promoCode,
      savings,
      resetFamilySelected,
    } = this.state;

    const showSavings = savings ? true : false;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Make a Reservation"
          onPressBack={this.onPressBack}
        />
        <PromoCodeModal
          vertical="Transportation"
          subtotal={'150.00'}
          onPressOne={this.onPressModalSave}
          buttonOneLabel="SUBMIT"
          isModalOpen={isModalOpen}
          onPressCloseButton={this.onPressCancelModal}
          modalHeight={340}
          scrollHeight={250}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBottomLine}>
              <AppText textWeight="500" style={styles.textCostSummary}>
                Cost Summary
              </AppText>
            </View>

            {showSavings ? (
              <>
                <PromoCodeDisplay
                  promoCode={promoCode}
                  savings={savings}
                  promoCodeRemoveCallback={this.promoCodeRemoveCallback}
                />
                <Entry text="Gift Card or Promo Code" amount={`-$${savings}`} />
                <View style={styles.miniSpacer} />
              </>
            ) : null}

            <Entry text="Transportation rates" amount="$60.00 / hr" />

            <View style={styles.miniSpacer} />
            <AppText textWeight="300" style={styles.textCostSummary}>
              Length of service will be calculated and payment proccessed at the
              conclusion of your trip.
            </AppText>
            <View style={styles.miniSpacer} />
            <AppText textWeight="300" style={styles.textCostSummary}>
              Trips are billed at a 1 hour minimum, 15 minute increments.
            </AppText>

            {!showSavings ? (
              <PromoCodeButton
                promoCodeButtonCallback={this.promoCodeButtonCallback}
              />
            ) : null}
          </View>

          <PaymentFamily
            selectedFamilyMembersReset={resetFamilySelected}
            selectedFamilyCallback={this.selectedFamilyCallback}
          />
          <PaymentCard
            navigation={navigation}
            actions={actions}
            cardData={cardData}
            selectedCard={selectedCard}
            selectedCardCallback={this.selectedCardCallback}
          />

          <View style={styles.buttonContainer}>
            {buttonEnabled ? (
              <ButtonLoading
                onPress={this.onPressPayment}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText
                  textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                  style={styles.buttonText}>
                  BOOK TRANSPORTATION
                </AppText>
              </ButtonLoading>
            ) : (
              <ButtonLoading
                activityPink={true}
                isLoading={true}
                containerStyle={FormStyles.buttonDisabled}>
                <AppText
                  textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                  style={styles.buttonTextDisabled}>
                  BOOK TRANSPORTATION
                </AppText>
              </ButtonLoading>
            )}
            <ButtonLoading
              onPress={this.onPressCancel}
              containerStyle={FormStyles.buttonCancel}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={FormStyles.buttonCancelText}>
                CANCEL AND RETURN HOME
              </AppText>
            </ButtonLoading>
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const Entry = ({ text, amount, style, bold }) => (
  <View style={styles.entryContainer}>
    <AppText textWeight={`${bold ? '600' : '300'}`} style={style}>
      {text}
    </AppText>
    <AppText textWeight={`${bold ? '600' : '300'}`} style={style}>
      {amount}
    </AppText>
  </View>
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...AuthActions,
      ...MyCalendarActions,
      ...TodaysAppointmentsActions,
      ...TransportationActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  auth: state.auth,
  cardData: state.profile.cardData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientOrderTransportationPayment);
