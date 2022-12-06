import { createStackNavigator } from 'react-navigation-stack';
import AppTutorial from '@components/AppTutorial';
import AppOnboarding from '@components/AppOnboarding';
import AppOnboardingFinalStep from '@components/AppOnboardingFinalStep';
import SignUpLanding from '@components/SignUpLanding';
import SignIn from '@components/SignIn';
import ForgotPassword from '@components/ForgotPassword';
import EmailSuccess from '@components/EmailSuccess';
import SignUpAccount from '@components/SignUpAccount';
import SignUpServices from '@components/SignUpServices';
import SignUpServicesNotAvailable from '@components/SignUpServicesNotAvailable';
import SignUpPostalCodeLookup from '@components/SignUpPostalCodeLookup';
import SignUpProfile from '@components/SignUpProfile';
import SignUpInvite from '@components/SignUpInvite';
import ForceAppUpdate from '@components/ForceAppUpdate';
import { LaunchWebView } from '@components/common';

const Modals = createStackNavigator(
  {
    LaunchWebView: { screen: LaunchWebView }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

const PreAuthNavigation = createStackNavigator(
  {
    ForceAppUpdate: {
      screen: ForceAppUpdate
    },
    AppOnboarding: {
      screen: AppOnboarding
    },
    AppOnboardingFinalStep: {
      screen: AppOnboardingFinalStep
    },
    AppTutorial: {
      screen: AppTutorial
    },
    SignUpLanding: {
      screen: SignUpLanding
    },
    SignIn: {
      screen: SignIn
    },
    ForgotPassword: {
      screen: ForgotPassword
    },
    EmailSuccess: {
      screen: EmailSuccess
    },
    SignUpAccount: {
      screen: SignUpAccount
    },
    SignUpServices: {
      screen: SignUpServices
    },
    SignUpServicesNotAvailable: {
      screen: SignUpServicesNotAvailable
    },
    SignUpPostalCodeLookup: {
      screen: SignUpPostalCodeLookup
    },
    SignUpProfile: {
      screen: SignUpProfile
    },
    SignUpInvite: {
      screen: SignUpInvite
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: 'transparent' }
    },
    initialRouteName: 'AppOnboarding',
    headerMode: 'none',
    mode: 'card'
  }
);

export default createStackNavigator(
  {
    Main: {
      screen: PreAuthNavigation,
      path: ''
    },
    Modals: {
      screen: Modals
    }
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none'
  }
);
