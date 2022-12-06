import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cardValidator from 'card-validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import creditCardType from 'credit-card-type';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  CreditCardInput,
  CreditCardIcon,
  AppText,
  ScreenWrapper
} from '@components/common';
import images from '@assets/images';
import { pluralize, onlyNumbers, prettyCardNumber, extractCardType, uuidv4 } from '@utils/Globals';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import styles from './AddCard.styles';
import CryptoES from 'crypto-es';
import {genRanHex} from '@utils/Globals';

import * as ProfileActions from '@ducks/profile';
import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardType: '',
      cvv: '',
      expiryMonth: '',
      expiryYear: '',
      cardNumber: '',
      nameOnCard: '',
      actionLoading: false
    };

    this.stateSave = {
      cardType: '',
      cvv: '1234',
      expiryMonth: '12',
      expiryYear: '24',
      cardNumber: '4024007147484447',
      nameOnCard: 'Josh Winter',
      actionLoading: false
    };

    this.onPressAddCard = this.onPressAddCard.bind(
      this
    );

    this.nextKeyboardCardNumber = this.nextKeyboardCardNumber.bind(this);
    this.nextKeyboardExpiryMonth = this.nextKeyboardExpiryMonth.bind(this);
    this.nextKeyboardExpiryYear = this.nextKeyboardExpiryYear.bind(this);
    this.nextKeyboardCvv = this.nextKeyboardCvv.bind(this);

    this.cardNumberRef = React.createRef();
    this.expiryMonthRef = React.createRef();
    this.expiryYearRef = React.createRef();
    this.cvvRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Add Credit Card');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  async onPressAddCard() {
    const { navigation, actions, cardData } = this.props;
    const {
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard
    } = this.state;

    if (nameOnCard === '') {
      actions.setAlert('Please enter the name on your credit card.');
      return;
    }

    if (expiryMonth === '') {
      actions.setAlert('Please enter your credit card expiry month.');
      return;
    }

    if (expiryYear === '') {
      actions.setAlert('Please enter your credit card expiry year.');
      return;
    }

    if (cardNumber === '') {
      actions.setAlert('Please enter your credit card number.');
      return;
    }

    if (!cardValidator.number(cardNumber).isValid) {
      actions.setAlert('Please be sure to enter a valid credit card number.');
      return;
    }

    if (cvv === '') {
      actions.setAlert('Please enter your credit card cvc.');
      return;
    }

    this.setState({ actionLoading: true });

    const cardUuid = uuidv4();
    const last4 = cardNumber.substr(cardNumber.length - 4);
    const isDefault = cardData.length === 0 ? 1 : 0;

    const key = CryptoES.enc.Hex.parse('B716D4E001AC020A176F825D3F9AA1EC');
    const generateIV = genRanHex(32);
    const iv = CryptoES.enc.Hex.parse(generateIV);

    const data = {
      cardUuid,
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard,
      last4,
      isDefault
    };

    const ciphertext = CryptoES.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
    }).toString();

    await ProfileApi.addCard({
      encrypted: ciphertext,
      iv: generateIV,
    })
      .promise.then(async () => {
        this.setState({ actionLoading: false });

        actions.addCard(data);

        navigation.goBack();
        navigation.state.params.onRefresh();

        actions.setAlert('Your credit card has been added.');
      })
      .catch(error => {
        console.log('Payment info error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardCardNumber() {
    this.cardNumberRef.current.focus();
  }

  nextKeyboardExpiryMonth() {
    this.expiryMonthRef.current.focus();
  }

  nextKeyboardExpiryYear() {
    this.expiryYearRef.current.focus();
  }

  nextKeyboardCvv() {
    this.cvvRef.current.focus();
  }

  render() {
    const {
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard,
      actionLoading,
      showNewCardForm
    } = this.state;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Add Card"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView style={styles.container} extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <InputWithLabel
              onRef={this.nameOnCardRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              returnKeyType="next"
              label="Name on Card"
              value={nameOnCard}
              onChangeText={text => this.setState({ nameOnCard: text })}
              onSubmitEditing={this.nextKeyboardCardNumber}
            />
            <CreditCardInput
              onRef={this.cardNumberRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              number={cardNumber}
              type={cardType}
              returnKeyType="done"
              onChangeText={text => {
                const cleanText = onlyNumbers(text);
                let ccType = '';
                if (text) {
                  ccType = extractCardType(creditCardType(cleanText));
                }
                this.setState({
                  cardNumber: prettyCardNumber(cleanText, ccType),
                  cardType: ccType
                });
              }}
              onSubmitEditing={this.nextKeyboardExpiryMonth}
            />
            <View style={FormStyles.inputSideBySide}>
              <View
                style={[
                  FormStyles.inputSideBySideInner,
                  FormStyles.sideBySideFirst
                ]}>
                <InputWithLabel
                  onRef={this.expiryMonthRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={2}
                  numberOfLines={1}
                  placeholder="MM"
                  returnKeyType="done"
                  keyboardType="numeric"
                  label="Expiry Month"
                  value={expiryMonth}
                  onChangeText={text => {
                    this.setState({ expiryMonth: onlyNumbers(text) });
                    if (text.length === 2) {
                      this.nextKeyboardExpiryYear();
                    }
                  }}
                  onSubmitEditing={this.nextKeyboardCvv}
                />
              </View>
              <View style={FormStyles.inputSideBySideInner}>
                <InputWithLabel
                  onRef={this.expiryYearRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={2}
                  numberOfLines={1}
                  placeholder="YY"
                  returnKeyType="done"
                  keyboardType="numeric"
                  label="Expiry Year"
                  value={expiryYear}
                  onChangeText={text => {
                    this.setState({ expiryYear: onlyNumbers(text) });
                    if (text.length === 2) {
                      this.nextKeyboardCvv();
                    }
                  }}
                />
              </View>
            </View>
            <InputWithLabel
              onRef={this.cvvRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={4}
              numberOfLines={1}
              returnKeyType="done"
              keyboardType="numeric"
              label="CVC"
              value={cvv}
              onChangeText={text => {
                this.setState({ cvv: onlyNumbers(text) });
              }}
              onSubmitEditing={this.onPressAddCard}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressAddCard}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.buttonText}>
                Add Card
              </AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  cardData: state.profile.cardData,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
