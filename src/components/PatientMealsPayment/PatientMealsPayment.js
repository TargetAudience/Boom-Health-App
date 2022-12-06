import React, {Component} from 'react';
import {View, ScrollView, Platform, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
//import MixpanelManager from '@utils/Analytics';
import _ from 'lodash';
import analytics from '@react-native-firebase/analytics';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {
  CustomHeaderBack,
  PaymentCard,
  ButtonLoading,
  PaymentFamily,
  AppText,
  PromoCodeButton,
  PromoCodeModal,
  PromoCodeDisplay,
} from '@components/common';
import {currencyFormat} from '@utils/Globals';
import {FormStyles} from '@constants/GlobalStyles';
import styles from './PatientMealsPayment.styles';
import {Colors} from '@constants/GlobalStyles';

import PaymentApi from '@api/paymentApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as MealsActions from '@ducks/meals';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

const TAX_RATE = 0.13;

class PatientMealsPayment extends Component {
  constructor(props) {
    super(props);

    const selectedThisWeeksDelivery = props.navigation.getParam(
      'selectedThisWeeksDelivery',
      null,
    );
    const selectedFurtherWeeksDelivery = props.navigation.getParam(
      'selectedFurtherWeeksDelivery',
      null,
    );
    const selectedIsThisWeek = props.navigation.getParam(
      'selectedIsThisWeek',
      null,
    );
    const note = props.navigation.getParam('note', null);
    const addressDisplayArr = props.navigation.getParam(
      'addressDisplayArr',
      null,
    );

    this.state = {
      actionLoading: false,
      buttonEnabled: true,
      selectedCard: this.getDefaultCard(),
      note,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
      addressDisplayArr,
      selectedFamilyMembers: [],
      preAuthsData: {},
      subtotal: props.cart.subtotal,
      yourTotal: props.cart.subtotal,
      tax: '',
      total: '',
      paymentCardAlertAmount: null,
      isModalOpen: false,
      savings: null,
      promoCode: '',
      resetFamilySelected: false,
    };

    this.onPressPayment = this.onPressPayment.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.recalculateCart();
    // //this.mixpanel.track('View Meals Payment');
  }

  recalculateCart = () => {
    const {cart} = this.props;
    const {subtotal, savings} = this.state;

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
          yourTotal: subtotal.toFixed(2),
          subtotal: revisedSubtotal,
          tax,
          total,
          resetFamilySelected: true,
        },
        () => {
          this.selectedFamilyCallback([]);
        },
      );
    } else {
      const taxPre = parseFloat(cart.subtotal) * TAX_RATE;
      const tax = taxPre.toFixed(2);
      const totalPre = parseFloat(cart.subtotal) + parseFloat(tax);
      const total = totalPre.toFixed(2);

      this.setState(
        {subtotal: cart.subtotal, tax, total, resetFamilySelected: true},
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

    actions.clearCart();

    navigation.navigate('PatientHome');
  };

  selectedCardCallback = value => {
    if (value === 'default') {
      this.setState({selectedCard: this.getDefaultCard()});
    } else {
      this.setState({selectedCard: value});
    }
  };

  paymentCallback = props => {
    const {actions, navigation} = this.props;
    const {total, preAuthsData, addressDisplayArr, selectedCard} = this.state;
    const {closeLoadingModal} = props;

    let customerOrderId;
    if (!_.isNil(preAuthsData.successfullPreAuths)) {
      customerOrderId = preAuthsData.successfullPreAuths[0].customerOrderId;
    } else {
      customerOrderId = preAuthsData.otherSuccessfulPreAuths[0].customerOrderId;
    }

    actions.clearCart();
    actions.flagMyCalendarUpdate();
    actions.flagTodaysAppointmentsUpdate();
    actions.flagDocumentsUpdate();

    analytics().logEvent('purchase_meals', {
      transaction_id: customerOrderId,
      value: parseFloat(total),
      currency: 'CAD',
    });

    const resetAction = StackActions.reset({
      index: 0,
      key: undefined,
      actions: [
        NavigationActions.navigate({
          routeName: 'PatientMealsPurchaseSuccess',
          params: {addressDisplayArr, customerOrderId, selectedCard},
        }),
      ],
    });

    navigation.dispatch(resetAction);

    setTimeout(() => {
      closeLoadingModal();
    }, 300);
  };

  async onPressPayment() {
    const {auth, actions, navigation, meals, cart} = this.props;
    const {
      addressDisplayArr,
      total,
      savings,
      promoCode,
      selectedCard,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
    } = this.state;

    if (!selectedCard) {
      actions.setAlert('Please be sure to add a payment card.');
      return;
    }

    const isRedeemingCredit = parseFloat(auth.creditMeals) !== 0 ? 1 : 0;
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
      paymentVertical: 'meals',
      isRedeemingCredit,
      selectedAddress,
      cart,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
      cartItemsMeals: meals.cartItemsMeals,
      dietaryRestrictions: meals.dietaryRestrictions,
      customerOrderIdPrefix: 'MLS',
      savings,
      promoCode,
    };
    console.log('this.state', this.state)
    console.log('extraData', extraData)
    await PaymentApi.processPayment({
      purchaseData: this.state,
      extraData,
    })
      .promise.then(async result => {
        const processPaymentData = result.data;
        console.log('result', result)
        this.setState({preAuthsData: processPaymentData});

        if (processPaymentData.failedPreAuths) {
          navigation.navigate('PaymentInterim', {
            processPaymentData,
            purchaseData: this.state,
            extraData,
            paymentCallback: this.paymentCallback,
          });
        } else {
          const customerOrderId = processPaymentData.customerOrderId;
console.log('customerOrderId', customerOrderId)
          actions.clearCart();
          actions.flagMyCalendarUpdate();
          actions.flagTodaysAppointmentsUpdate();
          actions.flagDocumentsUpdate();

          analytics().logEvent('purchase_meals', {
            transaction_id: customerOrderId,
            value: parseFloat(total),
            currency: 'CAD',
          });
          console.log('parseFloat(total)(total)erId', parseFloat(total))
          const resetAction = StackActions.reset({
            index: 0,
            key: undefined,
            actions: [
              NavigationActions.navigate({
                routeName: 'PatientMealsPurchaseSuccess',
                params: {
                  addressDisplayArr,
                  customerOrderId: customerOrderId,
                  selectedCard,
                },
              }),
            ],
          });

          navigation.dispatch(resetAction);
        }

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
      resetFamilySelected,
      savings,
      yourTotal,
      promoCode,
      isModalOpen,
      subtotal,
    } = this.state;
    console.log('resetFamilySelected', resetFamilySelected);
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
                vertical="Meals"
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

                  <Entry text="Meals Total" amount={currencyFormat(subtotal)} />
                  <View style={styles.miniSpacer} />
                  <Entry text="Delivery" amount="Free" />
                  <View style={styles.miniSpacer} />
                  <Entry text="Taxes" amount={currencyFormat(tax)} />
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
      ...MealsActions,
      ...AuthActions,
      ...MyCalendarActions,
      ...TodaysAppointmentsActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cart: state.meals.cart,
  meals: state.meals,
  cardData: state.profile.cardData,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientMealsPayment);
