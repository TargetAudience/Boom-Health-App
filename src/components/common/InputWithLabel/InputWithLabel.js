import React, { Component } from 'react';
import { TextInput, Dimensions, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { AppText } from '@components/common';
import styles from './InputWithLabel.styles';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';

const { width } = Dimensions.get('screen');

class InputWithLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaceholder: true,
    };

    this.inputRefs = {};
    this.inputAccessoryView = this.inputAccessoryView.bind(this);
  }

  inputAccessoryView() {
    const { onDonePress } = this.props;

    return (
      <View style={defaultStyles.modalViewMiddle}>
        <Text></Text>
        <TouchableWithoutFeedback
          onPress={() => {
            onDonePress();
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <View testID="needed_for_touchable">
            <Text style={defaultStyles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  
  onOpenPicker = () => {
    this.setState({ isPlaceholder: false });
  };

  onClosePicker = () => {
    this.setState({ isPlaceholder: true });
  };
  
  render() {
    const { onDonePress, fontWeight, disabled, onRef, refInput, mask, select, selectValue, selectPlaceholder, items, onValueChange, onChangeText, outerContainer, label, containerStyle, style, placeholderColor, labelStyle, ...otherProps } = this.props;
    const { isPlaceholder } = this.state;

    const placeholderTextColor = placeholderColor || Colors.placeholder;
    const fontWeightWeight = fontWeight || '300';

    let textInput = mask ?
      <TextInputMask
          refInput={refInput}
          mask={mask}
          editable
          numberOfLines={1}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          style={style}
          {...otherProps}
       />
        :
       <TextInput
          ref={onRef}
          editable={!disabled || false}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          style={style}
          {...otherProps}
        />

    textInput = select ?
      <RNPickerSelect
        ref={onRef}
        value={selectValue}
        onValueChange={onValueChange}
        useNativeAndroidPickerStyle={false}
        style={pickerStyles}
        textInputProps={{ style: styles.textInput }}
        placeholder={
          isPlaceholder
            ? {
                label: selectPlaceholder,
                value: null,
              }
            : {}
        }
        disabled={disabled}
        onOpen={this.onOpenPicker}
        onClose={this.onClosePicker}
        items={items}
        fixAndroidTouchableBug={true}
        InputAccessoryView={this.inputAccessoryView}
        Icon={() => <Image style={styles.imageDropdown} source={images.selectArrows} /> }
        {...otherProps}
      />
    : textInput;

    return (
      <View style={outerContainer}>
        {label ? <AppText style={[styles.labelStyle, labelStyle]} textWeight={fontWeightWeight}>{label}</AppText> : null}
        <View style={[styles.container, containerStyle]}>
          {textInput}
        </View>
      </View>
    )
  }
};

const inputStyles = {
  ...FormStyles.inputContainer,
  paddingLeft: 10,
  backgroundColor: null,
  borderWidth: 0,
  justifyContent: 'flex-start',
  color: '#1c1c1c'
};

const pickerStyles = StyleSheet.create({
  useNativeAndroidPickerStyle: false,
  inputAndroid: inputStyles,
  inputIOSContainer: inputStyles
});

InputWithLabel.defaultProps = {
  mask: null,
  label: null,
  style: null,
  outerContainer: null,
  containerStyle: null,
  labelStyle: null,
  placeholderColor: null,
  onRef: null,
  textInputContainer: null,
  selectPlaceholder: '',
};

export default InputWithLabel;

