import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
//import MixpanelManager from '@utils/Analytics';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cardValidator from 'card-validator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import creditCardType from 'credit-card-type';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  CreditCardInput,
  CreditCardIcon,
  AppButton,
  AppText,
  ScreenWrapper,
} from '@components/common';
import images from '@assets/images';
import {
  pluralize,
  onlyNumbers,
  prettyCardNumber,
  extractCardType,
  uuidv4,
} from '@utils/Globals';
import {Colors, FormStyles} from '@constants/GlobalStyles';
import styles from './PaymentInfo.styles';
import CryptoES from 'crypto-es';
import {genRanHex} from '@utils/Globals';

import * as ProfileActions from '@ducks/profile';
import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class PaymentInfo extends Component {
  constructor(props) {
    super(props);

    const {cardData} = this.props;

    this.state = {
      cardType: '',
      cvv: '',
      expiryMonth: '',
      expiryYear: '',
      cardNumber: '',
      nameOnCard: '',
      actionLoading: false,
      showNewCardForm: !cardData.length,
      selectedCard: this.getDefaultCard(),
    };

    this.stateSave = {
      cardType: '',
      cvv: '1234',
      expiryMonth: '12',
      expiryYear: '24',
      cardNumber: '4242424242424242',
      nameOnCard: 'Josh Winter',
      actionLoading: false,
      showNewCardForm: !cardData.length,
      selectedCard: this.getDefaultCard(),
    };

    this.onPressAddCard = this.onPressAddCard.bind(this);
    this.onPressRemoveCard = this.onPressRemoveCard.bind(this);
    this.onPressMakeDefault = this.onPressMakeDefault.bind(this);

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
    this.loadData();

    //this.mixpanel.track('View Settings Payment Information');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressToggleAddCard = () => {
    this.setState(prevState => ({
      showNewCardForm: !prevState.showNewCardForm,
    }));
  };

  onCardPress = cardUuid => {
    const {selectedCard} = this.state;

    if (cardUuid !== selectedCard) {
      this.setState({
        selectedCard: cardUuid,
      });
    }
  };

  async onPressMakeDefault() {
    const {actions} = this.props;
    const {selectedCard} = this.state;

    if (selectedCard !== undefined) {
      actions.setAlert('This credit card has been set as the default card.');

      await ProfileApi.defaultCard({cardUuid: selectedCard})
        .promise.then(async result => {
          actions.setDefaultCard(selectedCard);
        })
        .catch(error => {
          console.log('Payment info error', error);
          actions.setAlert(error.data.statusText);
        });
    }
  }

  async onPressRemoveCard() {
    const {actions, cardData} = this.props;
    const {selectedCard} = this.state;

    const showNewCardForm = cardData.length === 1 ? true : false;

    await ProfileApi.removeCard({cardUuid: selectedCard})
      .promise.then(async result => {
        actions.removeCard(selectedCard);
        actions.setAlert('The credit card has been removed.');
        this.setState({showNewCardForm, selectedCard: this.getDefaultCard()});
      })
      .catch(error => {
        console.log('removeCard error', error);
        actions.setAlert(error.data.statusText);
      });
  }

  async onPressAddCard() {
    const {actionLoading} = this.state;

    if (actionLoading) {
      return;
    }

    const {actions, cardData, profile} = this.props;
    const {cardType, cvv, expiryMonth, expiryYear, cardNumber, nameOnCard} =
      this.state;

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

    this.setState({actionLoading: true});

    const cardUuid = uuidv4();
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
      isDefault,
    };
    const ciphertext = CryptoES.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
    }).toString();

    await ProfileApi.addCard({
      encrypted: ciphertext,
      iv: generateIV,
    })
      .promise.then(async () => {
        this.loadData();
        this.setState({actionLoading: false});
        this.onPressToggleAddCard();
        actions.setAlert('Your credit card has been added.');
      })
      .catch(error => {
        console.log('Payment info error', error);
        this.setState({actionLoading: false});
        actions.setAlert(error.data.statusText, 'longDuration');
      });
  }

  loadData() {
    const {actions} = this.props;

    ProfileApi.getCards()
      .promise.then(result => {
        const data = result.data.cards;
        actions.addCards(data);
        this.setState({
          selectedCard: this.getDefaultCard(),
          showNewCardForm: !data.length,
        });
      })
      .catch(error => {
        console.log('error getCards', error);
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

  getDefaultCard() {
    const {cardData} = this.props;

    if (cardData.length) {
      const defaultCard = cardData.find(card => card.isDefault);
      if (defaultCard) {
        return defaultCard.cardUuid;
      }
    }
  }

  renderCards() {
    const {cardData} = this.props;

    const cardList = [];

    {cardData.forEach(card => {
      cardList.push(this.renderCard(card))
    })};

    const cardWord = pluralize(cardList.length, 'Card', false);

    return (
      <>
        <AppText
          textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
          style={styles.textYourCreditCard}>
          Saved {cardWord}
        </AppText>
        <View style={styles.invitesWrap}>{cardList}</View>
        <FormWrapper style={styles.buttonContainer2}>
          <AppButton
            onPress={this.onPressRemoveCard}
            width={116}
            height={30}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.buttonText}>
              Remove
            </AppText>
          </AppButton>
        </FormWrapper>
        {cardList.length === 0 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onPressToggleAddCard}>
            <View style={styles.addCardContainer}>
              <Image style={styles.plusIcon} source={images.plus} />
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.addCardText}>
                Add New Card
              </AppText>
            </View>
          </TouchableOpacity>
        ) : null}
      </>
    );
  }

  renderCard(item) {
    const {selectedCard} = this.state;

    let cardLabel = '';

    switch (item.cardType) {
      case 'american-express':
        cardLabel = 'Amex';
        break;
      case 'discover':
        cardLabel = 'Discover';
        break;
      case 'mastercard':
        cardLabel = 'Mastercard';
        break;
      case 'visa':
        cardLabel = 'Visa';
        break;
      default:
        cardLabel = '';
    }

    return (
      <View key={item.cardUuid} style={styles.invitesContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.onCardPress(item.cardUuid)}
          style={styles.invitesInner}>
          <View style={styles.cardTypeContainer}>
            <View style={styles.cardTypeWrap}>
              <CreditCardIcon icon={item.cardType} />
              <AppText textWeight="500" style={styles.textCardText}>
                {cardLabel} ending in {item.last4}
              </AppText>
            </View>
            <AppText textWeight="500" style={styles.textCardText}>
              Expires: {item.expiryMonth}/{item.expiryYear}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {cardData} = this.props;
    const {
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard,
      actionLoading,
      showNewCardForm,
    } = this.state;

    const showSavedCards = cardData.length ? true : false;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Payment Information"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}>
          {showSavedCards ? this.renderCards() : null}
          {showNewCardForm ? (
            <FormWrapper style={styles.topGap}>
              <InputWithLabel
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
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
                onChangeText={text => this.setState({nameOnCard: text})}
                onSubmitEditing={this.nextKeyboardCardNumber}
              />
              <CreditCardInput
                onRef={this.cardNumberRef}
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                ]}
                style={FormStyles.inputStyle}
                number={cardNumber}
                type={cardType}
                returnKeyType="done"
                onSubmitEditing={this.nextKeyboardExpiryMonth}
                onChangeText={text => {
                  const cleanText = onlyNumbers(text);
                  let ccType = '';
                  if (text) {
                    ccType = extractCardType(creditCardType(cleanText));
                  }
                  this.setState({
                    cardNumber: prettyCardNumber(cleanText, ccType),
                    cardType: ccType,
                  });
                }}
              />
              <View style={FormStyles.inputSideBySide}>
                <View
                  style={[
                    FormStyles.inputSideBySideInner,
                    FormStyles.sideBySideFirst,
                  ]}>
                  <InputWithLabel
                    onRef={this.expiryMonthRef}
                    containerStyle={[
                      FormStyles.inputContainer,
                      FormStyles.inputContainerLabel,
                    ]}
                    style={FormStyles.inputStyle}
                    autoCorrect={false}
                    autoFocus={false}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    maxLength={2}
                    numberOfLines={1}
                    placeholder="MM"
                    returnKeyType="next"
                    keyboardType="numeric"
                    label="Expiry Month"
                    value={expiryMonth}
                    onChangeText={text => {
                      this.setState({expiryMonth: onlyNumbers(text)});
                      if (text.length === 2) {
                        this.nextKeyboardExpiryYear();
                      }
                    }}
                  />
                </View>
                <View style={FormStyles.inputSideBySideInner}>
                  <InputWithLabel
                    onRef={this.expiryYearRef}
                    containerStyle={[
                      FormStyles.inputContainer,
                      FormStyles.inputContainerLabel,
                    ]}
                    style={FormStyles.inputStyle}
                    autoCorrect={false}
                    autoFocus={false}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    maxLength={2}
                    numberOfLines={1}
                    placeholder="YY"
                    returnKeyType="next"
                    keyboardType="numeric"
                    label="Expiry Year"
                    value={expiryYear}
                    onChangeText={text => {
                      this.setState({expiryYear: onlyNumbers(text)});
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
                  FormStyles.inputContainerLabel,
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
                  this.setState({cvv: onlyNumbers(text)});
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
                    style={FormStyles.buttonText}>
                    Add Card
                  </AppText>
                </ButtonLoading>
              </View>
            </FormWrapper>
          ) : null}
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  cardData: state.profile.cardData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
