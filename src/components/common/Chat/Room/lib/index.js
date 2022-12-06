import * as React from 'react';
import { Composer, InputToolbar, Send } from 'react-native-gifted-chat';
import { StyleSheet, Platform } from 'react-native';
import { IconButtonPress } from '@components/common';
import images from './../../../../../assets/images';
import { Colors } from '@constants/GlobalStyles';

export function renderSend(props) {
  const { text } = props;

  const iconStyle = text.length >= 1 ? styles.iconFocused : styles.iconUnfocused;

  return (
    <Send {...props} containerStyle={[ props.containerStyle, { borderTopWidth: 0 }]}>
      <IconButtonPress
        viewStyle={styles.iconContainer}
        style={iconStyle}
        icon={images.iconSend}
      />
    </Send>
  );
}

export function renderInputToolbar(props) {
  return <InputToolbar {...props} containerStyle={styles.inputToolbarContainer} />;
}

export function renderComposer(props) {
  return <Composer 
    {...props} 
    placeholder="Write a message..." 
    textInputStyle={styles.textInputStyle} 
    textInputProps={{  
      onSubmitEditing: () => {
        props.onSend(props);
        props.onTextChanged('');
      },
      returnKeyType: 'send',
      blurOnSubmit: false
    }}
  />;
}

const styles = StyleSheet.create({
  inputToolbarContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dfe4e9', 
    backgroundColor: '#eef3f6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    paddingRight: 5
  },
  textInputStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e6eaed', 
    borderRadius: 3,
    backgroundColor: '#fff',
    height: 40,
    minHeight: 40,
    lineHeight: 22,
    fontSize: 17,
    paddingLeft: 14,
    marginRight: 5
  },
  iconContainer: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    width: 38,
    height: 38,
    borderRadius: 3,
    backgroundColor: Colors.buttonMain
  },
  iconFocused: {
    opacity: 1,
    width: 17,
    height: 17,
    marginTop: 6,
    marginLeft: 3
  },
  iconUnfocused: {
    opacity: 0.5,
    width: 17,
    height: 17,
    marginTop: 6,
    marginLeft: 3
  },
});