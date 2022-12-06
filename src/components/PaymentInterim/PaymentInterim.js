import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, Button, Dimensions } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import _ from 'lodash';
import {
  CustomHeaderBack,
  AppButton,
  ButtonLoading,
  LoadingModal
} from '@components/common';
import { pluralize, decimalTwoPlaces, currencyFormat } from '@utils/Globals';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PaymentInterim.styles';

import PaymentApi from '@api/paymentApi';

import * as AlertActions from '@ducks/alert';

class PaymentInterim extends Component {
  constructor(props) {
    super(props);

    const processPaymentData = props.navigation.getParam('processPaymentData', null);
    const extraData = props.navigation.getParam('extraData', null);
    const purchaseData = props.navigation.getParam('purchaseData', null);
    const paymentCallback = props.navigation.getParam('paymentCallback', null);

    this.state = {
      processPaymentData,
      extraData,
      purchaseData,
      paymentCallback,
      actionLoading: false,
      buttonEnabled: true,
      loadingModalVisible: false
    };

    this.onPressCancelTransaction = this.onPressCancelTransaction.bind(this);
    this.onPressPaymentSplit = this.onPressPaymentSplit.bind(this);
    this.onPressPaymentMyself = this.onPressPaymentMyself.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Payment Interim');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCancelTransaction() {
    const { actions } = this.props;
    const { processPaymentData } = this.state;

    this.setState({ loadingModalVisible: true });

    PaymentApi.cancelTransaction({
      successfullPreAuths: processPaymentData.successfullPreAuths
    })
      .promise.then(result => {
        this.onPressBack();

        this.setState({ loadingModalVisible: false });
      })
      .catch(error => {
        console.log('PaymentInterim onPressCancelTransaction error', error);
        this.setState({ loadingModalVisible: false });
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  closeLoadingModal = () => {
    this.setState({ loadingModalVisible: false });
  }

  async onPressPaymentSplit() {
    const { actions, navigation } = this.props;
    const { processPaymentData, purchaseData, extraData, paymentCallback } = this.state;

    const splitAmount = this.getSplitAmount();

    this.setState({ loadingModalVisible: true });

    PaymentApi.paymentSplitRemaining({ 
      processPaymentData,
      purchaseData, 
      extraData,
      splitAmount
    })
      .promise.then(result => {
        const data = result.data;

        paymentCallback({closeLoadingModal: this.closeLoadingModal});
      })
      .catch(error => {
        console.log('PaymentInterim onPressPaymentSplit error', error);
        this.setState({ loadingModalVisible: false });
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  async onPressPaymentMyself() {
    const { actions, navigation } = this.props;
    const { processPaymentData, purchaseData, extraData, paymentCallback } = this.state;

    const totalRemaining = this.getRemaining();
    const myPreAuth = this.getMyPreAuth();
    const otherSuccessfulPreAuths = this.getOtherSuccessfulPreAuths();

    this.setState({ loadingModalVisible: true });

    PaymentApi.payRemainingMyself({
      processPaymentData,
      purchaseData, 
      extraData,
      totalRemaining, 
      myPreAuth, 
      otherSuccessfulPreAuths
    })
      .promise.then(result => {
        const data = result.data;

        paymentCallback({closeLoadingModal: this.closeLoadingModal});
      })
      .catch(error => {
        console.log('PaymentInterim onPressPaymentMyself error', error);
        this.setState({ loadingModalVisible: false });
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  renderCancelButton() {
    return (
      <TouchableHighlight
        onPress={this.onPressCancelTransaction}
        underlayColor="transparent"
        hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
        <Text style={styles.textCancelTransaction}>Cancel transaction and return</Text>
      </TouchableHighlight>
    )
  }

  renderButtons(remainingOnlyMyself, totalRemaining) {
    const { actionLoading, buttonEnabled } = this.state;

    return (
      <View style={styles.buttonContainer}>
        {buttonEnabled ? (
          <ButtonLoading
            onPress={this.onPressPaymentMyself}
            isLoading={actionLoading}
            containerStyle={FormStyles.button}>
            <Text style={styles.buttonText}>PAY REMAINING ${totalRemaining} MYSELF</Text>
          </ButtonLoading>
        ) : (
          <ButtonLoading
            activityPink={true}
            isLoading={true}
            containerStyle={FormStyles.buttonDisabled}>
            <Text style={styles.buttonTextDisabled}>PAY REMAINING ${totalRemaining} MYSELF</Text>
          </ButtonLoading>
        )}
        {!remainingOnlyMyself ? (
          <View style={styles.buttonContainerSecondRow}>
            {buttonEnabled ? (
              <ButtonLoading
                onPress={this.onPressPaymentSplit}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <Text style={styles.buttonText}>SPLIT REMAINING ${totalRemaining}</Text>
              </ButtonLoading>
            ) : (
              <ButtonLoading
                activityPink={true}
                isLoading={true}
                containerStyle={FormStyles.buttonDisabled}>
                <Text style={styles.buttonTextDisabled}>SPLIT REMAINING ${totalRemaining}</Text>
              </ButtonLoading>
            )}
            </View>
        ) : null}
        {this.renderCancelButton()}
      </View>
    )
  }

  getMyPreAuth = () => {
    const { auth } = this.props;
    const { processPaymentData } = this.state;

    let myPreAuth;
    processPaymentData.successfullPreAuths.forEach(function(item) {
      if (auth.userId === item.userId) {
        myPreAuth = item;
      }
    });
    return myPreAuth;
  }

  getOtherSuccessfulPreAuths = () => {
    const { auth } = this.props;
    const { processPaymentData } = this.state;

    let preAuthsArr = [];
    processPaymentData.successfullPreAuths.forEach(function(item) {
      if (auth.userId !== item.userId) {
        preAuthsArr.push(item);
      }
    });
    return preAuthsArr;
  }

  getSplitAmount = () => {
    const { processPaymentData } = this.state;

    const countSuccessfulPreAuths = processPaymentData.successfullPreAuths.length;
    const remainingToBeCharged = this.getRemaining();
    const num = remainingToBeCharged / countSuccessfulPreAuths;
    return parseFloat(num).toFixed(2);
  }

  getRemaining = () => {
    const { processPaymentData } = this.state;

    const totalRemaining = processPaymentData.failedPreAuths.reduce(function(sum, item) {
      return sum = sum + Number(item.total);
    }, 0);

    return parseFloat(totalRemaining).toFixed(2);
  }

  render() {
    const { auth } = this.props;
    const { processPaymentData, loadingModalVisible } = this.state;

    const preAuthText = pluralize(processPaymentData.failedPreAuths.length, 'pre-authorization', false);
    const cardText = pluralize(processPaymentData.failedPreAuths.length, 'card', false);
    const wasWereText = processPaymentData.failedPreAuths.length === 1 ? 'was' : 'were';

    const totalRemaining = this.getRemaining();

    let remainingMessage = '';
    const remainingOnlyMyself = processPaymentData.successfullPreAuths.length === 1 ? true : false;
    if (remainingOnlyMyself) {
      remainingMessage = 'You can pay the remaining balance of $' + totalRemaining + ' yourself, or choose to cancel.';
    } else {
      remainingMessage = 'You can pay the remaining balance of $' + totalRemaining + ' yourself or split it between yourself';
      processPaymentData.successfullPreAuths.forEach(function(item) {
        if (auth.userId !== item.userId) {
          remainingMessage += ' and ' + item.fullName;
        }
      });
      remainingMessage += '. Alternatively, you can choose to cancel.';
    }

    const personList = processPaymentData.failedPreAuths.map(item => (
      <View style={styles.row} key={item.userId.toString()}>
        <View style={styles.column}>
          <Text style={styles.textTitle}>Name</Text>
          <Text style={styles.textValue}>{item.fullName}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.textTitle}>Message</Text>
          <Text style={styles.textValue}>{item.message}</Text>
        </View>
      </View>
    ));

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Payment Review" />
          <ScrollView style={styles.scrollView}>
            <View style={styles.contentContainer}>
              <Text style={styles.topText}>
                The following credit {cardText} {preAuthText} {wasWereText} declined by our payment processor:
              </Text>
              <Text style={styles.helpText}>
                {personList}
              </Text>
              <View style={styles.hr} />
              <Text style={styles.optionsText}>
                {remainingMessage}
              </Text>
            </View>

            {this.renderButtons(remainingOnlyMyself, totalRemaining)}
            <LoadingModal visible={loadingModalVisible} color={Colors.buttonMain} />
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const Entry = ({ text, amount, style }) => (
  <View style={styles.entryContainer}>
    <Text style={style}>{text}</Text>
    <Text style={style}>{amount}</Text>
  </View>
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInterim);
