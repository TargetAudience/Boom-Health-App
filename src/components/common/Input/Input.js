import React, { Component } from 'react';
import { TextInput, Text, View, Image, TextInputProps, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Input.styles';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';

const Input = ({ onRef, label, containerStyle, style, secureTextEntry, placeholderColor, ...otherProps }) => {
  const placeholderTextColor = placeholderColor || Colors.placeholder;

  return (
    <View style={containerStyle}>
      {secureTextEntry ?
        <TextInput
          ref={onRef}
          editable
          numberOfLines={1}
          placeholderTextColor={placeholderTextColor}
          style={style}
          {...otherProps}
        />
        :
        <TextInput
          ref={onRef}
          editable
          numberOfLines={1}
          placeholderTextColor={placeholderTextColor}
          style={style}
          {...otherProps}
        />
      }
    </View>
  )
};

export default Input;
