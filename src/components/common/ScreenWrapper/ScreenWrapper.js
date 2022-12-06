import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Colors} from '@constants/GlobalStyles';
import styles from './ScreenWrapper.styles';

const ScreenWrapper = ({children, bottomBackground, backgroundTopColor}) => {
  if (bottomBackground) {
    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              {children}
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.mainBackground}}
        />
      </>
    );
  }
  if (backgroundTopColor) {
    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top, backgroundColor: backgroundTopColor ? backgroundTopColor : '#fff'}]}>
              {children}
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView
          style={{flex: 0, backgroundColor: bottomBackground ? Colors.mainBackground : '#fff'}}
        />
      </>
    );
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View
          style={[
            styles.container,
            {paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}>
          {children}
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default ScreenWrapper;
