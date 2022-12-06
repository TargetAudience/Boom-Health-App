/* eslint react/prop-types: 0 */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBar from '@components/common/TabBar';
import CaregiverHome from '@components/CaregiverHome';
import CaregiverSettingsHome from '@components/CaregiverSettingsHome';
import CaregiverAlerts from '@components/CaregiverAlerts';
import CaregiverCalendar from '@components/CaregiverCalendar';

import MessagingStack from './MessagingStack';

export default createBottomTabNavigator(
  {
    Alerts: {
      screen: CaregiverAlerts
    },
    Messaging: {
      screen: MessagingStack
    },
    Home: {
      screen: CaregiverHome
    },
    Calendar: {
      screen: CaregiverCalendar
    },
    Settings: {
      screen: CaregiverSettingsHome
    }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    headerMode: 'none',
    mode: 'modal',
    header: null,
    backBehavior: 'none',
    gesturesEnabled: false,
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: false,
    tabBarComponent: props => <TabBar {...props} />
  }
);
