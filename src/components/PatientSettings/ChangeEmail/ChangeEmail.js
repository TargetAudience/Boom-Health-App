import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText,
  ScreenWrapper,
} from '@components/common';
import {FormStyles} from '@constants/GlobalStyles';
import {validateEmail} from '@utils/Globals';
import styles from './ChangeEmail.styles';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      emailAddress: '',
      actionLoading: false,
    };

    this.onPressChangeEmail = this.onPressChangeEmail.bind(this);
    this.nextKeyboardButtonPassword =
      this.nextKeyboardButtonPassword.bind(this);
    this.passwordInputRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Change Email');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  async onPressChangeEmail() {
    const {actions} = this.props;
    const {password, emailAddress} = this.state;

    if (emailAddress === '') {
      actions.setAlert('Please enter your e-mail address.');
      return;
    } else if (!validateEmail(emailAddress)) {
      actions.setAlert('Be sure to enter a valid e-mail address.');
      return;
    }

    if (password === '') {
      actions.setAlert('Please enter your current password.');
      return;
    }

    this.setState({actionLoading: true});

    const that = this;
    await ProfileApi.changeEmailAddress({
      password,
      emailAddress,
    })
      .promise.then(async result => {
        const data = result.data;

        that.setState({actionLoading: false, emailAddress: '', password: ''});
        actions.updateEmailAddress(data.email);
        actions.setAlert('You e-mail address has been updated.');
      })
      .catch(error => {
        this.setState({actionLoading: false});
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardButtonPassword() {
    this.passwordInputRef.current.focus();
  }

  render() {
    const {password, emailAddress, actionLoading} = this.state;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="Change Email" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView
          style={styles.container}
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <View style={styles.containerB}>
            <FormWrapper style={styles.formWrapper}>
              <InputWithLabel
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                ]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={64}
                numberOfLines={1}
                returnKeyType="next"
                keyboardType="email-address"
                label="New Email Address"
                value={emailAddress}
                onSubmitEditing={this.nextKeyboardButtonPassword}
                onChangeText={text => this.setState({emailAddress: text})}
              />
              <AppText textWeight="500" style={styles.instructionsText}>
                To change your email, please also enter your password.
              </AppText>
              <InputWithLabel
                onRef={this.passwordInputRef}
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                ]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={32}
                numberOfLines={1}
                returnKeyType="done"
                label="Current Password"
                value={password}
                secureTextEntry
                onChangeText={text => this.setState({password: text})}
                onSubmitEditing={this.onPressChangeEmail}
              />
            </FormWrapper>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonLoading
              onPress={this.onPressChangeEmail}
              isLoading={actionLoading}
              containerStyle={FormStyles.button}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.buttonText}>
                Change Email
              </AppText>
            </ButtonLoading>
          </View>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(ChangeEmail);
