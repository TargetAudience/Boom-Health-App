import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import images from '@assets/images';
import { CustomHeaderBack, AppButton, AppText } from '@components/common';
import styles from './EmailSuccess.styles';
import { Colors } from '@constants/GlobalStyles';

class EmailSuccess extends Component {
  constructor(props) {
    super(props);
  }

  onPressReturnToLogin = () => {
    const { navigation } = this.props;

    navigation.navigate('SignIn');
  };

  render() {
    const { navigation: { state: { params: { emailAddress } } } } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={images.emailSuccess}
          style={styles.iconMain}
          resizeMode="contain"
        />

        <AppText textWeight="400" style={styles.headerTextAlign}>Please check your email</AppText>

        <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.textAlign}>A message has been sent to {emailAddress} with a link to reset your password.</AppText>

        <View style={styles.buttonContainer}>
          <AppButton
            onPress={this.onPressReturnToLogin}
            width={160}
            height={38}
            backgroundColor={Colors.buttonMain}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.buttonSignInText}>Back to Sign In</AppText>
          </AppButton>
        </View>
      </View>
    );
  }
}

export default EmailSuccess;
