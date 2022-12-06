import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { CustomText } from './UI.CustomText';
import COLORS from '@assets/util/colors';
import { IsSmallScreen } from '@assets/util/dimensions';
import imgBoomLogo from '@assets/imagesAnim/boom-logo.png';
import { SlideData } from '@assets/util/SlideData';
import { SlideAnimated } from './Onboarding.SlideAnimated';
import { Colors } from '@constants/GlobalStyles';

export const OnboardingSlider = ({ onOnboardingCompleted = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef(null);
  const slideRefs = useRef(Array(SlideData.length));

  const onSlideChange = (index, lastIndex) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideRefs.current[currentSlide].startAnimation();
  }, [currentSlide]);

  const renderItem = ({ item, index }) => {
    return (
      <SlideAnimated
        title={item.title}
        image={item.image}
        text={item.text}
        blurBackground={item.blurBackground}
        Animation={item.animation}
        ref={ref => (slideRefs.current[index] = ref)}
      />
    );
  };

  return (
    <>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} resizeMode="contain" source={imgBoomLogo} />
      </View>
      <ImageBackground
        style={styles.sliderContainer}
        resizeMode="contain"
        source={require('@assets/imagesAnim/background.png')}>
        {/* overriding the default pagingation for better layout control */}
        <AppIntroSlider
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderPagination={() => {}}
          onSlideChange={onSlideChange}
          data={SlideData}
          ref={slider}
        />
      </ImageBackground>
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {SlideData.length > 1 &&
            SlideData.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.pagingIndicator,
                  i === currentSlide
                    ? { backgroundColor: COLORS.pink }
                    : { backgroundColor: COLORS.transparent }
                ]}
                onPress={() => slider.current?.goToSlide(i, true)}
              />
            ))}
        </View>
        <View style={styles.buttonContainer}>
          {currentSlide === SlideData.length - 1 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onOnboardingCompleted}
              style={[styles.nextButton, styles.buttonStyles]}>
              <CustomText style={styles.nextButtonText}>Done</CustomText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => slider.current?.goToSlide(currentSlide + 1, true)}
              style={[styles.nextButton, styles.buttonStyles]}>
              <CustomText style={styles.nextButtonText}>Next</CustomText>
            </TouchableOpacity>
          )}
          {currentSlide === 0 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onOnboardingCompleted}
              style={[styles.prevButton, styles.buttonStyles]}>
              <CustomText variant={IsSmallScreen ? null : 'small'}>
                Skip
              </CustomText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => slider.current?.goToSlide(currentSlide - 1, true)}
              style={[styles.prevButton, styles.buttonStyles]}>
              <CustomText variant={IsSmallScreen ? null : 'small'}>
                Back
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 15
  },
  sliderContainer: {
    flex: 65,
    width: '100%',
    justifyContent: 'flex-start'
  },
  paginationContainer: {
    flex: IsSmallScreen ? 15 : 20,
    width: '100%',
    paddingVertical: 10
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    marginBottom: 10
  },
  logo: {
    resizeMode: 'contain',
    width: 130,
    height: 130
  },
  buttonContainer: IsSmallScreen
    ? {
        alignItems: 'flex-start',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }
    : {
        alignItems: 'center'
      },
  nextButton: IsSmallScreen
    ? {}
    : {
        backgroundColor: Colors.buttonMain,

      },
  nextButtonText: IsSmallScreen
    ? {
        alignSelf: 'flex-end'
      }
    : {
        color: COLORS.white
      },
  prevButton: {
    marginTop: IsSmallScreen ? 0 : 10
  },
  buttonStyles: IsSmallScreen
    ? {
        width: '30%',
        paddingHorizontal: 20,
        paddingVertical: 10
      }
    : {
        justifyContent: 'center',
        borderRadius: 6,
        paddingVertical: 10,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center'
      },
  pagingIndicator: {
    borderColor: COLORS.pink,
    borderWidth: 0.5,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4
  }
});
