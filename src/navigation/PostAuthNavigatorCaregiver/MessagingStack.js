import { createStackNavigator } from 'react-navigation-stack';
import Messaging from '@components/CaregiverMessaging';
import MessagingSpace from '@components/CaregiverMessagingSpace';

const MessagingStack = createStackNavigator({
  Messaging: {
    screen: Messaging
  },
  MessagingSpace: {
    screen: MessagingSpace
  }
}, {
  initialRouteName: 'Messaging',
  headerMode: 'none',
  mode: 'card'
});

MessagingStack.navigationOptions = ({ navigation }) => {
  const {
    state: { routes }
  } = navigation;
  let tabBarVisible = true;
  const routeName = routes[navigation.state.index];
  if (routeName.routeName === 'MessagingSpace') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default MessagingStack;