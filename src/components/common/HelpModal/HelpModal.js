import React, { PureComponent } from 'react';
import { View, Image, Text, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { AppButton } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './HelpModal.styles';

const { width, height } = Dimensions.get('screen');

class HelpModal extends PureComponent {
  render() {
    const { isModalOpen, onPressCancel, helpText } = this.props;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCancel}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>Help</Text>
          <View style={styles.scrollViewContainer}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.helpText}>
                {helpText}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.cancelLinkContainer}>
            <AppButton
              style={styles.buttonPatient}
              onPress={onPressCancel}
              width={180}
              height={36}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <Text style={styles.buttonText}>Close</Text>
            </AppButton>
          </View>
        </View>
      </Modal>
    );
  }
}

export default HelpModal;
