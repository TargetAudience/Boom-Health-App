import React, { PureComponent } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppButton, ButtonLoading, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import styles from './GenericModal.styles';

const { width, height } = Dimensions.get('screen');

class GenericModal extends PureComponent {
  render() {
    const { isModalOpen, onPressButtonLoading, actionLoading, onPressOne, onPressCloseButton, onPressTwo, buttonOneWidth, buttonOneLabel, buttonTwoLabel, helpText, titleText, modalHeight, bottomImage, bottomImageStyle, scrollHeight } = this.props;

    const buttonOne = buttonOneWidth ? buttonOneWidth : 180;
    const buttonWidth = onPressTwo ? '48%' : buttonOne;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressOne}>
        <View style={[styles.modalContent, { height: modalHeight }]}>  
          {onPressCloseButton ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressCloseButton} style={styles.closeContainer}>
              <Image
                style={styles.close}
                source={images.close}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
          <AppText textWeight="600" style={styles.titleText}>{titleText}</AppText>
          <View style={styles.contentContainer}>
            <View style={[styles.scrollViewContainer, { height: scrollHeight }]}>
              <ScrollView>
                <AppText textWeight="300" style={styles.helpText}>{helpText}</AppText>
               </ScrollView>
            </View>
            <Image
              style={bottomImageStyle}
              source={bottomImage}
            />
          </View>
          
          {onPressButtonLoading ? (
            <View>
              <ButtonLoading
                onPress={onPressButtonLoading}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>{buttonOneLabel}</AppText>
              </ButtonLoading>
            </View>
          ) : null}
          {!onPressButtonLoading ? (
            <View style={styles.cancelLinkContainer}>
              <AppButton
                style={styles.buttonPatient}
                onPress={onPressOne}
                width={buttonWidth}
                height={36}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>{buttonOneLabel}</AppText>
              </AppButton>
              {onPressTwo ? (
                <AppButton
                  style={styles.buttonPatient}
                  onPress={onPressTwo}
                  width={buttonWidth}
                  height={36}
                  backgroundColor={Colors.buttonMain}
                  disabled={false}>
                  <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>{buttonTwoLabel}</AppText>
                </AppButton>
              ) : null}
            </View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

export default GenericModal;
