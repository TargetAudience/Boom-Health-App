import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputWithLabel, CreditCardIcon, AppText }  from '@components/common';
import styles from './CreditCardInput.styles';

const CreditCardInput = ({
  number,
  type,
  onChangeText,
  onFocus,
  placeholderColor,
  containerStyle,
  outerContainer,
  label,
  style,
  onRef,
  ...otherProps
}) => (
  <View style={outerContainer}>
    <AppText textWeight="400" style={styles.labelStyle}>Card</AppText>
    <View style={[styles.container, containerStyle]}>
      <CreditCardIcon icon={type} style={styles.creditCardIcon} />
      <TextInput
        ref={onRef}
        editable
        keyboardType="numeric"
        numberOfLines={1}
        maxLength={19}
        value={number}
        onFocus={onFocus}
        onChangeText={onChangeText}
        placeholder="1234 5678 9012 3456"
        style={[style, { marginLeft: 44 }]}
        {...otherProps}
      />
    </View>
  </View>
);

CreditCardInput.defaultProps = {
  onFocus: null,
  number: null,
  type: null,
  disabled: false,
  placeholderColor: null,
  onRef: null,
  labelStyle: null,
  inputStyle: null,
  inputContainerStyle: {},
};

export default CreditCardInput;
