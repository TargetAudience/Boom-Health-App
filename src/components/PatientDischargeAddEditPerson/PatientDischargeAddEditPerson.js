import React, { Component } from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from '../../../src/@crazycodeboy/react-native-check-box';
import { CustomHeaderBack, FormWrapper, InputWithLabel, ButtonLoading, AppText } from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import { validateEmail, validateInputLetters } from '@utils/Globals';
import styles from './PatientDischargeAddEditPerson.styles';

import TasksApi from '@api/tasksApi';

import * as ProfileActions from '@ducks/profile';
import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

const selectBoxOptions = [
  { key: 'family_member', label: 'Family member', value: 'family_member' },
  { key: 'friend', label: 'Friend', value: 'friend' },
  { key: 'physician', label: 'Physician', value: 'physician' },
  { key: 'discharge_nurse', label: 'Discharge nurse', value: 'discharge_nurse' },
  { key: 'other_caregiver', label: 'Other caregiver', value: 'other_caregiver' }
];

class PatientDischargeAddEditPerson extends Component {
  constructor(props) {
    super(props);

    const person = this.props.navigation.getParam('person', '');
    const callBackLoadPeople = this.props.navigation.getParam('callBackLoadPeople', '');

    this.state = {
      person,
      callBackLoadPeople,
      personId: person.personId ? person.personId : null,
      firstName: person.firstName ? person.firstName : '',
      lastName: person.lastName ? person.lastName : '',
      emailAddress: person.emailAddress ? person.emailAddress : '',
      mobileNumber: person.mobileNumber ? person.mobileNumber : '',
      personType: person.personType ? person.personType : null,
      checkedEmail: person.notifyEmail === 1 ? true : false,
      checkedTextMessage: person.notifySMS === 1 ? true : false,
      formStyle: person.personType === 'myself' ? FormStyles.inputSelectDisabled : FormStyles.inputSelect,
      actionLoading: false
    };

    this.onPressAddOrUpdate = this.onPressAddOrUpdate.bind(this);

    this.nextKeyboardLastName = this.nextKeyboardLastName.bind(this);
    this.nextKeyboardEmailAddress = this.nextKeyboardEmailAddress.bind(this);
    this.nextKeyboardMobileNumber = this.nextKeyboardMobileNumber.bind(this);
    this.closeSelectPerson = this.closeSelectPerson.bind(this);

    this.lastNameInputRef = React.createRef();
    this.emailAddressInputRef = React.createRef();
    this.mobileNumberInputRef = React.createRef();
    this.selectPersonRef = React.createRef();
  }

  async onPressAddOrUpdate() {
    const { navigation, actions } = this.props;
    const {
      personId,
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      personType,
      checkedEmail,
      checkedTextMessage,
      actionLoading,
      callBackLoadPeople
    } = this.state;

    if (actionLoading) {
      return;
    }

    if (firstName === '') {
      actions.setAlert('Please enter your first name.');
      return;
    } else if (firstName.length < 2) {
      actions.setAlert('Be sure your first name is at least 2 characters.');
      return;
    } else if (validateInputLetters(firstName)) {
      actions.setAlert('First name can only contain letters and dashes.');
      return;
    }

    if (lastName === '') {
      actions.setAlert('Please enter your last name.');
      return;
    } else if (lastName.length < 2) {
      actions.setAlert('Be sure your last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(lastName)) {
      actions.setAlert('Last name can only contain letters and dashes.');
      return;
    }

    if (emailAddress === '') {
      actions.setAlert('Please enter your e-mail address.');
      return;
    } else if (!validateEmail(emailAddress)) {
      actions.setAlert('Be sure to enter a valid e-mail address.');
      return;
    }

    if (personType === '') {
      actions.setAlert('Please enter a person type.');
      return;
    }

    if (checkedTextMessage === true && mobileNumber === '') {
      actions.setAlert('Please enter a mobile number.');
      return;
    }

    if (checkedEmail === false && checkedTextMessage === false) {
      actions.setAlert('Please be sure to check one or both preferred communication type.');
      return;
    }

    this.setState({ actionLoading: true });

    if (personId) {
      await TasksApi.updatePerson({
        personId,
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        personType,
        checkedEmail,
        checkedTextMessage
      })
        .promise.then(result => {
          const data = result.data.people;
          this.setState({ actionLoading: false });
          callBackLoadPeople(data);
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ actionLoading: false });
          actions.setAlert(error.data.statusText);
        });
    } else {
      await TasksApi.addPerson({
        firstName,
        lastName,
        emailAddress,
        mobileNumber,
        personType,
        checkedEmail,
        checkedTextMessage
      })
        .promise.then(result => {
          const data = result.data.people;
          this.setState({ actionLoading: false });
          callBackLoadPeople(data);
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ actionLoading: false });
          actions.setAlert(error.data.statusText);
        });
    }
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  toggleCheckedEmail = () => {
    const { checkedEmail } = this.state;

    this.setState({ checkedEmail: !checkedEmail });
  };

  toggleCheckedTextMessage = () => {
    const { checkedTextMessage } = this.state;

    this.setState({ checkedTextMessage: !checkedTextMessage });
  };

  getPageTitle = () => {
    const { person } = this.state;

    if (person) {
      return `${person.firstName} ${person.lastName}`;
    } else {
      return 'Add Person';
    }
  };

  getButtonLabel = () => {
    const { person } = this.state;

    if (person) {
      return 'Update Person';
    } else {
      return 'Add Person';
    }
  };

  closeSelectPerson() {
    this.selectPersonRef.togglePicker(false);
  }

  nextKeyboardLastName() {
    this.lastNameInputRef.current.focus();
  }

  nextKeyboardEmailAddress() {
    this.emailAddressInputRef.current.focus();
  }

  nextKeyboardMobileNumber() {
    this.mobileNumberInputRef.current.focus();
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      personType,
      checkedEmail,
      checkedTextMessage,
      formStyle,
      actionLoading
    } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title={this.getPageTitle()} onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
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
              onSubmitEditing={this.nextKeyboardMobileNumber}
            />
            <InputWithLabel
              onRef={this.mobileNumberInputRef}
              containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              returnKeyType="next"
              keyboardType="numeric"
              label="Mobile number"
              value={mobileNumber}
              onChangeText={text => this.setState({ mobileNumber: text.trim() })}
            />
            {personType !== 'myself' ? (
              <InputWithLabel
                onRef={ref => {
                  this.selectPersonRef = ref;
                }}
                select
                items={selectBoxOptions}
                selectValue={personType}
                containerStyle={[formStyle, FormStyles.inputContainerLabel]}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={2}
                numberOfLines={1}
                returnKeyType="next"
                label="Person Type"
                disabled={false}
                onValueChange={text => this.setState({ personType: text })}
                onDonePress={this.closeSelectPerson}
              />
            ) : null}
            <AppText textWeight="500" style={styles.instructionsText}>
              Preferred communication
            </AppText>
            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleCheckedEmail}
              isChecked={checkedEmail}
              rightText="Email"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />
            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleCheckedTextMessage}
              isChecked={checkedTextMessage}
              rightText="Text message (SMS)"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressAddOrUpdate}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={FormStyles.buttonText}>
                  {this.getButtonLabel()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientDischargeAddEditPerson);
