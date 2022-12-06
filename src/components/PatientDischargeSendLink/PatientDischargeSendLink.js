import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CustomHeaderBack, FormWrapper, InputWithLabel, ButtonLoading, AppText } from '@components/common';
import { FormStyles, Globals } from '@constants/GlobalStyles';
import { validateEmail, validateInputLetters } from '@utils/Globals';
import styles from './PatientDischargeSendLink.styles';

import TasksApi from '@api/tasksApi';

import * as ProfileActions from '@ducks/profile';
import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

class PatientDischargeSendLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      firstName: '',
      lastName: '',
      emailAddress: '',
      patientName: '',
    };

    this.onPressSendLink = this.onPressSendLink.bind(this);

    this.lastNameInputRef = React.createRef();
    this.emailAddressInputRef = React.createRef();
    this.patientNameInputRef = React.createRef();
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  async onPressSendLink() {
    const { actions } = this.props;
    const { firstName, lastName, emailAddress, patientName, actionLoading } = this.state;

    if (actionLoading) {
      return;
    }

    if (firstName === '') {
      actions.setAlert('Please enter a first name.');
      return;
    } else if (firstName.length < 2) {
      actions.setAlert('Be sure your the name is at least 2 characters.');
      return;
    } else if (validateInputLetters(firstName)) {
      actions.setAlert('First name can only contain letters and dashes.');
      return;
    }

    if (lastName === '') {
      actions.setAlert('Please enter a last name.');
      return;
    } else if (lastName.length < 2) {
      actions.setAlert('Be sure the last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(lastName)) {
      actions.setAlert('Last name can only contain letters and dashes.');
      return;
    }

    if (emailAddress === '') {
      actions.setAlert('Please enter an e-mail address.');
      return;
    } else if (!validateEmail(emailAddress)) {
      actions.setAlert('Be sure to enter a valid e-mail address.');
      return;
    }

    if (patientName === '') {
      actions.setAlert('Please enter a patient name.');
      return;
    } else if (patientName.length < 2) {
      actions.setAlert('Be sure the last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(patientName)) {
      actions.setAlert('Patient name can only contain letters and dashes.');
      return;
    }

    this.setState({ actionLoading: true });

    await TasksApi.dischargeNurseLink({
      firstName,
      lastName,
      emailAddress,
      patientName
    })
      .promise.then(async result => {
        const data = result.data;
        actions.setAlert('An email has been sent to ' + firstName + '.');
        this.setState({ firstName: '', lastName: '', emailAddress: '', patientName: '', actionLoading: false });
        Keyboard.dismiss();
      })
      .catch(error => {
        console.log('PatientDischargeSendLink error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  render() {
    const { firstName, lastName, emailAddress, patientName, actionLoading } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title={'Discharge Nurse Details'} onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <AppText style={styles.instructionsText} textWeight="300">
              Your discharge nurse will receive a link in their inbox. From there they can input tasks which will appear in your task list ready for you to assign. 
            </AppText>
            <AppText style={styles.instructionsTextB} textWeight="300">
              No account is neccessary for them to assign tasks.
            </AppText>
            <InputWithLabel
              containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="First Name"
              value={firstName}
              onSubmitEditing={this.nextKeyboardLastName}
              onChangeText={text => this.setState({ firstName: text.trim() })}
            />
            <InputWithLabel
              onRef={this.lastNameInputRef}
              containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="Last Name"
              value={lastName}
              onChangeText={text => this.setState({ lastName: text.trim() })}
              onSubmitEditing={this.nextKeyboardEmailAddress}
            />
            <InputWithLabel
              onRef={this.emailAddressInputRef}
              containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              keyboardType="email-address"
              label="Email Address"
              value={emailAddress}
              onChangeText={text => this.setState({ emailAddress: text.trim() })}
              onSubmitEditing={this.nextKeyboardPatientName}
            />
            <InputWithLabel
              onRef={this.patientNameInputRef}
              containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              returnKeyType="done"
              label="Patient Name"
              value={patientName}
              onChangeText={text => this.setState({ patientName: text })}
              onSubmitEditing={this.onPressSendLink}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressSendLink}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={FormStyles.buttonText}>
                  Send Link to Email
                </AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AuthActions,
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDischargeSendLink);
