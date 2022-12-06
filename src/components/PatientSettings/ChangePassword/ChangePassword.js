import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText,
  ScreenWrapper
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './ChangePassword.styles';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

const USER_TOKEN = '@usertoken';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      actionLoading: false
    };

    this.onPressChangePassword = this.onPressChangePassword.bind(this);

    this.nextKeyboardNewPassword = this.nextKeyboardNewPassword.bind(this);
    this.nextKeyboardConfirmPassword = this.nextKeyboardConfirmPassword.bind(this);

    this.newPasswordInputRef = React.createRef();
    this.confirmPasswordInputRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Change Password');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  async onPressChangePassword() {
    const { actions } = this.props;
    const { password, newPassword, confirmPassword } = this.state;

    if (password === '') {
      actions.setAlert('Please enter your current password.');
      return;
    }

    if (newPassword === '') {
      actions.setAlert('Please enter a new password.');
      return;
    } else if (newPassword.length < 6) {
      actions.setAlert('Be sure your new password is at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      actions.setAlert('Please be sure your new password and confirm password are the same.');
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.changePassword({
      password,
      newPassword
    })
      .promise.then(async result => {
        const data = result.data;

        this.setState({ actionLoading: false, password: '', newPassword: '', confirmPassword: '' });
        actions.setAlert('You password has been updated.');
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  };

  nextKeyboardNewPassword() {
    this.newPasswordInputRef.current.focus();
  }

  nextKeyboardConfirmPassword() {
    this.confirmPasswordInputRef.current.focus();
  }
  
  render() {
    const { password, newPassword, confirmPassword, actionLoading } = this.state;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="Change Password" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView style={styles.container} extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              returnKeyType="next"
              label="Current Password"
              value={password}
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              onSubmitEditing={this.nextKeyboardNewPassword}
            />
            <InputWithLabel
              onRef={this.newPasswordInputRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              returnKeyType="next"
              label="New Password"
              value={newPassword}
              secureTextEntry
              onChangeText={text => this.setState({ newPassword: text })}
              onSubmitEditing={this.nextKeyboardConfirmPassword}
            />
            <InputWithLabel
              onRef={this.confirmPasswordInputRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              returnKeyType="done"
              label="Confirm New Password"
              value={confirmPassword}
              secureTextEntry
              onChangeText={text => this.setState({ confirmPassword: text })}
              onSubmitEditing={this.onPressChangePassword}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressChangePassword}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>Change Password</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
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

export default connect(
  null,
  mapDispatchToProps
)(ChangePassword);
