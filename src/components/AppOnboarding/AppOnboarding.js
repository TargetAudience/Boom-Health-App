import React, { useState } from 'react';
import { View } from 'react-native';

import { SplashScreen } from '@components/common/OnBoarding/Onboarding.SplashScreen';
import { OnboardingSlider } from '@components/common/OnBoarding/Onboarding.OnboardingSlider';

import styles from './AppOnboarding.styles';

export default function AppOnboarding(props) {
  const [isSplashRunning, setIsSplashRunning] = useState(true);

  const onCompleted = () => {
    props.navigation.navigate('AppOnboardingFinalStep');
  };

  return (
    <View style={styles.container}>
      {isSplashRunning ? (
        <SplashScreen
          onAnimationCompleted={() => {
            setIsSplashRunning(false);
          }}
        />
      ) : (
        <>
          <OnboardingSlider
            onOnboardingCompleted={() => {
              onCompleted();
            }}
          />
        </>
      )}
    </View>
  );
}
