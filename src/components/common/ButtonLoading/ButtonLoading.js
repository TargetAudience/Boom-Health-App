import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import styles from './ButtonLoading.styles';

class ButtonLoading extends Component {
  whichStyles() {
    const {
      containerStyle,
      containerDisabledStyle,
      disabled,
      actuallyDisable,
    } = this.props;
    if (disabled || actuallyDisable) {
      return containerDisabledStyle;
    }
    return containerStyle;
  }

  renderLoadingAnim() {
    const { isLoading, activityPink } = this.props;

    if (isLoading) {
      const color = activityPink ? Colors.titleTextMain : '#fff';

      return <ActivityIndicator color={color} />;
    }
    return null;
  }

  renderText() {
    const { isLoading, children, style } = this.props;

    if (isLoading) {
      return <Text style={[styles.textStyleLoading, style]}>{children}</Text>;
    }
    return <Text style={style}>{children}</Text>;
  }

  render() {
    const { onPress, isLoading, disabled, actuallyDisable } = this.props;

    const opacity = !disabled && !actuallyDisable && !isLoading ? 0.8 : 1;

    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={onPress}
        disabled={isLoading}
        {...this.props}>
        <View style={[styles.containerStyle, this.whichStyles()]}>
          {this.renderLoadingAnim()}
          {this.renderText()}
        </View>
      </TouchableOpacity>
    );
  }
}

ButtonLoading.defaultProps = {
  containerStyle: null,
  containerDisabledStyle: null,
  style: null,
  isLoading: false,
  disabled: false
};

export default ButtonLoading;
