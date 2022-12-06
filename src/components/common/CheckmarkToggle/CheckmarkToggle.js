import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import images from '@assets/images';
import styles from './CheckmarkToggle.styles';

const CheckmarkToggle = ({ item, center, checked, onPress, color }) => (
  <TouchableWithoutFeedback onPress={() => onPress(item)}>
    <View style={[styles.iconView, center ? styles.center : null]}>
      {checked ? (
        <Image
          style={styles.icon}
          source={
            color && color === 'white' ? images.checkboxWhiteChecked : images.checkboxChecked
          }
        />
      ) : (
        <Image
          style={styles.icon}
          source={color && color === 'white' ? null : images.checkboxUnchecked}
        />
      )}
    </View>
  </TouchableWithoutFeedback>
);

CheckmarkToggle.defaultProps = {
  color: null
};

export default CheckmarkToggle;
