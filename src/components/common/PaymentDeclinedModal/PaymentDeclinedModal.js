import React, { Component } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppButton, ButtonLoading, InputWithLabel, CheckmarkToggle } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import { pluralize } from '@utils/Globals';
import styles from './PaymentDeclinedModal.styles';

const { width, height } = Dimensions.get('screen');

const PaymentDeclinedModal = ({ data, modalMessage, isModalOpen, closeButtonLabel, onPressContinue, modalHeight, scrollHeight }) => {

  const titleText = pluralize(data.length, 'Card', false) + ' Declined';

  const personList = data.map(item => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.textTitle}>Name</Text>
        <Text style={styles.textValue}>{item.fullName}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.textTitle}>Message</Text>
        <Text style={styles.textValue}>{item.message}</Text>
      </View>
    </View>
  ));

  return (
    <Modal
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
      isVisible={isModalOpen}
      deviceWidth={width}
      deviceHeight={height}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View style={[styles.modalContent, { height: modalHeight }]}>
        <Text style={styles.titleText}>{titleText}</Text>
        <View style={styles.contentContainer}>
          <View style={[styles.scrollViewContainer, { height: scrollHeight }]}>
            <ScrollView>
              <Text style={styles.helpText}>
                {modalMessage}
              </Text>
              {personList}
             </ScrollView>
          </View>
        </View>

        <View style={styles.cancelLinkContainer}>
          <AppButton
            onPress={() => onPressContinue()}
            width={100}
            height={36}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <Text style={styles.buttonText}>{closeButtonLabel}</Text>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
}

export default PaymentDeclinedModal;
