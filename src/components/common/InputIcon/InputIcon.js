import React, { Component } from 'react';
import { TextInput, View, Image, TouchableWithoutFeedback } from 'react-native';
import images from '../../../assets/images';
import styles from './InputIcon.styles';
import { Colors } from '@constants/GlobalStyles';

class InputIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eyeIcon: images.eyeIconOff,
      isPassword: true
    };
  }

  changePwdType = () => {
    const { isPassword } = this.state;

    this.setState({
      eyeIcon: isPassword ? images.eyeIconOn : images.eyeIconOff,
      isPassword: !isPassword
    });
  };

  render() {
    const {
      placeholder,
      value,
      autoCapitalize,
      onChangeText,
      secureTextEntry,
      icon,
      onRef,
      style,
      containerStyle,
      placeholderColor,

      ...otherProps
    } = this.props;
    const { eyeIcon, isPassword } = this.state;
    const placeholderTextColor = placeholderColor || Colors.placeholder;

    return (
      <View style={styles.inputInner}>
        <TextInput
          ref={onRef}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          value={value}
          style={style}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && isPassword}
          underlineColorAndroid="transparent"
          placeholderTextColor={placeholderTextColor}
          {...otherProps}
        />
        {secureTextEntry ? (
          <TouchableWithoutFeedback onPress={this.changePwdType}>
            <Image source={eyeIcon} style={styles.eyeIcon} />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}

InputIcon.defaultProps = {
  value: null,
  onRef: null,
  autoCapitalize: 'none',
  onChangeText: null,
  secureTextEntry: false,
  inputContainerStyle: null
};

export default InputIcon;
