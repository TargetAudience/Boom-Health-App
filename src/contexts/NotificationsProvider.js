import React, { Component } from 'react';
import { Platform } from 'react-native';
import messaging from 'react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidColor, AndroidVisibility } from '@notifee/react-native';

class NotificationsProvider extends Component {
  constructor(props) {
    super(props);
    const unsubscribeOpened = messaging().onNotificationOpenedApp(onNotificationOpenedAppEvent);
  }

  componentDidUnMount() {
    unsubscribeOpened();
  }

  onNotificationOpenedAppEvent = async () => {
    notifee.cancelAlINotifications();
    notifee.setBadgeCount(0);
  };

  onMessageReceived = async payload => {
    const { notification } = payload;
    if (Platform.OS === 'android') {
      notifee.cancelAlliNotifications();
      notifee.setBadgeCount(0);
    }

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.RED,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC
    });

    await notifee.displayNotification({
      title: notification.title,
      subtitle: notification.body,
      body: notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          sound: 'default',
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
  };
}

export default NotificationsProvider;