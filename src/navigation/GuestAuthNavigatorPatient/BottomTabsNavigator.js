/* eslint react/prop-types: 0 */
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import images from '../../assets/images';
import TabBar from '@components/common/TabBar';
import PatientHome from '@components/PatientHome';
import PatientMealsSales from '@components/PatientMealsSales';
import PatientMeals from '@components/PatientMeals';
import PatientMealsDetail from '@components/PatientMealsDetail';
import PatientMealsCart from '@components/PatientMealsCart';
import PatientMealsCheckout from '@components/PatientMealsCheckout';
import PatientMealsPurchaseSuccess from '@components/PatientMealsPurchaseSuccess';
import PatientMealsFAQ from '@components/PatientMealsFAQ';
import PatientMedicalEquipmentSales from '@components/PatientMedicalEquipmentSales';
import PatientMedicalEquipment from '@components/PatientMedicalEquipment';
import PatientMedicalEquipmentCategories from '@components/PatientMedicalEquipmentCategories';
import PatientMedicalEquipmentItems from '@components/PatientMedicalEquipmentItems';
import PatientMedicalEquipmentRentalItemDetail from '@components/PatientMedicalEquipmentRentalItemDetail';
import PatientMedicalEquipmentPurchaseItemDetail from '@components/PatientMedicalEquipmentPurchaseItemDetail';
import PatientMedicalEquipmentCart from '@components/PatientMedicalEquipmentCart';
import PatientMedicalEquipmentCheckout from '@components/PatientMedicalEquipmentCheckout';
import PatientMedicalEquipmentPayment from '@components/PatientMedicalEquipmentPayment';
import PatientMedicalEquipmentPurchaseSuccess from '@components/PatientMedicalEquipmentPurchaseSuccess';
import PatientBookHomePersonalCare from '@components/PatientBookHomePersonalCare';
import PatientBookHomePersonalCarePricing from '@components/PatientBookHomePersonalCarePricing';
import PatientBookHomePersonalCareDaySelect from '@components/PatientBookHomePersonalCareDaySelect';
import PatientBookHomePersonalCareCart from '@components/PatientBookHomePersonalCareCart';
import PatientBookHomePersonalCareCheckout from '@components/PatientBookHomePersonalCareCheckout';
import PatientBookHomePersonalCarePayment from '@components/PatientBookHomePersonalCarePayment';
import PatientBookHomePersonalCarePurchaseSuccess from '@components/PatientBookHomePersonalCarePurchaseSuccess';

import PatientBookCaregiversSales from '@components/PatientBookCaregiversSales';
import PatientBookCaregivers from '@components/PatientBookCaregivers';
import PatientBookCaregiversResult from '@components/PatientBookCaregiversResult';
import PatientBookCaregiversInterim from '@components/PatientBookCaregiversInterim';
import PatientBookCaregiversDateTimes from '@components/PatientBookCaregiversDateTimes';
import PatientBookCaregiversDateTimesUrgent from '@components/PatientBookCaregiversDateTimesUrgent';
import PatientBookCaregiversCheckout from '@components/PatientBookCaregiversCheckout';
import PatientBookCaregiversPayment from '@components/PatientBookCaregiversPayment';
import PatientBookCaregiversPurchaseSuccess from '@components/PatientBookCaregiversPurchaseSuccess';

import PatientOrderTransportationSales from '@components/PatientOrderTransportationSales';
import PatientOrderTransportation from '@components/PatientOrderTransportation';
import PatientOrderTransportationAddress from '@components/PatientOrderTransportationAddress';
import PatientOrderTransportationNote from '@components/PatientOrderTransportationNote';
import PatientOrderTransportationPayment from '@components/PatientOrderTransportationPayment';
import PatientOrderTransportationPurchaseSuccess from '@components/PatientOrderTransportationPurchaseSuccess';

import PatientSeniorProtection from '@components/PatientSeniorProtection';
import PatientSeniorProtectionPackages from '@components/PatientSeniorProtectionPackages';

import {
  ChangePassword,
  ChangeEmail,
  Settings,
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
    name: 'Documents',
    route: 'SignUpLanding',
    icon: images.bottomNavDocumentsActive,
    iconInactive: images.bottomNavDocumentsInactive,
    size: hp(3.2),
    badgeAdjust: -5
  },
  {
    name: 'Messaging',
    route: 'SignUpLanding',
    icon: images.bottomNavMessagingActive,
    iconInactive: images.bottomNavMessagingInactive,
    size: hp(3.2),
    badgeAdjust: -8
  },
  {
    name: 'Home',
    route: 'Home',
    icon: images.bottomNavAlertsActive,
    iconInactive: images.bottomNavAlertsInactive,
    size: hp(3.2),
    badgeAdjust: 0
  },
  {
    name: 'Calendar',
    route: 'SignUpLanding',
    icon: images.bottomNavCalendarActive,
    iconInactive: images.bottomNavCalendarInactive,
    size: hp(3.2),
    badgeAdjust: 0
  },
  {
    name: 'Settings',
    route: 'SignUpLanding',
    icon: images.bottomNavSettingsActive,
    iconInactive: images.bottomNavSettingsInactive,
    size: hp(3.2),
    badgeAdjust: 0
  }
];

const PatientHomeStack = createStackNavigator(
  {
    PatientHome,
    PatientMealsSales,
    PatientMeals,
    PatientMealsDetail,
    PatientMealsCart,
    PatientMealsCheckout,
    PatientMealsPurchaseSuccess,
    PatientMealsFAQ,
    PatientMedicalEquipmentSales,
    PatientMedicalEquipment,
    PatientMedicalEquipmentCategories,
    PatientMedicalEquipmentItems,
    PatientMedicalEquipmentRentalItemDetail,
    PatientMedicalEquipmentPurchaseItemDetail,
    PatientMedicalEquipmentCart,
    PatientMedicalEquipmentCheckout,
    PatientMedicalEquipmentPayment,
    PatientMedicalEquipmentPurchaseSuccess,
    PatientBookHomePersonalCare,
    PatientBookHomePersonalCarePricing,
    PatientBookHomePersonalCareDaySelect,
    PatientBookHomePersonalCareCart,
    PatientBookHomePersonalCareCheckout,
    PatientBookHomePersonalCarePayment,
    PatientBookHomePersonalCarePurchaseSuccess,
    PatientBookCaregiversSales,
    PatientBookCaregiversInterim,
    PatientBookCaregiversDateTimesUrgent,
    PatientBookCaregivers,
    PatientBookCaregiversResult,
    PatientBookCaregiversDateTimes,
    PatientBookCaregiversCheckout,
    PatientBookCaregiversPayment,
    PatientBookCaregiversPurchaseSuccess,
    PatientOrderTransportationSales,
    PatientOrderTransportation,
    PatientOrderTransportationAddress,
    PatientOrderTransportationNote,
    PatientOrderTransportationPayment,
    PatientOrderTransportationPurchaseSuccess,
    PatientSeniorProtection,
    PatientSeniorProtectionPackages,
  },
  { headerMode: 'none' }
);

PatientHomeStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'PatientHome') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const SettingsChangeStack = createStackNavigator(
  {
    Settings,
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
  if (routeName.routeName !== 'Settings') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    Alerts: {
      screen: PatientHomeStack
    },
    Messaging: {
      screen: PatientHomeStack
    },
    Home: {
      screen: PatientHomeStack
    },
    Calendar: {
      screen: PatientHomeStack
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

