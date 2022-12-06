import React from 'react';
import { Text, StyleSheet } from 'react-native';

import COLORS from '@assets/util/colors';
import { SizeToDevice } from '@assets/util/dimensions';

//App-specific text component, change size and fonts here to affect global styles
export const CustomText = ({ variant = 'normal', ...props }) => {
  const variantStyle =
    variant === 'small'
      ? styles.small
      : variant === 'large'
      ? styles.large
      : styles.normal;
  return (
    <Text style={[styles.basicFont, variantStyle, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  basicFont: {
    color: COLORS.black,
    fontWeight: '600'
  },
  normal: {
    fontSize: SizeToDevice(15)
  },
  small: {
    fontSize: SizeToDevice(14)
  },
  large: {
    fontSize: SizeToDevice(24)
  }
});
