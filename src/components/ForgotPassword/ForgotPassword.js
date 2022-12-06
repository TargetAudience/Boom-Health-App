import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableHighlight } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PersonTopSection, CustomHeaderBack, FormWrapper, Input, ButtonLoading, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import styles from './ForgotPassword.styles';
import UserApi from '@api/userApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: ''
    };
  }

  onSendLinkPress = () => {
    const { navigation, actions } = this.props;
    const { emailAddress } = this.state;

    if (emailAddress === '') {
      actions.setAlert('Please enter your e-mail address.');
      return;
    }

    this.setState({ actionLoading: true });

    UserApi.forgotPassword({ emailAddress }).promise.then(() => {
      this.setState({ actionLoading: false });
      navigation.navigate('EmailSuccess', { emailAddress });
    }).catch(error => {
    console.debug('error', error)
      this.setState({ actionLoading: false });
      actions.setAlert(error.data.statusText);
    })
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    const { emailAddress, actionLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack includeLogo onPressBack={this.onPressBack} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.textIntro}>Please enter your email address.{'\n'}We will send you a link to reset your password.</AppText>
          <FormWrapper>
            <Input
              containerStyle={FormStyles.inputContainer}
              style={FormStyles.inputStyle}
              label="Username"
              underlineColorAndroid="transparent"
              maxLength={36}
              numberOfLines={1}
              placeholder="Email Address"
              value={emailAddress}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={this.onSendLinkPress}
              onChangeText={text => this.setState({ emailAddress: text })}
            />            
            <ButtonLoading
              onPress={this.onSendLinkPress}
              isLoading={actionLoading}
              containerStyle={styles.buttonContainer}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonSignInText}>Send Link</AppText>
            </ButtonLoading> 
          </FormWrapper>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
