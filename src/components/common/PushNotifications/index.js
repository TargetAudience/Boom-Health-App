import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
//import OneSignal from 'react-native-onesignal';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';

import styles from './index.styles';

class PushNotifications extends Component {
  constructor(props) {
    super(props);

  /*  OneSignal.setLogLevel(6, 0);
    OneSignal.init('ab0838b0-7822-4eb4-8b0c-ff8a0d8d3a37', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2
    });
    OneSignal.inFocusDisplaying(2);*/
  }

  async componentDidMount() {
    //await this.register();

/*
    PushNotificationIOS.getInitialNotification().then(notification => {
      console.log('initial notification');
      console.log(notification);
      if (notification !== null) {
        console.log('initial notification not null');
        console.log(notification);
        //this.launchedFromNotification(notification);
      }
    });

    PushNotificationIOS.addEventListener('notification', function(
      notification
    ) {
      console.debug(
        'notification! got new APN push event',
        notification
      );
    });*/
  }

  launchedFromNotification(notification) {
   //  const { launchDeeplinkFromPush, launchExternalLinkFromPush } = this.props;
 //   console.log("Launched from notification");
 //   console.log(notification);
  }

  register = async () => {
 //   OneSignal.addEventListener('received', this.onReceived);
 //   OneSignal.addEventListener('opened', this.onOpened);
 //   OneSignal.addEventListener('ids', this.onIds);
  };

  unregister = () => {
 //   OneSignal.removeEventListener('received', this.onReceived);
 //   OneSignal.removeEventListener('opened', this.onOpened);
 //   OneSignal.removeEventListener('ids', this.onIds);
  };

  onReceived = notification => {
//    console.log('***NOTIFICATION RECEIVED: ', notification);
  };

  onOpened = async openResult => {
    //const { navigation } = this.props;
    //const { notification } = openResult;

//    console.log('***NOTIFICATION onOpened: ');
    /*
    try {
      const { data } = await ChatsApi.loadMessages().promise;

      const item = data.data.messages.find(chat => chat.message === notification.payload.additionalData.data);

      // TODO: Toast Notification
      if (item) {
        navigation.navigate('MessagesDetail', { item, autoFocus: false });
      } else {
        navigation.navigate('Messages');
      }
    } catch (error) {
      console.error('onOpened load chats error: ', error);
    }*/
  };

  onIds = device => {
 //   console.log('***NOTIFICATION IDS – DEVICE: ', device);
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(PushNotifications);
