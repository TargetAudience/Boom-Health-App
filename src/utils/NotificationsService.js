import { Component } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidColor, AndroidVisibility } from '@notifee/react-native';

class NotificationsService extends Component {
  constructor(props) {
    super(props);

    messaging().onNotificationOpenedApp(remoteMessage => {
      this.onNotificationOpenedAppEvent();
    });

    messaging().setBackgroundMessageHandler(() => Promise.resolve());

    /*messaging().setBackgroundMessageHandler(remoteMessage => {
      console.log('setBackgroundMessageHandler remoteMessage:', remoteMessage);
      this.onMessageReceived(remoteMessage);
    });*/
  }

  async componentDidMount() {
    this.unsubscribeForegroundMessageListener = await this.startListeningForegroundMessage();
  }

  componentWillUnmount() {
    if (this.unsubscribeForegroundMessageListener !== undefined) {
      this.unsubscribeForegroundMessageListener();
    }
  }

  async startListeningForegroundMessage() {
    return messaging().onMessage(response => {
      console.log('Notification onMessage:', response);
      this.onMessageReceived(response);
    });
  }

  onNotificationOpenedAppEvent = async () => {
    notifee.cancelAllNotifications();
    notifee.setBadgeCount(0);
  };

  onMessageReceived = async payload => {
    const { data } = payload;

    if (Platform.OS === 'android') {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        vibrationPattern: [300, 500],
        lights: true,
        sound: 'default',
        lightColor: AndroidColor.RED,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC
      });

      await notifee.displayNotification({
        title: data.title,
        body: data.alert,
        android: {
          channelId,
          asForegroundService: false,
          sound: 'default',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            vibration: true,
            showTimestamp: true,
            smallIcon: 'ic_notification',
            vibrationPattern: [300, 500],
            importance: AndroidImportance.HIGH,
            lights: [AndroidColor.RED, 300, 600],
            visibility: AndroidVisibility.PUBLIC
          }
        }
      });
    } else {
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        ios: {
          critical: true, // Plays sound.
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true
          }
        }
      });
    }
  };

  render() {
    return null;
  }
}

export default NotificationsService;
