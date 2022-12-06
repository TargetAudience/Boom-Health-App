import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from '../../../src/@crazycodeboy/react-native-check-box';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText
} from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import { validateEmail, validateInputLetters } from '@utils/Globals';
import styles from './SignUpInvite.styles';

import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

class SignUpInvite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      checkedAdmin: false,
      checkedChats: false,
      checkedGroupPurchases: false
    };

    this.stateSave = {
      firstName: 'Bobby',
      lastName: 'Smith',
      emailAddress: `bobby${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}@${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}123.com`,
      checkedAdmin: false,
      checkedChats: false,
      checkedGroupPurchases: false
    };

    this.onPressAddPerson = this.onPressAddPerson.bind(this);
    this.nextKeyboardLastName = this.nextKeyboardLastName.bind(this);
    this.nextKeyboardEmailAddress = this.nextKeyboardEmailAddress.bind(this);

    this.lastNameInputRef = React.createRef();
    this.emailAddressInputRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Sign Up Invite');
  }

  async onPressAddPerson() {
    const { navigation, actions } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      checkedAdmin,
      checkedChats,
      checkedGroupPurchases
    } = this.state;

    if (firstName === '') {
      actions.setAlert('Please enter the first name.');
      return;
    } else if (firstName.length < 2) {
      actions.setAlert('Be sure the first name is at least 2 characters.');
      return;
    } else if (validateInputLetters(firstName)) {
      actions.setAlert('First name can only contain letters and dashes.');
      return;
    }

    if (lastName === '') {
      actions.setAlert('Please enter the last name.');
      return;
    } else if (lastName.length < 2) {
      actions.setAlert('Be sure the last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(lastName)) {
      actions.setAlert('Last name can only contain letters and dashes.');
      return;
    }

    if (emailAddress === '') {
      actions.setAlert('Please enter the e-mail address.');
      return;
    } else if (!validateEmail(emailAddress)) {
      actions.setAlert('Be sure to enter a valid e-mail address.');
      return;
    }

    actions.addTempInvite({ personId: Math.floor(Math.random() * 100), firstName, lastName, emailAddress, checkedAdmin, checkedChats, checkedGroupPurchases });

    navigation.goBack();
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  toggleChats = () => {
    const { checkedChats } = this.state;

    this.setState({ checkedChats:!checkedChats })
  }

  toggleAdmin = () => {
    const { checkedAdmin } = this.state;

    this.setState({ checkedAdmin:!checkedAdmin })
  }

  toggleGroupPurchases = () => {
    const { checkedGroupPurchases } = this.state;

    this.setState({ checkedGroupPurchases:!checkedGroupPurchases })
  }

  nextKeyboardLastName() {
    this.lastNameInputRef.current.focus();
  }

  nextKeyboardEmailAddress() {
    this.emailAddressInputRef.current.focus();
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      checkedAdmin,
      checkedChats,
      checkedGroupPurchases
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Invite Family Member" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
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
              label="First Name"
              value={firstName}
              onSubmitEditing={this.nextKeyboardLastName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <InputWithLabel
              onRef={this.lastNameInputRef}
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
              label="Last Name"
              value={lastName}
              onChangeText={text => this.setState({ lastName: text })}
              onSubmitEditing={this.nextKeyboardEmailAddress}
            />
            <InputWithLabel
              onRef={this.emailAddressInputRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
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
              label="Email Address"
              value={emailAddress}
              onChangeText={text => this.setState({ emailAddress: text })}
              onSubmitEditing={this.nextKeyboardPassword}
            />

            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleAdmin}
              isChecked={checkedAdmin}
              rightText="This person is a family co-administrator and can add or edit family members"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />
            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleChats}
              isChecked={checkedChats}
              rightText="Add this family member to chats"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />

            <CheckBox
              style={styles.checkbox}
              onClick={this.toggleGroupPurchases}
              isChecked={checkedGroupPurchases}
              rightText="Ask this family member to participate in group  purchases"
              rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
              checkBoxColor={Colors.highlight}
            />

            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressAddPerson}
                isLoading={false}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Add Person to Invite List</AppText>
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
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpInvite);

