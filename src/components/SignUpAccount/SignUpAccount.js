import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from '../../../src/@crazycodeboy/react-native-check-box';
import analytics from '@react-native-firebase/analytics';
import { PubSubContext } from 'src/pubsub';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText,
  InputIcon
} from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import { validateEmail, validateInputLetters } from '@utils/Globals';
import { ROOM_PREFIX } from '@utils/ChatManager';
import styles from './SignUpAccount.styles';

import UserApi from '@api/userApi';
import ChatApi from '@api/chatApi';

import * as ProfileActions from '@ducks/profile';
import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as PubNubActions from '@ducks/pubnub';

const USER_TOKEN = '@usertoken';

class SignUpAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      emailAddress1: `josh@${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}123.com`,
      password: '',
      confirmPassword: '',
      actionLoading: false,
      flowType: this.props.navigation.getParam('flowType', ''),
      termsChecked: false
    };

    this.stateSave = {
      firstName: 'Josh',
      lastName: 'Winter',
      emailAddress1: '',
      emailAddress: `josh@${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}.com`,
      password: 'asdfasdfA1!',
      confirmPassword: 'asdfasdfA1!',
      actionLoading: false,
      flowType: this.props.navigation.getParam('flowType', ''),
      termsChecked: false
    };

    this.onPressSignUp = this.onPressSignUp.bind(this);
    this.nextKeyboardLastName = this.nextKeyboardLastName.bind(this);
    this.nextKeyboardEmailAddress = this.nextKeyboardEmailAddress.bind(this);
    this.nextKeyboardPassword = this.nextKeyboardPassword.bind(this);
    this.nextKeyboardConfirmPassword = this.nextKeyboardConfirmPassword.bind(
      this
    );

    this.lastNameInputRef = React.createRef();
    this.emailAddressInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.confirmPasswordInputRef = React.createRef();
  }

  async onPressSignUp() {
    const { pubsub } = this.context;
    const { navigation, actions, settings } = this.props;
    const {
      flowType,
      firstName,
      lastName,
      emailAddress,
      password,
      termsChecked,
      actionLoading
    } = this.state;

    if (actionLoading) {
      return;
    }

    if (termsChecked === false) {
      actions.setAlert(
        'Please be sure to read and agree to the terms and conditions.'
      );
      return;
    }

    if (firstName === '') {
      actions.setAlert('Please enter your first name.');
      return;
    } else if (firstName.length < 2) {
      actions.setAlert('Be sure your first name is at least 2 characters.');
      return;
    } else if (validateInputLetters(firstName)) {
      actions.setAlert('First name can only contain letters and dashes.');
      return;
    }

    if (lastName === '') {
      actions.setAlert('Please enter your last name.');
      return;
    } else if (lastName.length < 2) {
      actions.setAlert('Be sure your last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(lastName)) {
      actions.setAlert('Last name can only contain letters and dashes.');
      return;
    }

    if (emailAddress === '') {
      actions.setAlert('Please enter your e-mail address.');
      return;
    } else if (!validateEmail(emailAddress)) {
      actions.setAlert('Be sure to enter a valid e-mail address.');
      return;
    }

    if (password === '') {
      actions.setAlert('Please enter a password.');
      return;
    } else if (password.length < 6) {
      actions.setAlert('Be sure your password is at least 6 characters.');
      return;
    }

    this.setState({ actionLoading: true });

    const role = 'patient';
    const subRole = flowType === 'LovedOne' ? 'lovedOne' : 'myself';
    const random = Math.random().toString().slice(2,12);
    const roomName = `${ROOM_PREFIX}.room${random}`;

    await UserApi.register({
      firstName,
      lastName,
      emailAddress,
      password,
      role,
      subRole,
      roomName
    })
      .promise.then(async result => {
        const data = result.data;
        await AsyncStorage.setItem(USER_TOKEN, data.accessToken);

        actions.signIn({
          isUserSignedIn: true,
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          role: data.role,
          subRole: data.subRole,
          familyId: data.familyId,
          accountHolder: 1,
          creditCaregiversAvailable: data.creditCaregiversAvailable,
          creditPersonCare: data.creditPersonCare,
          creditMeals: data.creditMeals,
          creditEquipment: data.creditEquipment,
          creditTransportationAvailable: data.creditTransportationAvailable,
          accessToken: data.accessToken
        });
        if (subRole !== 'myself') {
          actions.updateMyFamilyPermissions({
            admin: 1,
            chats: 1,
            groupPurchases: 1
          });
        }

        const pubnubId = `user.${data.userId}`;
        pubsub.setUUID(pubnubId);

        await ChatApi.getChats({ var: 'empty' })
          .promise.then(async result2 => {
            const chats = result2.data.chats;
            actions.addChats(chats);
            await pubsub.subscribeToChannels(chats, settings);
          })
        .catch(error => {
          console.log('getChats error', error);
        });

        analytics().setUserId(`${data.userId}`);
        analytics().setUserProperties({ email: `${data.email}`, userId: `${data.userId}`, name: `${data.firstName} ${data.lastName}` });
        analytics().logEvent('sign_up', { method: 'email' });

        this.setState({ actionLoading: false });
        navigation.navigate('SignUpPostalCodeLookup', { flowType });
      })
      .catch(error => {
        console.log('SignUpAccount error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressLaunchTerms = () => {
    const { navigation } = this.props;

    navigation.navigate('LaunchWebView', {
      title: '',
      link: 'https://boom.health/registration/terms'
    });
  };

  toggleTerms = () => {
    const { termsChecked } = this.state;

    this.setState({ termsChecked: !termsChecked });
  };

  nextKeyboardLastName() {
    this.lastNameInputRef.current.focus();
  }

  nextKeyboardEmailAddress() {
    this.emailAddressInputRef.current.focus();
  }

  nextKeyboardPassword() {
    this.passwordInputRef.current.focus();
  }

  nextKeyboardConfirmPassword() {
    this.confirmPasswordInputRef.current.focus();
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      termsChecked,
      actionLoading
    } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title="Sign Up" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="First Name"
              value={firstName}
              onSubmitEditing={this.nextKeyboardLastName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <InputWithLabel
              onRef={this.lastNameInputRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="Last Name"
              value={lastName}
              onChangeText={text => this.setState({ lastName: text })}
              onSubmitEditing={this.nextKeyboardEmailAddress}
            />
            <InputWithLabel
              onRef={this.emailAddressInputRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              keyboardType="email-address"
              label="Email Address"
              value={emailAddress}
              onChangeText={text => this.setState({ emailAddress: text.trim() })}
              onSubmitEditing={this.nextKeyboardPassword}
            />

            <AppText textWeight="500" style={styles.labelStyle}>Password</AppText>
            <InputIcon
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              onRef={this.passwordInputRef}
              onChangeText={text => this.setState({ password: text })}
              placeholder=""
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              value={password}
              maxLength={36}
              numberOfLines={1}
              keyboardType="default"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={()=> Keyboard.dismiss()}
            />

            <TouchableOpacity
              onPress={this.onPressLaunchTerms}
              activeOpacity={0.8}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.textTerms}>
                Do you agree to our{' '}
                <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.textTermsUnderline}>
                  terms and conditions?
                </AppText>
              </AppText>
            </TouchableOpacity>
            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleTerms}
              isChecked={termsChecked}
              rightText="I Agree"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressSignUp}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Sign Up</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
  static contextType = PubSubContext;
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AuthActions,
      ...AlertActions,
      ...PubNubActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpAccount);
