import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import styles from './FormWrapper.styles';

const FormWrapper = props => {
  const { outerContainer, containerStyle } = styles;
  const { style } = props;

  return (
    <View style={outerContainer}>
      <View style={[containerStyle, { ...style }]}>{props.children}</View>
    </View>
  );
};

export default FormWrapper;
