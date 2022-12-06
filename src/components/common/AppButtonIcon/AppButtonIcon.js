import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import styles from './AppButtonIcon.styles';

class AppButtonIcon extends Component {
  whichStyles() {
    const { containerStyle, containerDisabledStyle, disabled } = this.props;
    if (disabled) {
      return containerDisabledStyle;
    }
    return containerStyle;
  }

  renderLoadingAnim() {
    const { isLoading, activityPink } = this.props;

    if (isLoading) {
      const color = activityPink ? Colors.titleTextMain : '#fff';

      return (
        <ActivityIndicator
          size="small"
          color={color}
          style={styles.activityIndicator}
        />
      );
    }
    return null;
  }

  render() {
    const {
      disabled,
      isLoading,
      children,
      style,
      onPress,
      icon,
      iconStyle,
    } = this.props;

    const opacity = !disabled && !isLoading ? 0.8 : 1;

    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={onPress}
        disabled={disabled}
        {...this.props}>
        <View style={[styles.containerStyle, this.whichStyles()]}>
          {this.renderLoadingAnim()}
          <Image source={icon} style={iconStyle} />
          <Text style={style}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

AppButtonIcon.defaultProps = {
  containerStyle: null,
  containerDisabledStyle: null,
  style: null,
  disabled: false
};

export default AppButtonIcon;
