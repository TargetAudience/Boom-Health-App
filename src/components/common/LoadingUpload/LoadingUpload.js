import React, { PureComponent } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import styles from './LoadingUpload.styles';

const { width, height } = Dimensions.get('screen');

export default class LoadingUpload extends PureComponent {
  render() {
    const { current, target, visible, onPressCancel } = this.props;

    if (visible) {
      const barWidth = width * 0.6 - 40;
      const barValue = (current / target) * 100;

      return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPressCancel}>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerB}>
              <Text style={styles.uploadingText}>Uploading...</Text>
              <View style={styles.progressBarBackground}>
                <ProgressBarAnimated
                  useNativeDriver={true}
                  width={barWidth}
                  height={8}
                  value={barValue}
                  borderRadius={4}
                  borderColor="#ffffff"
                  backgroundColor="#468de9"
                  backgroundColorOnComplete="#468de9"
                  underlyingColor="#dfdfdf"
                  barAnimationDuration={200}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

LoadingUpload.defaultProps = {
  imageData: null
};
