/* eslint react/prop-types: 0 */
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import images from '../../assets/images';
import TabBar from '@components/common/TabBar';
import CaregiverMyAvailability from '@components/CaregiverMyAvailability';
import CaregiverMyAvailabilityCalendar from '@components/CaregiverMyAvailabilityCalendar';
import CaregiverMyServices from '@components/CaregiverMyServices';
import CaregiverPersonalCareHome from '@components/CaregiverPersonalCareHome';
import CaregiverMyCalendar from '@components/CaregiverMyCalendar';
import CaregiverCalendarDetails from '@components/CaregiverCalendarDetails';
import CaregiverMyServiceRange from '@components/CaregiverMyServiceRange';

import {
  ChangePassword,
  ChangeEmail,
  SettingsPersonalCare,
  Account,
  MyProfile,
  PatientInformation,
  PatientNeeds,
  PaymentInfo,
  FamilyMembers,
  Notifications,
  Invite,
  ContactUs
} from '@components/PatientSettings';

const tabData = [
  {
    name: 'CaregiverPersonalCareHome',
    route: 'Home',
    icon: images.bottomNavHomeActive,
    iconInactive: images.bottomNavHomeInactive,
    size: hp(3.4),
    badgeAdjust: 0
  },
  {
    name: 'Settings',
    route: 'SettingsPersonalCare',
    icon: images.bottomNavSettingsActive,
    iconInactive: images.bottomNavSettingsInactive,
    size: hp(3.2),
    badgeAdjust: 0
  }
];

const PatientAlertsStack2 = createSwitchNavigator(
  {
    CaregiverMyAvailability,
    CaregiverMyAvailabilityCalendar
  },
  {
    headerMode: 'none'
  }
);

const CaregiverPersonalCareHomeStack = createStackNavigator(
  {
    CaregiverPersonalCareHome,
    CaregiverMyAvailability: {
      screen: PatientAlertsStack2
    },
    CaregiverMyServices,
    CaregiverMyCalendar,
    CaregiverCalendarDetails,
    CaregiverMyServiceRange
  },
  { headerMode: 'none' }
);

CaregiverPersonalCareHomeStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'CaregiverPersonalCareHome') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const SettingsChangeStack = createStackNavigator(
  {
    SettingsPersonalCare,
    Account,
    ChangePassword,
    ChangeEmail,
    MyProfile,
    PatientInformation,
    PatientNeeds,
    PaymentInfo,
    FamilyMembers,
    Notifications,
    Invite,
    ContactUs
  },
  { headerMode: 'none' }
);

SettingsChangeStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'SettingsPersonalCare') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    Home: {
      screen: CaregiverPersonalCareHomeStack
    },
    Settings: {
      screen: SettingsChangeStack
    }
  },
  {
    shifting: false,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    headerMode: 'none',
    mode: 'card',
    header: null,
    backBehavior: 'none',
    gesturesEnabled: false,
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: false,
    tabBarComponent: props => (
      <TabBar {...props} tabData={tabData} />
    ),
  }
);

