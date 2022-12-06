import React, {Component} from 'react';
import {View, ScrollView, Platform, Image, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import _ from 'lodash';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
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
import styles from './PatientBookCaregiversPayment.styles';
import images from '@assets/images';
import {Colors} from '@constants/GlobalStyles';

import BookCaregiversApi from '@api/bookCaregiversApi';

import * as AuthActions from '@ducks/auth';
import * as HomePersonalCareActions from '@ducks/homePersonalCare';
import * as AlertActions from '@ducks/alert';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';

const TAX_RATE = 0.13;

class PatientBookCaregiversPayment extends Component {
  constructor(props) {
    super(props);

    const services = props.navigation.getParam('services', []);
    const caregiverTimes = props.navigation.getParam('caregiverTimes', []);
    const selectedAddress = props.navigation.getParam('selectedAddress', null);
    const addressDisplayArr = props.navigation.getParam(
      'addressDisplayArr',
      null,
    );

    this.state = {
      services,
      caregiverTimes,
      selectedAddress,
      addressDisplayArr,
      actionLoading: false,
      buttonEnabled: true,
      selectedCard: this.getDefaultCard(),
      selectedFamilyMembers: [],
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
    ////this.mixpanel.track('View Book Caregivers Payment');
  }

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
    this.setState({savings: null, promoCode: null});
  };

  onPressModalSave = props => {
    const {promoCode, savings} = props;

    this.setState({isModalOpen: false, savings, promoCode});
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientHome');
  };

  selectedCardCallback = () => {};

  selectedFamilyCallback = values => {
    this.setState({
      selectedFamilyMembers: values,
      resetFamilySelected: false,
    });
  };

  async onPressPayment() {
    const {actions, navigation} = this.props;
    const {promoCode, selectedCard, addressDisplayArr, selectedAddress} =
      this.state;

    if (!selectedCard) {
      actions.setAlert('Please be sure to add a payment card.');
      return;
    }

    this.setState({
      actionLoading: true,
      buttonEnabled: false,
    });

    const extraData = {
      selectedAddress,
      promoCode,
    };

    await BookCaregiversApi.requestCaregiver({
      purchaseData: this.state,
      extraData,
    })
      .promise.then(async () => {
        actions.flagMyCalendarUpdate();
        actions.flagTodaysAppointmentsUpdate();
        actions.setCreditCaregiversAvailable(0);
        actions.flagDocumentsUpdate();

        const resetAction = StackActions.reset({
          index: 0,
          key: undefined,
          actions: [
            NavigationActions.navigate({
              routeName: 'PatientBookCaregiversPurchaseSuccess',
              params: {addressDisplayArr, selectedCard},
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
    const {navigation, actions, cardData} = this.props;
    const {
      selectedCard,
      buttonEnabled,
      actionLoading,
      selectedFamilyMembers,
      paymentCardAlertAmount,
      resetFamilySelected,
      savings,
      promoCode,
      isModalOpen,
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
                vertical="Caregivers"
                subtotal={null}
                hasMultipleSubtotals={true}
                skipMinimums
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
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.textCostSummary}>
                      Cost Summary
                    </AppText>
                  </View>
                  <AppText
                    textWeight={'300'}
                    style={styles.textCostSummarySubText}>
                    A $200 hold will be placed on your card until you speak to
                    our Care Planner.
                  </AppText>
                  <AppText
                    textWeight={'300'}
                    style={[styles.textCostSummarySubText, styles.gapTop]}>
                    Once your booking is confirmed with the Care Planner, your
                    credit card will be charged in accordance with the rates
                    provided for the services requested.
                  </AppText>
                  <View style={styles.miniSpacer} />
                  {showSavings ? (
                    <>
                      <PromoCodeDisplay
                        promoCode={promoCode}
                        savings={savings}
                        promoCodeRemoveCallback={this.promoCodeRemoveCallback}
                      />
                      <View style={styles.miniSpacer} />
                    </>
                  ) : null}
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
                  message={'A $200 hold will be placed on your card.'}
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...HomePersonalCareActions,
      ...AlertActions,
      ...AuthActions,
      ...MyCalendarActions,
      ...TodaysAppointmentsActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cartItems: state.homePersonalCare.cartItems,
  cart: state.homePersonalCare.cart,
  cardData: state.profile.cardData,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBookCaregiversPayment);
