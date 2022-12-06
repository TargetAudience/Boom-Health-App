import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MotiView, MotiImage } from 'moti';

import imgBoomLogo from '@assets/imagesAnim/boom-logo.png';

const imgGirlL = require('@assets/imagesAnim/girl-l.png');
const imgGirlR = require('@assets/imagesAnim/girl-r.png');

const animationSettings = [
  imgGirlR,
  imgGirlR,
  imgGirlL,
  imgGirlR,
  imgGirlL,
  imgGirlR
];

export const SplashScreen = ({ onAnimationCompleted = () => {} }) => {
  const [step, setStep] = useState(0);
  const [animatedImageSource, setAnimatedImageSource] = useState(
    animationSettings[step]
  );
  useEffect(() => {
    var isActive = true;
    if (step === animationSettings.length) {
      setTimeout(onAnimationCompleted, 300);
    } else if (step >= 1) {
      setAnimatedImageSource(animationSettings[step]);
      setTimeout(() => {
        if (isActive) {
          setStep(step + 1);
        }
      }, 250);
    }
    return () => {
      isActive = false;
    };
  }, [step]);

  return (
    <>
      <MotiView
        key="logo"
        style={styles.logoContainer}
        from={{
          transform: [{ scale: 1.7 }, { translateY: 150 }]
        }}
        animate={{
          transform: [{ scale: 1 }, { translateY: 0 }]
        }}
        exit={{
          opacity: 0,
          scale: 0
        }}
        transition={{
          type: 'timing',
          duration: 600,
          delay: 600
        }}>
        <Image style={styles.imgLogo} source={imgBoomLogo} />
      </MotiView>

      {/*image preload for Android devices*/}
      <Image source={imgGirlL} style={{ width: 0, height: 0 }} />
      <Image source={imgGirlR} style={{ width: 0, height: 0 }} />

      <View key="girl" style={styles.girlContainer}>
        <MotiImage
          key="animated-girl"
          fadeDuration={0}
          style={styles.imgGirl}
          source={animatedImageSource}
          from={{
            transform: [{ translateY: 200 }, { translateX: -100 }, { scale: 0 }]
          }}
          animate={{
            transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }]
          }}
          delay={800}
          transition={{
            type: 'timing',
            duration: 600
          }}
          onDidAnimate={(
            styleProp,
            didAnimationFinish,
            maybeValue,
            { attemptedValue }
          ) => {
            if (step === 0 && styleProp === 'transform' && didAnimationFinish) {
              setStep(1);
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
  },
  imgLogo: {
    width: 130,
    height: 130,
    resizeMode: 'contain'
  },
  girlContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  imgGirl: {
    maxWidth: 307, //cannot use flex sizing due to Android flickering on animation
    maxHeight: 460,
    marginBottom: 50,
    height: '100%',
    width: undefined,
    aspectRatio: 0.67
  }
});
