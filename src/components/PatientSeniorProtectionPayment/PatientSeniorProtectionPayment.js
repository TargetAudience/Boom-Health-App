import React, {Component} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import _ from 'lodash';
import analytics from '@react-native-firebase/analytics';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {
  CustomHeaderBack,
  PaymentCard,
  ButtonLoading,
  PaymentFamilyUnavailable,
  AppText,
  PromoCodeButton,
  PromoCodeModal,
  PromoCodeDisplay,
} from '@components/common';
import {currencyFormat, calculateTotalTax} from '@utils/Globals';
import {FormStyles} from '@constants/GlobalStyles';
import styles from './PatientSeniorProtectionPayment.styles';
import { Colors } from '@constants/GlobalStyles';

import PaymentApi from '@api/paymentApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

class PatientSeniorProtectionPayment extends Component {
  constructor(props) {
    super(props);

    const addressDisplayArr = props.navigation.getParam(
      'addressDisplayArr',
      null,
    );
    const selectedPackage = props.navigation.getParam('selectedPackage', null);

    const subtotal = parseFloat(selectedPackage.data.totalPrice.substring(1));

    this.state = {
      selectedPackage,
      preAuthsData: {},
      selectedCard: this.getDefaultCard(),
      actionLoading: false,
      buttonEnabled: true,
      addressDisplayArr,
      selectedFamilyMembers: [],
      originalSubtotal: subtotal,
      subtotal,
      yourTotal: subtotal,
      tax: '',
      total: '',
      paymentCardAlertAmount: null,
      isModalOpen: false,
      savings: null,
      promoCode: '',
      resetFamilySelected: false,
      totals: null,
    };

    this.onPressPayment = this.onPressPayment.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  async componentDidMount() {
    this.recalculateCart();
    await analytics().logScreenView({
      screen_name: 'patient_senior_protection_payment',
      screen_class: 'patient_senior_protection_payment',
    });

    //this.mixpanel.track('View Senior Protection Payment');
  }

  recalculateCart = () => {
    const {subtotal, originalSubtotal, savings, addressDisplayArr} = this.state;

    if (savings) {
      const revisedSubtotal = (
        parseFloat(subtotal) - parseFloat(savings)
      ).toFixed(2);
      const totals = calculateTotalTax(
        addressDisplayArr.province,
        revisedSubtotal,
      );

      this.setState(
        {
          totals,
          yourTotal: subtotal,
          subtotal: totals.subtotal,
          tax: totals.taxTotal,
          total: totals.grandTotal,
          resetFamilySelected: true,
        },
        () => {
          this.selectedFamilyCallback([]);
        },
      );
    } else {
      const revisedSubtotal = parseFloat(originalSubtotal).toFixed(2);
      const totals = calculateTotalTax(
        addressDisplayArr.province,
        revisedSubtotal,
      );

      this.setState(
        {
          totals,
          subtotal: totals.subtotal,
          tax: totals.taxTotal,
          total: totals.grandTotal,
          resetFamilySelected: true,
        },
        () => {
          this.selectedFamilyCallback([]);
        },
      );
    }
  };

  onPressCancelModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  promoCodeButtonCallback = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  promoCodeRemoveCallback = () => {
    this.setState({savings: null, promoCode: null}, () => {
      this.recalculateCart();
    });
  };

  onPressModalSave = props => {
    const {promoCode, savings} = props;

    this.setState({isModalOpen: false, savings, promoCode}, () => {
      this.recalculateCart();
    });
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    const {navigation, actions} = this.props;

    navigation.navigate('PatientHome');
  };

  selectedCardCallback = value => {
    if (value === 'default') {
      this.setState({selectedCard: this.getDefaultCard()});
    } else {
      this.setState({selectedCard: value});
    }
  };

  selectedFamilyCallback = values => {
    const {total} = this.state;

    let pricePerPerson = total;
    if (values.length >= 1) {
      pricePerPerson = total / (values.length + 1);
    }

    this.setState({
      selectedFamilyMembers: values,
      paymentCardAlertAmount: pricePerPerson,
      resetFamilySelected: false,
    });
  };

  async onPressPayment() {
    const {actions, navigation} = this.props;
    const {
      selectedPackage,
      totals,
      total,
      selectedCard,
      addressDisplayArr,
      savings,
      promoCode,
    } = this.state;

    if (!selectedCard) {
      actions.setAlert('Please be sure to add a payment card.');
      return;
    }

    const selectedAddress = this.props.navigation.getParam(
      'selectedAddress',
      null,
    );

    this.setState({
      preAuthsData: {},
      actionLoading: true,
      buttonEnabled: false,
    });

    const extraData = {
      paymentVertical: 'personalprotection',
      selectedAddress,
      selectedPackage,
      customerOrderIdPrefix: 'BPP',
      savings,
      promoCode,
      totals,
    };

    await PaymentApi.processSubscription({
      purchaseData: this.state,
      extraData,
    })
      .promise.then(async result => {
        const processPaymentData = result.data;

        const customerOrderId = processPaymentData.customerOrderId;

        await analytics().logEvent('purchase_senior_protection', {
          transaction_id: customerOrderId,
          value: parseFloat(total),
          currency: 'CAD',
        });

        actions.flagDocumentsUpdate();

        const resetAction = StackActions.reset({
          index: 0,
          key: undefined,
          actions: [
            NavigationActions.navigate({
              routeName: 'PatientSeniorProtectionPurchaseSuccess',
              params: {addressDisplayArr, customerOrderId, selectedCard},
            }),
          ],
        });

        navigation.dispatch(resetAction);

        setTimeout(() => {
          this.setState({actionLoading: false, buttonEnabled: true});
        }, 450);
      })
      .catch(error => {
        console.log('processPayment error', error);
        this.setState({actionLoading: false, buttonEnabled: true});
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  getDefaultCard() {
    const {cardData} = this.props;

    if (cardData.length) {
      const defaultCard = cardData.find(card => card.isDefault);
      if (defaultCard) {
        return defaultCard.cardUuid;
      }
    }
  }

  render() {
    const {cardData, actions, navigation} = this.props;
    const {
      selectedFamilyMembers,
      paymentCardAlertAmount,
      buttonEnabled,
      selectedCard,
      actionLoading,
      tax,
      total,
      savings,
      yourTotal,
      promoCode,
      isModalOpen,
      subtotal,
      addressDisplayArr,
    } = this.state;

    const showSavings = savings ? true : false;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <CustomHeaderBack
                title="Payment"
                onPressBack={this.onPressBack}
              />
              <PromoCodeModal
                vertical="SeniorProtection"
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
                      <Entry text="Your Total" amount={`$${yourTotal}`} />
                      <Entry
                        text="Gift Card or Promo Code"
                        amount={`-$${savings}`}
                      />
                    </>
                  ) : null}
                  <Entry text="Subtotal" amount={currencyFormat(subtotal)} />
                  <View style={styles.miniSpacer} />
                  <Entry text="Shipping &amp; Setup" amount={'Free'} />
                  <View style={styles.miniSpacer} />
                  <Entry
                    text={`Taxes (${addressDisplayArr.province})`}
                    amount={currencyFormat(tax)}
                  />
                  <Entry
                    text="Total"
                    amount={`CAD ${currencyFormat(total)}`}
                    bold
                  />
                  {!showSavings ? (
                    <PromoCodeButton
                      promoCodeButtonCallback={this.promoCodeButtonCallback}
                    />
                  ) : null}
                </View>

                <PaymentFamilyUnavailable />
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
                      <AppText
                        textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                        style={styles.buttonText}>
                        PLACE ORDER
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
                        PLACE ORDER
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
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.mainBackground}}
        />
      </>
    );
  }
}

const Entry = ({text, amount, style, bold}) => (
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
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cartItems: state.equipment.cartItems,
  cart: state.equipment.cart,
  cardData: state.profile.cardData,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientSeniorProtectionPayment);
