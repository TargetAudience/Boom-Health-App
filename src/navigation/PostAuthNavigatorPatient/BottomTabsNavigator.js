/* eslint react/prop-types: 0 */
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import images from '@assets/images';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TabBar from '@components/common/TabBar';

import PatientHome from '@components/PatientHome';
import PatientMealsSales from '@components/PatientMealsSales';
import PatientMeals from '@components/PatientMeals';
import PatientMealsDetail from '@components/PatientMealsDetail';
import PatientMealsCart from '@components/PatientMealsCart';
import PatientMealsCheckout from '@components/PatientMealsCheckout';
import PatientMealsPayment from '@components/PatientMealsPayment';
import PatientMealsPurchaseSuccess from '@components/PatientMealsPurchaseSuccess';
import PatientMealsFAQ from '@components/PatientMealsFAQ';
import PatientAlerts from '@components/PatientAlerts';
import PatientCalendar from '@components/PatientCalendar';
import PatientCalendarDetails from '@components/PatientCalendarDetails';

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

import PatientDischargeChecklist from '@components/PatientDischargeChecklist';
import PatientDischargeAddEditPerson from '@components/PatientDischargeAddEditPerson';
import PatientDischargePeople from '@components/PatientDischargePeople';
import PatientDischargeSettings from '@components/PatientDischargeSettings';
import PatientDischargeSendLink from '@components/PatientDischargeSendLink';

import Documents from '@components/Documents';
import AddCard from '@components/AddCard';
import CovidSurvey from '@components/CovidSurvey';
import PaymentInterim from '@components/PaymentInterim';
import PaymentInterimPreAuths from '@components/PaymentInterimPreAuths';

import PatientSeniorProtection from '@components/PatientSeniorProtection';
import PatientSeniorProtectionPackages from '@components/PatientSeniorProtectionPackages';
import PatientSeniorProtectionPayment from '@components/PatientSeniorProtectionPayment';
import PatientSeniorProtectionPurchaseSuccess from '@components/PatientSeniorProtectionPurchaseSuccess';

import MedicationRemindersHome from '@components/MedicationRemindersHome';
import MedicationRemindersDiary from '@components/MedicationRemindersDiary';
import MedicationRemindersHistory from '@components/MedicationRemindersHistory';
import MedicationRemindersViewMedicines from '@components/MedicationRemindersViewMedicines';
import MedicationRemindersAddEditMedicine from '@components/MedicationRemindersAddEditMedicine';

import MedicationRemindersDose from '@components/MedicationRemindersDose';
import MedicationRemindersIcon from '@components//MedicationRemindersIcon';
import MedicationRemindersInstructions from '@components/MedicationRemindersInstructions';
import MedicationRemindersNote from '@components/MedicationRemindersNote';
import MedicationRemindersReminders from '@components/MedicationRemindersReminders';
import MedicationRemindersRefillReminder from '@components/MedicationRemindersRefillReminder';
import MedicationRemindersStorage from '@components/MedicationRemindersStorage';

import ForceAppUpdate from '@components/ForceAppUpdate';

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
  ContactUs,
  PaymentsTest,
  PaymentHistory
} from '@components/PatientSettings';
import { LaunchWebView } from '@components/common';

import MessagingStack from './MessagingStack';

const tabData = [
  {
    name: 'Documents',
    route: 'Documents',
    icon: images.bottomNavDocumentsActive,
    iconInactive: images.bottomNavDocumentsInactive,
    size: hp(3.0),
    badgeAdjust: -5
  },
  {
    name: 'Messages',
    route: 'Messaging',
    icon: images.bottomNavMessagingActive,
    iconInactive: images.bottomNavMessagingInactive,
    size: hp(3.0),
    badgeAdjust: -8
  },
  {
    name: 'Home',
    route: 'Home',
    icon: images.bottomNavAlertsActive,
    iconInactive: images.bottomNavAlertsInactive,
    size: hp(3.0),
    badgeAdjust: 0
  },
  {
    name: 'Calendar',
    route: 'Calendar',
    icon: images.bottomNavCalendarActive,
    iconInactive: images.bottomNavCalendarInactive,
    size: hp(3.0),
    badgeAdjust: 0
  },
  {
    name: 'Settings',
    route: 'Settings',
    icon: images.bottomNavSettingsActive,
    iconInactive: images.bottomNavSettingsInactive,
    size: hp(3.0),
    badgeAdjust: 0
  }
];

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
    ContactUs,
    PaymentHistory,
    PaymentsTest,
    LaunchWebView,
    ForceAppUpdate
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

const PatientHomeStack = createStackNavigator(
  {
    PatientHome,
    PatientMealsSales,
    PatientMeals,
    PatientMealsDetail,
    PatientMealsCart,
    PatientMealsCheckout,
    PatientMealsPayment,
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
    PatientBookCaregivers,
    PatientBookCaregiversResult,
    PatientBookCaregiversInterim,
    PatientBookCaregiversDateTimes,
    PatientBookCaregiversDateTimesUrgent,
    PatientBookCaregiversCheckout,
    PatientBookCaregiversPayment,
    PatientBookCaregiversPurchaseSuccess,
    PatientOrderTransportationSales,
    PatientOrderTransportation,
    PatientOrderTransportationAddress,
    PatientOrderTransportationNote,
    PatientOrderTransportationPayment,
    PatientOrderTransportationPurchaseSuccess,
    PaymentInterim,
    PaymentInterimPreAuths,
    AddCard,
    CovidSurvey,
    LaunchWebView,
    ForceAppUpdate,
    MedicationRemindersHome,
    MedicationRemindersDiary,
    MedicationRemindersHistory,
    MedicationRemindersViewMedicines,
    MedicationRemindersAddEditMedicine,
    MedicationRemindersDose,
    MedicationRemindersIcon,
    MedicationRemindersInstructions,
    MedicationRemindersNote,
    MedicationRemindersReminders,
    MedicationRemindersRefillReminder,
    MedicationRemindersStorage,
    PatientSeniorProtection,
    PatientSeniorProtectionPackages,
    PatientSeniorProtectionPayment,
    PatientSeniorProtectionPurchaseSuccess,
    PatientDischargeChecklist,
    PatientDischargeAddEditPerson,
    PatientDischargePeople,
    PatientDischargeSettings,
    PatientDischargeSendLink
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

const PatientCalendarStack = createStackNavigator(
  {
    PatientCalendar,
    PatientCalendarDetails,
    ForceAppUpdate
  },
  { headerMode: 'none' }
);

PatientCalendarStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'PatientCalendar') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const PatientDocumentsStack = createStackNavigator(
  {
    Documents,
    ForceAppUpdate
  },
  {
    headerMode: 'none'
  }
);

PatientDocumentsStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'Documents') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const PatientAlertsStack = createStackNavigator(
  {
    PatientAlerts,
    ForceAppUpdate
  },
  {
    headerMode: 'none'
  }
);

PatientAlertsStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName !== 'PatientAlerts') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    Documents: {
      screen: PatientDocumentsStack
    },
    Messaging: {
      screen: MessagingStack
    },
    Home: {
      screen: PatientHomeStack
    },
    Calendar: {
      screen: PatientCalendarStack
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
    tabBarComponent: props => <TabBar {...props} tabData={tabData} />
  }
);
