import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import _ from 'lodash';
import {
  CustomHeaderBack,
  ButtonLoading,
  AppText,
  PaymentFamily,
  PaymentCard,
  PromoCodeButton,
  PromoCodeModal,
  PromoCodeDisplay
} from '@components/common';
import { currencyFormat } from '@utils/Globals';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './PatientBookHomePersonalCarePayment.styles';
import analytics from '@react-native-firebase/analytics';

import PaymentApi from '@api/paymentApi';

import * as AuthActions from '@ducks/auth';
import * as HomePersonalCareActions from '@ducks/homePersonalCare';
import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

const TAX_RATE = 0.13;

class PatientBookHomePersonalCarePayment extends Component {
  constructor(props) {
    super(props);

    const selectedAddress = props.navigation.getParam('selectedAddress', null);
    const note = props.navigation.getParam('note', null);
    const addressDisplayArr = props.navigation.getParam(
      'addressDisplayArr',
      null
    );

    this.state = {
      selectedAddress,
      addressDisplayArr,
      subtotal: props.cart.subtotal,
      yourTotal: props.cart.subtotal,
      tax: '',
      total: '',
      note,
      actionLoading: false,
      buttonEnabled: true,
      selectedCard: this.getDefaultCard(),
      selectedFamilyMembers: [],
      paymentCardAlertAmount: null,
      isModalOpen: false,
      savings: null,
      promoCode: '',
      resetFamilySelected: false
    };

    this.onPressPayment = this.onPressPayment.bind(this);
  }

  componentDidMount() {
    this.recalculateCart();
  }

  recalculateCart = () => {
    const { cart } = this.props;
    const { subtotal, savings } = this.state;

    if (savings) {
      const revisedSubtotal = (
        parseFloat(subtotal) - parseFloat(savings)
      ).toFixed(2);
      const taxPre = parseFloat(revisedSubtotal) * TAX_RATE;
      const tax = taxPre.toFixed(2);
      const totalPre = parseFloat(revisedSubtotal) + parseFloat(tax);
      const total = totalPre.toFixed(2);

      this.setState(
        {
          yourTotal: subtotal,
          subtotal: revisedSubtotal,
          tax,
          total,
          resetFamilySelected: true,
        },
        () => {
          this.selectedFamilyCallback([]);
        }
      );
    } else {
      const taxPre = parseFloat(cart.subtotal) * TAX_RATE;
      const tax = taxPre.toFixed(2);
      const totalPre = parseFloat(cart.subtotal) + parseFloat(tax);
      const total = totalPre.toFixed(2);

      this.setState(
        { subtotal: cart.subtotal, tax, total, resetFamilySelected: true },
        () => {
          this.selectedFamilyCallback([]);
        }
      );
    }
  };

  onPressCancelModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    const { navigation, actions } = this.props;

    actions.clearPersonalCareCart();

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
    const { total } = this.state;

    let resetFamilySelected;
    let pricePerPerson = total;
    if (values.length >= 1) {
      resetFamilySelected = false;
      pricePerPerson = total / (values.length + 1);
    } else {
      resetFamilySelected = true;
    }

    this.setState({
      resetFamilySelected,
      selectedFamilyMembers: values,
      paymentCardAlertAmount: pricePerPerson,
      resetFamilySelected: false
    });
  };

  promoCodeButtonCallback = () => {
    this.setState({
      isModalOpen: true
    });
  };

  promoCodeRemoveCallback = () => {
    this.setState({ savings: null, promoCode: null }, () => {
      this.recalculateCart();
    });
  };

  onPressModalSave = props => {
    const { promoCode, savings } = props;

    this.setState({ isModalOpen: false, savings, promoCode }, () => {
      this.recalculateCart();
    });
  };

  paymentCallback = props => {
    const { actions, navigation } = this.props;
    const { total, preAuthsData, addressDisplayArr, selectedCard } = this.state;
    const { closeLoadingModal } = props;

    let customerOrderId;
    if (!_.isNil(preAuthsData.successfullPreAuths)) {
      customerOrderId = preAuthsData.successfullPreAuths[0].customerOrderId;
    } else {
      customerOrderId = preAuthsData.otherSuccessfulPreAuths[0].customerOrderId;
    }

    actions.clearPersonalCareCart();
    actions.flagMyCalendarUpdate();
    actions.flagTodaysAppointmentsUpdate();
    actions.flagDocumentsUpdate();
    
    analytics().logEvent('purchase_personalcare', {
      transaction_id: customerOrderId,
      value: parseFloat(total),
      currency: 'CAD'
    });

    const resetAction = StackActions.reset({
      index: 0,
      key: undefined,
      actions: [
        NavigationActions.navigate({
          routeName: 'PatientBookCaregiversPurchaseSuccess',
          params: { addressDisplayArr, customerOrderId, selectedCard }
        })
      ]
    });

    navigation.dispatch(resetAction);

    setTimeout(() => {
      closeLoadingModal();
    }, 300);
  };

  async onPressPayment() {
    const { actions, navigation, cart, cartItems } = this.props;
    const {
      total,
      selectedCard,
      addressDisplayArr,
      selectedAddress,
      savings,
      promoCode
    } = this.state;

    if (!selectedCard) {
      actions.setAlert('Please be sure to add a payment card.');
      return;
    }

    this.setState({
      preAuthsData: {},
      actionLoading: true,
      buttonEnabled: false,
    });

    const extraData = {
      paymentVertical: 'personalcare',
      selectedAddress,
      cart,
      cartItems,
      customerOrderIdPrefix: 'PCG',
      savings,
      promoCode
    };

    await PaymentApi.processPayment({
      purchaseData: this.state,
      extraData
    })
      .promise.then(async result => {
        const processPaymentData = result.data;

        this.setState({ preAuthsData: processPaymentData });

        if (processPaymentData.failedPreAuths) {
          navigation.navigate('PaymentInterim', {
            processPaymentData,
            purchaseData: this.state,
            extraData,
            paymentCallback: this.paymentCallback,
          });
        } else {
          const customerOrderId = processPaymentData.customerOrderId;

          actions.clearPersonalCareCart();
          actions.flagMyCalendarUpdate();
          actions.flagTodaysAppointmentsUpdate();

          analytics().logEvent('purchase_personalcare', {
            transaction_id: customerOrderId,
            value: parseFloat(total),
            currency: 'CAD'
          });

          const resetAction = StackActions.reset({
            index: 0,
            key: undefined,
            actions: [
              NavigationActions.navigate({
                routeName: 'PatientBookHomePersonalCarePurchaseSuccess',
                params: { addressDisplayArr, customerOrderId, selectedCard }
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
        console.log('processPayment error', error);
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
  }

  render() {
    const { navigation, actions, cardData } = this.props;
    const {
      resetFamilySelected,
      savings,
      yourTotal,
      promoCode,
      subtotal,
      isModalOpen,
      selectedCard,
      buttonEnabled,
      actionLoading,
      tax,
      total,
      selectedFamilyMembers,
      paymentCardAlertAmount,
    } = this.state;

    const showSavings = savings ? true : false;

    return (
      <>
        <CustomHeaderBack title="Payment" onPressBack={this.onPressBack} />
        <PromoCodeModal
          vertical="PersonalCare"
          subtotal={subtotal}
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
              <AppText textWeight="600" style={styles.textCostSummary}>
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
                <Entry text="Your Total" amount={`$${yourTotal}`} />
                <Entry text="Gift Card or Promo Code" amount={`-$${savings}`} />
              </>
            ) : null}
            <Entry text="Subtotal" amount={`$${subtotal}`} />
            <Entry text="Taxes" amount={`$${tax}`} />
            <Entry text="Total" amount={`CAD $${total}`} bold />
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
            selectedFamilyMembers={selectedFamilyMembers}
            alertAmount={currencyFormat(paymentCardAlertAmount)}
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
                <Text style={styles.buttonText}>PLACE ORDER</Text>
              </ButtonLoading>
            ) : (
              <ButtonLoading
                activityPink={true}
                isLoading={true}
                containerStyle={FormStyles.buttonDisabled}>
                <Text style={styles.buttonTextDisabled}>PLACE ORDER</Text>
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
      </>
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
      ...HomePersonalCareActions,
      ...AlertActions,
      ...AuthActions,
      ...MyCalendarActions,
      ...TodaysAppointmentsActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  cartItems: state.homePersonalCare.cartItems,
  cart: state.homePersonalCare.cart,
  cardData: state.profile.cardData,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCarePayment);
