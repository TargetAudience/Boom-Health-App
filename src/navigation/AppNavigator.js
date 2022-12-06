import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import PreAuthNavigator from './PreAuthNavigator';
import PostAuthNavigatorCaregiver from './PostAuthNavigatorCaregiver';
import PostAuthNavigatorPersonalCare from './PostAuthNavigatorPersonalCare';
import PostAuthNavigatorPatient from './PostAuthNavigatorPatient';
import GuestAuthNavigatorPatient from './GuestAuthNavigatorPatient';
import AuthLoadingScreen from '@components/AuthLoading'

const Navigator = createSwitchNavigator({
    AuthLoadingScreen,
    PreAuthFlow: PreAuthNavigator,
    PostAuthFlowCaregiver: PostAuthNavigatorCaregiver,
    PostAuthFlowPersonalCare: PostAuthNavigatorPersonalCare,
    PostAuthFlowPatient: PostAuthNavigatorPatient,
    GuestAuthFlowPatient: GuestAuthNavigatorPatient
  },
  {
    initialRouteName: 'AuthLoadingScreen'
  });

const AppNavigator = createAppContainer(Navigator);
export default AppNavigator;
