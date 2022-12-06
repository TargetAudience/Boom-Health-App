import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import styles from './AppButton.styles';

const AppButton = props => {
  const { children, disabled, style, width, height, backgroundColor, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.80} disabled={disabled} onPress={onPress} style={[ styles.background, style, { width, height, backgroundColor } ]}>
      {children}
    </TouchableOpacity>
  )
}

AppButton.defaultProps = {
  style: null,
  disabled: false
};

export default AppButton;
