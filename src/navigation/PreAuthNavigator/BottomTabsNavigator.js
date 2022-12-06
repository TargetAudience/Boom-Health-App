/* eslint react/prop-types: 0 */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TabBar from '@components/common/TabBar';
import PatientHome from '@components/PatientHome';
import PatientMeals from '@components/PatientMeals';
import PatientMealsDetail from '@components/PatientMealsDetail';
import PatientMealsCart from '@components/PatientMealsCart';
import PatientMealsCheckout from '@components/PatientMealsCheckout';
import PatientMealsPurchaseSuccess from '@components/PatientMealsPurchaseSuccess';
import PatientMealsFAQ from '@components/PatientMealsFAQ';
import PatientCalendar from '@components/PatientCalendar';
import PatientCalendarDetails from '@components/PatientCalendarDetails';
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
import PatientBookCaregivers from '@components/PatientBookCaregivers';
import PatientBookCaregiversResult from '@components/PatientBookCaregiversResult';
import PatientBookCaregiversInterim from '@components/PatientBookCaregiversInterim';
import PatientBookCaregiversDateTimes from '@components/PatientBookCaregiversDateTimes';
import PatientBookCaregiversDateTimesUrgent from '@components/PatientBookCaregiversDateTimesUrgent';
import PatientBookCaregiversCheckout from '@components/PatientBookCaregiversCheckout';
import PatientBookCaregiversPayment from '@components/PatientBookCaregiversPayment';
import PatientBookCaregiversPurchaseSuccess from '@components/PatientBookCaregiversPurchaseSuccess';
import PatientOrderTransportation from '@components/PatientOrderTransportation';
import PatientOrderTransportationAddress from '@components/PatientOrderTransportationAddress';
import PatientOrderTransportationNote from '@components/PatientOrderTransportationNote';
import PatientOrderTransportationPayment from '@components/PatientOrderTransportationPayment';
import PatientOrderTransportationPurchaseSuccess from '@components/PatientOrderTransportationPurchaseSuccess';
import AddCard from '@components/AddCard';
import PatientSeniorProtection from '@components/PatientSeniorProtection';

import { LaunchWebView } from '@components/common';

const PatientHomeStack = createStackNavigator(
  {
    PatientHome,
    PatientMeals,
    PatientMealsDetail,
    PatientMealsCart,
    PatientMealsCheckout,
    PatientMealsPurchaseSuccess,
    PatientMealsFAQ,
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
    PatientBookCaregivers,
    PatientBookCaregiversResult,
    PatientBookCaregiversInterim,
    PatientBookCaregiversDateTimes,
    PatientBookCaregiversDateTimesUrgent,
    PatientBookCaregiversCheckout,
    PatientBookCaregiversPayment,
    PatientBookCaregiversPurchaseSuccess,
    PatientOrderTransportation,
    PatientOrderTransportationAddress,
    PatientOrderTransportationNote,
    PatientOrderTransportationPayment,
    PatientOrderTransportationPurchaseSuccess,
    PatientSeniorProtection,
    AddCard,
    LaunchWebView
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
    PatientCalendarDetails
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

/*
const PatientAlertsStack2 = createSwitchNavigator(
  {
    CaregiverMyAvailability,
    CaregiverMyAvailabilityCalendar
  },
  {
    headerMode: 'none'
  }
);

const PatientAlertsStack = createStackNavigator(
  {
    PatientAlerts,
    CaregiverMyServices,
    CaregiverMyAvailability: {
      screen: PatientAlertsStack2
    }
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
*/

export default createBottomTabNavigator(
  {
    Alerts: {
      screen: SignIn
    },
    Messaging: {
      screen: SignIn
    },
    Home: {
      screen: PatientHomeStack
    },
    Calendar: {
      screen: SignIn
    },
    Settings: {
      screen: SignIn
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
      <TabBar {...props} />
    ),
  }
);
