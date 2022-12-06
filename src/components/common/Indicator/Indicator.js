import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './Indicator.styles';

class Indicator extends PureComponent {
  render() {
    const { numberText, color, style, small } = this.props;

    const extraStyles = [color && { backgroundColor: color }, style];

    let width = numberText >= 10 ? styles.large : styles.regular;

    let viewStyle = {};
    let textStyle = {};
    if (small) {
      viewStyle = {
        height: 14
      };
      textStyle = {
        fontSize: 10,
        lineHeight: 13
      };
      width = numberText >= 10 ? styles.largeSm : styles.regularSm;
    }

    if (numberText >= 1) {
      return (
        <View style={[styles.containerStyle, width, extraStyles, viewStyle]}>
          <Text
            style={[
              styles.numberText,
              textStyle
            ]}>
            {numberText}
          </Text>
        </View>
      );
    }
    return null;
  }
}

export default Indicator;
