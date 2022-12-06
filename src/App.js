import React, {Component} from 'react';
import {View, StatusBar, Platform, StyleSheet, Text} from 'react-native';

import analytics from '@react-native-firebase/analytics';
import PubSub, {PubSubContext} from 'src/pubsub';
import {Settings} from 'react-native-fbsdk-next';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {NativeBaseProvider} from 'native-base';
import NavigationService from '@utils/NavigationService';


import {persistor, store} from '@state/store';
import AppNavigator from 'src/navigation/AppNavigator';
import PubNubRoot from '@utils/PubNubRoot';
import LoadRoot from '@utils/LoadRoot';
import NotificationsService from '@utils/NotificationsService';
import {Alert} from '@components/common';

import RNBootSplash from 'react-native-bootsplash';

import * as GestureHandler from 'react-native-gesture-handler';

console.disableYellowBox = true;

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);
LogBox.ignoreLogs(['Require cycle']);
//LogBox.ignoreLogs(['EventEmitter.removeListener']);

// Reset persist store: persistor.purge()
// persistor.purge();

/*
console.log = function() {};
console.info = function() {};
console.warn = function() {};
console.error = function() {};
console.debug = function() {};
*/

if (Platform.OS === 'ios') {
  Settings.initializeSDK();
}

const pubsub = new PubSub();

const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBarColor: '#fff',
      barStyle: 'dark-content',
      notification: null,
    };

    this.navigation = null;
  }

  async componentDidMount() {
    await RNBootSplash.show();
    setTimeout(async () => {
     await RNBootSplash.hide({ fade: true });
    }, 500);

    if (global.__DEV__) {
      analytics().setAnalyticsCollectionEnabled(false);
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
    }
  }

  renderStatusBar = () => {
    const {statusBarColor, barStyle} = this.state;

    return (
      <View style={[styles.statusBar, {backgroundColor: statusBarColor}]}>
        <StatusBar
          translucent
          backgroundColor={statusBarColor}
          barStyle={barStyle}
        />
      </View>
    );
  };

  render() {
    return (
      <GestureHandler.GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={<View />} persistor={persistor}>
            <PubSubContext.Provider value={{ pubsub }}>
              <SafeAreaProvider>
                <Alert />
                <NativeBaseProvider>
                  <AppNavigator
                    onNavigationStateChange={(prevState, currentState) => {
                      const currentScreen = getActiveRouteName(currentState);
                      const prevScreen = getActiveRouteName(prevState);

                      if (prevScreen !== currentScreen) {
                        let statusBar = {
                          statusBarColor: '#fff',
                          barStyle: 'dark-content'
                        };
                        if (
                          currentScreen === 'AppTutorial' ||
                          currentScreen === 'SignUpLanding' ||
                          currentScreen === 'ForceAppUpdate'
                        ) {
                          statusBar = {
                            statusBarColor: '#5197e9',
                            barStyle: 'dark-content'
                          };
                        } else if (currentScreen === 'PatientStory') {
                          statusBar = {
                            statusBarColor: '#f06cb9',
                            barStyle: 'dark-content'
                          };
                        } else if (
                          currentScreen === 'PatientBookCaregiversSales' ||
                          currentScreen === 'PatientSeniorProtection' ||
                          currentScreen === 'PatientMealsSales' ||
                          currentScreen === 'PatientMedicalEquipmentSales' ||
                          currentScreen === 'PatientOrderTransportationSales'
                        ) {
                          statusBar = {
                            statusBarColor: '#d3e2fa',
                            barStyle: 'dark-content'
                          };
                        } else if (
                          currentScreen === 'EmailSuccess' ||
                          currentScreen === 'SignUpPostalCodeLookup' ||
                          currentScreen === 'SignUpServices' ||
                          currentScreen === 'SignUpServicesNotAvailable'
                        ) {
                          statusBar = {
                            statusBarColor: '#f7f8fa',
                            barStyle: 'dark-content'
                          };
                        }
                        this.setState(statusBar);
                      }
                    }}
                    ref={navigatorRef => {
                      this.navigation = navigatorRef && navigatorRef._navigation;
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                  />
                </NativeBaseProvider>
              </SafeAreaProvider>
              <LoadRoot />
              <PubNubRoot />
              <NotificationsService />
            </PubSubContext.Provider>
          </PersistGate>
        </Provider>
      </GestureHandler.GestureHandlerRootView>
    );
  }
}

export default App;

let STATUSBAR_HEIGHT = StatusBar.currentHeight;
if (Platform.OS === 'ios') {
  
    STATUSBAR_HEIGHT = 44;

}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
