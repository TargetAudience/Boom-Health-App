import React, { Component } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppButton, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './WelcomeStoryModal.styles';

const { width, height } = Dimensions.get('screen');

class WelcomeStoryModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isModalOpen, onPressLink, onPressCloseButton } = this.props;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCloseButton}>
        <View style={[styles.modalContent, { height: 420 }]}>  
          {onPressCloseButton ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressCloseButton} style={styles.closeContainer}>
              <Image
                style={styles.close}
                source={images.closePink}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
          <View style={styles.contentContainer}>
            <Image style={styles.profilePhoto} source={images.lisaPhoto} />
            <Image style={styles.lisasStoryScriptImage} source={images.lisasStoryScript} />
            <AppText textWeight="400" style={styles.textStoryIntro}>We've been through what you've been through!</AppText>
            <AppText textWeight="400" style={styles.textStoryBody}>Boom founder Lisa Assaf designed this app in Toronto after caring for her aging father.</AppText>
            <Image style={styles.heartsImage} source={images.hearts} />
            <AppButton
              onPress={onPressLink}
              height={26}
              backgroundColor={Colors.transparent}
              style={styles.buttonReadMore}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonReadMoreText}>Read Her Story</AppText>
            </AppButton>
          </View>
        </View>
      </Modal>
    );
  }
}

export default WelcomeStoryModal;

