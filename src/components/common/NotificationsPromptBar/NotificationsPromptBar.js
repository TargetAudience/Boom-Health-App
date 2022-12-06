import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { GenericModal, AppText } from '@components/common';
import images from '@assets/images';
import { PubSubContext } from 'src/pubsub';
import styles from './NotificationsPromptBar.styles';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as SettingsActions from '@ducks/settings';

import ProfileApi from '@api/profileApi';

class NotificationsPromptBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pushNotifications: props.settings.enablePushNotifications,
      emailChecked: props.settings.enableEmailNotifications,
      smsChecked: props.settings.enableSmsNotifications,
      actionLoading: false,
      isHelpModalOpen: false,
      isInstructionsModalOpen: false
    };

    this.onPressPushNotifications = this.onPressPushNotifications.bind(this);
  }

  onPressCancel = () => {
    this.setState({ isHelpModalOpen: false, isInstructionsModalOpen: false });
  };

  async sendPushToken(pushToken, playerId, notificationsEnabled) {
    const { actions } = this.props;
    const { pushNotifications } = this.state;

    this.setState({ actionLoading: true });

    await ProfileApi.updatePushToken({
      pushNotifications,
      pushToken,
      playerId
    })
      .promise.then(async result => {
        const data = result.data;
        console.log('data', data);
      })
      .catch(error => {
        console.log('sendPushToken error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  onPressOpenSettings = () => {
    this.onPressCancel();
    if (Platform.OS == 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings://starWarsEncyclopedia');
    }
  }

  onPressOpenAppleAllowModal = () => {
    this.onPressCancel();
    this.requestNotifications();
  }

  async onPressPushNotifications(isChecked) {
    const { pubsub } = this.context;
    const { pushNotifications } = this.state;
    const { actions, settings, pubnub } = this.props;

    if (isChecked) {
      const enabled = await this.checkNotificationPermission();
      if (enabled) {
        this.setPushToken();
      } else {
        // Open popup for settings.
        actions.enablePushNotifications(false);
        this.setState({ isHelpModalOpen: true, pushNotifications: false });
      }
    } else {
      actions.setAlert('Push notifications disabled.');
      pubsub.removePushChannels(pubnub.channels, settings.userPushCredential);
      actions.addUserPushCredential(null);
      actions.enablePushNotifications(false);
      this.setState({ pushNotifications: !pushNotifications }, () => {
        this.disablePushNotifications();
      });
    }
  }

  async setPushToken() {
    const { pubsub } = this.context;
    const { actions, pubnub } = this.props;

    let apnsTokenPubNub;
    if (Platform.OS === 'ios') {
      apnsTokenPubNub = await messaging().getAPNSToken();
    }

    let fcmToken = await messaging().getToken();
    console.log('fcmToken', fcmToken);

    const playerId = fcmToken;
    const pushToken = fcmToken;
    const pubnubPushToken = Platform.OS === 'ios' ? apnsTokenPubNub : fcmToken;

    if (fcmToken || apnsTokenPubNub) {
      this.setState({ pushNotifications: true });
      actions.enablePushNotifications(true);
      actions.addUserPushCredential(fcmToken);
      actions.setAlert('Push notifications enabled.');
      this.sendPushToken(pushToken, playerId, true);
      pubsub.addPushChannels(pubnub.channels, pubnubPushToken);
    } else {
      this.setState({ pushNotifications: false });
      actions.addUserPushCredential(null);
    }
  }

  async checkNotificationPermission() {
    const permissionStatus = await messaging().hasPermission();
    let result = false;
    if (permissionStatus === firebase.messaging.AuthorizationStatus.NOT_DETERMINED) {
      try {
        const newStatus = await messaging().requestPermission({
          sound: true,
          alert: true,
          badge: true
        });
        switch (newStatus) {
          case firebase.messaging.AuthorizationStatus.DENIED:
            result = false;
            this.setState({ isInstructionsModalOpen: true });
            break;
          case firebase.messaging.AuthorizationStatus.AUTHORIZED:
            result = true;
            break;
          case firebase.messaging.AuthorizationStatus.PROVISIONAL:
            result = true;
            break;
          default:
            break;
        }
      } catch (error) {
        result = false;
      }
    } else if (permissionStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
      result = true;
    }
    return result;
  }

  render() {
    const { settings } = this.props;
    const {
      isHelpModalOpen,
      isInstructionsModalOpen
    } = this.state;

    if (settings.enablePushNotifications) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Image style={styles.bell} source={images.bell} resizeMode="cover" />
          <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textNotifications}>Notifications turned off.</AppText>
          <TouchableOpacity activeOpacity={0.8} onPress={this.onPressPushNotifications} style={styles.underlineContainer}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textNotificationsUnderline}>Turn on</AppText>
          </TouchableOpacity>
        </View>
        <GenericModal
          onPressOne={this.onPressCancel}
          onPressTwo={this.onPressOpenSettings}
          buttonOneLabel="Cancel"
          buttonTwoLabel="Go to Settings"
          isModalOpen={isHelpModalOpen}
          titleText="Enable Push Notifications"
          modalHeight={254}
          scrollHeight={110}
          helpText="To enable Push Notifications, please exit the App and open Settings on your device. You can get there by tapping the Go to Settings button below. Next, navigate to Notifications, then select Allow Notifications."
        />
        <GenericModal
          onPressOne={this.onPressCancel}
          onPressTwo={this.onPressOpenAppleAllowModal}
          buttonOneLabel="Cancel"
          buttonTwoLabel="Continue"
          isModalOpen={isInstructionsModalOpen}
          titleText="Important"
          modalHeight={400}
          scrollHeight={90}
          bottomImage={images.allowDialog}
          bottomImageStyle={styles.bottomImageStyle}
          helpText="To use the family communication and management tools, you must select Allow on the following screen."
        />
      </View>
    );
  }
  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  pubnub: state.pubnub
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...SettingsActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPromptBar);
