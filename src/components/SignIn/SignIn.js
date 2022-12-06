import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CustomHeaderBack,
  FormWrapper,
  Input,
  ButtonLoading,
  AppText,
  InputIcon
} from '@components/common';
//import MixpanelManager from '@utils/Analytics';
import { PubSubContext } from 'src/pubsub';
import analytics from '@react-native-firebase/analytics';
import { FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './SignIn.styles';

import UserApi from '@api/userApi';
import ChatApi from '@api/chatApi';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as PubNubActions from '@ducks/pubnub';
import * as SettingsActions from '@ducks/settings';
import * as AlertActions from '@ducks/alert';

const USER_TOKEN = '@usertoken';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: '',
      actionLoading: false
    };

    this.onSignInPress = this.onSignInPress.bind(this);
    this.nextKeyboardButtonPassword =
      this.nextKeyboardButtonPassword.bind(this);
    this.passwordInputRef = React.createRef();

    analytics().logScreenView({
      screen_name: 'sign_in',
      screen_class: 'sign_in'
    });

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  async onSignInPress() {
    const { pubsub } = this.context;
    const { navigation, actions, settings } = this.props;
    const { emailAddress, password, actionLoading } = this.state;

    if (actionLoading) {
      return;
    }

    if (emailAddress === '') {
      actions.setAlert('Please enter your email address.');
      return;
    }

    if (password === '') {
      actions.setAlert('Please enter your password.');
      return;
    }

    this.setState({ actionLoading: true });

    await UserApi.login({ email: emailAddress, password })
      .promise.then(async result => {
        const data = result.data;

        await AsyncStorage.setItem(USER_TOKEN, data.accessToken);

        let postAuthFlow = '';

        if (data.role === 'patient') {
          let creditCaregiversAvailable = data.creditCaregiversAvailable;
          let creditPersonCare = data.creditPersonCare;
          let creditMeals = data.creditMeals;
          let creditEquipment = data.creditEquipment;
          let creditTransportationAvailable =
            data.creditTransportationAvailable;
          if (data.creditExpired === 1) {
            creditCaregiversAvailable = 0;
            creditPersonCare = '0.00';
            creditMeals = '0.00';
            creditEquipment = '0.00';
            creditTransportationAvailable = 0;
          }

          actions.signIn({
            isUserSignedIn: true,
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.email,
            role: data.role,
            subRole: data.subRole,
            familyId: data.familyId,
            accountHolder: data.accountHolder,
            accessToken: data.accessToken,
            userCaregiverPrimary: data.userCaregiverPrimary,
            creditExpired: data.creditExpired,
            creditCaregiversAvailable: creditCaregiversAvailable,
            creditPersonCare: creditPersonCare,
            creditMeals: creditMeals,
            creditEquipment: creditEquipment,
            creditTransportationAvailable: creditTransportationAvailable
          });
          actions.updateMyFamilyPermissions({
            admin: data.admin,
            chats: data.chats,
            groupPurchases: data.groupPurchases,
            blocked: data.blocked
          });
          actions.setProfileOwner({
            street: data.street,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            phoneNumber: data.phoneNumber,
            additionalPhoneNumber: data.additionalPhoneNumber,
            alternateContactName: data.alternateContactName,
            alternateContactNumber: data.alternateContactNumber
          });
          actions.setProfilePatient({
            patientsFirstName: data.patientsFirstName,
            patientsLastName: data.patientsLastName,
            patientsPhoneNumber: data.patientsPhoneNumber,
            patientsAdditionalPhoneNumber: data.patientsAdditionalPhoneNumber,
            patientsStreet: data.patientsStreet,
            patientsCity: data.patientsCity,
            patientsProvince: data.patientsProvince,
            patientsPostalCode: data.patientsPostalCode
          });
          actions.setProfileNeeds({
            patientAge: data.patientAge,
            healthConditions: data.healthConditions,
            needs: data.needs
          });

          // Credit cards.
          actions.addCards(data.cards);

          actions.enablePushNotifications(
            Boolean(Number(data.pushNotifications))
          );
          actions.enableSmsNotifications(
            Boolean(Number(data.smsNotifications))
          );
          actions.enableEmailNotifications(
            Boolean(Number(data.emailNotifications))
          );

          postAuthFlow = 'PostAuthFlowPatient';
          actions.setPatientPhoto(data.profilePhoto);

          const pubnubId = `user.${data.userId}`;
          pubsub.setUUID(pubnubId);

          await ChatApi.getChats({ var: 'empty' })
            .promise.then(async result2 => {
              const chats = result2.data.chats;
              actions.addChats(chats);
              console.log('chats', chats);
              await pubsub.subscribeToChannels(chats, settings);
            })
            .catch(error => {
              console.log('getChats error', error);
            });
        } else {
          actions.signIn({
            isUserSignedIn: true,
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            emailAddress: data.email,
            postalCode: data.postalCode,
            travelDistance: data.travelDistance,
            role: data.role,
            subRole: data.subRole,
            accessToken: data.accessToken
          });
          if (data.subRole === 'personalCare') {
            postAuthFlow = 'PostAuthFlowPersonalCare';
          } else if (data.subRole === 'caregiver') {
            postAuthFlow = 'PostAuthFlowCaregiver';
          }
          actions.setCaregiverPhoto(data.profilePhoto);
        }

        this.setState({ actionLoading: false });

        analytics().setUserId(`${data.userId}`);
        analytics().setUserProperties({
          email: `${data.email}`,
          userId: `${data.userId}`,
          name: `${data.firstName} ${data.lastName}`
        });
        analytics().logEvent('login', { method: 'email' });

        //this.mixpanel.identify(`${data.userId}`);
       // this.mixpanel.flush();

        navigation.navigate(postAuthFlow);
      })
      .catch(error => {
        console.log('login error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressForgotPassword = () => {
    const { navigation } = this.props;

    navigation.navigate('ForgotPassword');
  };

  miniLoginButton(label, emailAddress, password) {
    return (
      <TouchableHighlight
        onPress={() => this.setState({ emailAddress, password })}
        underlayColor="transparent"
        activeOpacity={0.65}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      >
        <View style={styles.miniButton}>
          <Text style={styles.miniButtonText}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  nextKeyboardButtonPassword() {
    this.passwordInputRef.focus();
  }

  assignPasswordInputRef(input) {
    if (input) {
      this.passwordInputRef = input;
      input &&
        input.setNativeProps({ style: { fontFamily: 'SFProText-Regular' } });
    }
  }

  render() {
    const { emailAddress, password, actionLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack includeLogo onPressBack={this.onPressBack} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        >
          <FormWrapper>
            <View style={styles.welcomeContainer}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '700' : '600'}`}
                style={styles.textIntro}
              >
                Welcome back
              </AppText>
              <Image style={styles.iconHand} source={images.hand} />
            </View>

            <AppText
              textWeight={`${Platform.OS === 'ios' ? '400' : '300'}`}
              style={styles.textIntro2}
            >
              Please sign in to continue.
            </AppText>
            <Input
              containerStyle={FormStyles.inputContainer}
              style={FormStyles.inputStyle}
              autoFocus={false}
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              placeholder="Email Address"
              value={emailAddress}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onSubmitEditing={this.nextKeyboardButtonPassword}
              returnKeyType="next"
              onChangeText={text => this.setState({ emailAddress: text })}
            />

            <InputIcon
              containerStyle={FormStyles.inputContainer}
              onRef={input => this.assignPasswordInputRef(input)}
              onChangeText={text => this.setState({ password: text })}
              placeholder="Password"
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
              returnKeyType="done"
              onSubmitEditing={this.onSignInPress}
            />

            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onSignInPress}
                isLoading={actionLoading}
                containerStyle={styles.buttonSignIn}
              >
                <AppText
                  textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                  style={styles.buttonSignInText}
                >
                  Sign In
                </AppText>
              </ButtonLoading>
            </View>
            <TouchableHighlight
              onPress={this.onPressForgotPassword}
              underlayColor="transparent"
              hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}
            >
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '500' : '400'}`}
                style={styles.forgotPasswordText}
              >
                Forgot Password?
              </AppText>
            </TouchableHighlight>
          </FormWrapper>
          {global.__DEV__ ? (
            <View style={styles.miniButtonsContainer}>
{this.miniLoginButton('0', 'josh@joshwinter.com', 'asdfasdfA1')}
{this.miniLoginButton('1', 'veronicastevenson@mailinator.com', 'asdfasdfA1')}
{this.miniLoginButton('2', 'provider@joshwinter.com', 'asdfasdfA1!')}
{this.miniLoginButton('3', 'provider2@joshwinter.com', 'asdfasdfA1!')}
{this.miniLoginButton('4', 'joshrobertson@mailinator.com', 'asdfasdfA1')}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
  static contextType = PubSubContext;
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...PubNubActions,
      ...AlertActions,
      ...ProfileActions,
      ...SettingsActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  pubnub: state.pubnub,
  settings: state.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

/*
LOCAL DEV:
{this.miniLoginButton('0', 'josh@joshwinter.com', 'asdfasdfA1')}
{this.miniLoginButton('1', 'veronicastevenson@mailinator.com', 'asdfasdfA1')}
{this.miniLoginButton('2', 'provider@joshwinter.com', 'asdfasdfA1!')}
{this.miniLoginButton('3', 'provider2@joshwinter.com', 'asdfasdfA1!')}
{this.miniLoginButton('4', 'joshrobertson@mailinator.com', 'asdfasdfA1')}
                
PRODUCTION:
{this.miniLoginButton('0', 'josh@joshwinter.com', 'asdfasdf')}
{this.miniLoginButton('1', 'veronicawinter@mailinator.com', 'asdfasdf')}
{this.miniLoginButton('2', 'robertwinter@mailinator.com', 'asdfasdf')}
{this.miniLoginButton('3', 'joshstevenson@mailinator.com', 'asdfasdf')}
*/
