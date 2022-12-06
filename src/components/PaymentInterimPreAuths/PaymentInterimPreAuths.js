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
import styles from './PaymentInterimPreAuths.styles';

import PaymentApi from '@api/paymentApi';

import * as AlertActions from '@ducks/alert';

class PaymentInterimPreAuths extends Component {
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
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Payment Interim Pre-Auths');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  render() {
    const { auth } = this.props;
    const { processPaymentData } = this.state;

    const preAuthText = pluralize(processPaymentData.failedPreAuths.length, 'pre-authorization', false);
    const cardText = pluralize(processPaymentData.failedPreAuths.length, 'card', false);
    const wasWereText = processPaymentData.failedPreAuths.length === 1 ? 'was' : 'were';

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
        <CustomHeaderBack title="Payment Review" onPressBack={this.onPressBack} />
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
                To process this transaction successfully, you'll need to go back and try again without including the failed card.
              </Text>
              <View style={styles.buttonContainer}>
                <AppButton
                  onPress={this.onPressBack}
                  width={100}
                  height={38}
                  backgroundColor={Colors.buttonSecondary}
                  disabled={false}>
                  <Text style={styles.buttonText}>Go Back</Text>
                </AppButton>
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

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
)(PaymentInterimPreAuths);
