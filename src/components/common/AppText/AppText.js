import React, { Component } from 'react';
import { Platform, Text } from 'react-native';

const BASE_FONT = Platform.OS === 'ios' ? 'SFProText-' : 'SFProText-';

export default class AppText extends Component {
  font = () => {
    const { textWeight } = this.props;

    let weight = '';
    if (textWeight === '100') {
      weight = 'Light';
    } else if (textWeight === '200') {
      weight = 'Light';
    } else if (textWeight === '300') {
      weight = 'Regular';
    } else if (textWeight === '400') {
      weight = 'Medium';
    } else if (textWeight === '500') {
      weight = 'Semibold';
    } else if (textWeight === '600') {
      weight = 'Bold';
    } else if (textWeight === '700') {
      weight = 'Heavy';
    }

    return {
      fontFamily: `${BASE_FONT}${weight}`
    };
  };

  render() {
    return (
      <Text {...this.props} style={[this.font(), this.props.style]} includeFontPadding="false" textAlignVertical="center">{this.props.children}</Text>
    );
  }
}