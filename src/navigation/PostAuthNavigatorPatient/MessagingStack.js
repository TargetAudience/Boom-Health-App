import { createStackNavigator } from 'react-navigation-stack';
import Messaging from '@components/PatientMessaging';
import MessagingSpace from '@components/PatientMessagingSpace';
import ChatSelectUsers from '@components/ChatSelectUsers';
import ForceAppUpdate from '@components/ForceAppUpdate';

const MessagingStack = createStackNavigator({
  Messaging: {
    screen: Messaging
  },
  MessagingSpace: {
    screen: MessagingSpace
  },
  ChatSelectUsers: {
    screen: ChatSelectUsers
  },
  ForceAppUpdate: {
    screen: ForceAppUpdate
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
  if (routeName.routeName === 'MessagingSpace' || routeName.routeName === 'ChatSelectUsers' || routeName.routeName === 'ForceAppUpdate') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default MessagingStack;