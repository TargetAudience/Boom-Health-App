import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PersonTopSection, CustomHeaderBack, FormWrapper, Input, AppButton, HelpModal, ButtonLoading } from '@components/common';
import { PubSubContext } from 'src/pubsub';
import { Colors } from '@constants/GlobalStyles';
import styles from './CaregiverSignin.styles';
import { ROOM_PREFIX } from '@utils/ChatManager';
import UserApi from '@api/userApi';

import * as AuthActions from '@ducks/auth';
import * as PubNubActions from '@ducks/pubnub';
import * as AlertActions from '@ducks/alert';

const USER_TOKEN = '@usertoken';

class CaregiverSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: '',
      isHelpModalOpen: false
    };

    this.onSignInPress = this.onSignInPress.bind(this);
    this.nextKeyboardButtonPassword = this.nextKeyboardButtonPassword.bind(this);
    this.passwordInputRef = React.createRef();
  }

  componentDidMount() {
    console.debug('this.context', this.context)
  }

  async onSignInPress() {
    const { pubsub } = this.context;
    const { navigation, actions } = this.props;
    const { emailAddress, password } = this.state;

/*
    var user = CAREGIVER_SIGNIN_DATA.find(obj => {
      return obj.userId === Number(emailAddress)
    });
*/

    this.setState({ actionLoading: true });

    await UserApi.login({ email: emailAddress, password }).promise.then(async (result) => {
      await AsyncStorage.setItem(USER_TOKEN, result.data.accessToken);
      
      const data = result.data;

      actions.signIn({ isUserSignedIn: true, userId: data.userId, firstName: data.firstName, lastName: data.lastName, email: data.email });
      actions.setRole(data.role);
      actions.setCaregiverPhoto(data.profilePhoto);

      const pubnubId = `${ROOM_PREFIX}.user.${data.role}_${data.userId}`;
      pubsub.setUUID(pubnubId);

      try {
        const channels = await pubsub.initSubscribe(data);
        if (channels.foundChannels) {
          try {
            const lastMessages = await pubsub.lastMessages(channels.channels);
            if (lastMessages.foundMessages) {
              actions.setLastMessages(lastMessages.messages);
            } else {
              actions.clearLastMessages();
            }
          } catch (error) {
            console.debug('error', error);
          }
        }
      } catch (error) {
        console.debug('error', error);
      }

      try {
        const chats = await pubsub.getChats(data);
        console.debug('onSignInPress chats found ---->', chats);
        if (chats.foundChats) {
          actions.addChats(chats.chats);
        } else {
          actions.clearChat();
        }
      } catch (error) {
        console.debug('error', error);
      }

      try {
        const hereNow = await pubsub.getHereNow(data);
        if (hereNow.foundChannels) {
          for (let [key, value] of Object.entries(hereNow.hereNow)) {
            if (value.occupants.length) {
              for (var occupant of value.occupants) {
                actions.addToHereNow(occupant.uuid);
              }
            }
          }
        } else {
          actions.clearHereNow();
        }
      } catch (error) {
        console.debug('error', error);
      }

      this.setState({ actionLoading: false });
      navigation.navigate('PostAuthFlowCaregiver'); 
    }).catch(error => {
      console.log('login error', error)
      this.setState({ actionLoading: false });
      actions.setAlert(error.data.statusText);
    });
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressForgotPassword = () => {
    const { navigation } = this.props;

    navigation.navigate('ForgotPassword');
  };
  
  onPressHelp = () => {
    const { navigation } = this.props;

    this.setState({
      isHelpModalOpen: true
    });
  };

  onPressCancel = () => {
    this.setState({
      isHelpModalOpen: false
    });
  };

  nextKeyboardButtonPassword() {
    this.passwordInputRef.current.focus();
  }

  render() {
    const { emailAddress, password, isHelpModalOpen, actionLoading } = this.state;

    const buttonEnabled = emailAddress && password;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Sign In as Caregiver" onPressBack={this.onPressBack} onPressHelp={this.onPressHelp} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}>
          <Text style={styles.textIntro}>Please sign in with your provided{'\n'}Caregiver login information.</Text>
          <FormWrapper>
            <Input
              containerStyle={styles.containerStyle}
              style={styles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              placeholder="Email Address"
              value={emailAddress}
              onSubmitEditing={this.nextKeyboardButtonPassword}
              returnKeyType="next"
              onChangeText={text => this.setState({ emailAddress: text })}
            />
            <Input
              onRef={this.passwordInputRef}
              containerStyle={styles.containerStyle}
              style={styles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={36}
              numberOfLines={1}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={text => this.setState({ password: text })}
              onSubmitEditing={this.onSignInPress}
            />
            <View style={styles.buttonContainer}>
              {buttonEnabled ? (
                <ButtonLoading
                  onPress={this.onSignInPress}
                  isLoading={actionLoading}
                  containerStyle={styles.buttonSignIn}>
                  <Text style={styles.buttonSignInText}>Sign In</Text>
                </ButtonLoading>
              ) : (
                <ButtonLoading
                  isLoading={false}
                  containerStyle={styles.buttonSignInDisabled}>
                  <Text style={styles.buttonSignInTextDisabled}>Sign In</Text>
                </ButtonLoading>
              )}
            </View>
            <TouchableHighlight
              onPress={this.onPressForgotPassword}
              underlayColor="transparent"
              hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableHighlight>
          </FormWrapper>
        </ScrollView>
        <HelpModal
          onPressCancel={this.onPressCancel}
          isModalOpen={isHelpModalOpen}
          helpText="You'll only need to sign in one time. If you have lost your password, please use the Forgot Password link or contact support."
        />
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
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  pubnub: state.pubnub
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverSignIn);

