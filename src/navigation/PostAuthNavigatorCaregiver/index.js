import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import BottomTabsNavigator from './BottomTabsNavigator';

export default createStackNavigator(
  {
    Main: {
      screen: BottomTabsNavigator
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: 'transparent' }
    },
    initialRouteName: 'Main',
    headerMode: 'none'
  }
);
