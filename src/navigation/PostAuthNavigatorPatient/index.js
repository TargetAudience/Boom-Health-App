import { createStackNavigator } from 'react-navigation-stack';
import BottomTabsNavigator from './BottomTabsNavigator';
import PatientModalAddress from '@components/PatientModalAddress';
import { PatientInformation, MyProfile } from '@components/PatientSettings';
import PatientStory from '@components/PatientStory';
import PdfPage from '@components/PdfPage';

const PostAuthenticationMainNavigation = createStackNavigator(
  {
    MainTabNavigator: { screen: BottomTabsNavigator },
    PatientModalAddress: { screen: PatientModalAddress },
    PatientModalEditPatientAddress: { screen: PatientInformation },
    PatientModalEditMyAddress: { screen: MyProfile },
    PatientStory: { screen: PatientStory },
    PdfPage: { screen: PdfPage }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

export default createStackNavigator(
  {
    Main: {
      screen: PostAuthenticationMainNavigation
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
