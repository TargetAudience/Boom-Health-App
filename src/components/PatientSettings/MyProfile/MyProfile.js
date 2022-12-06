import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
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
import styles from './MyProfile.styles';

import * as AlertActions from '@ducks/alert';
import * as ProfileActions from '@ducks/profile';

import ProfileApi from '@api/profileApi';

const provinces = [
  { key: 'AB', label: 'Alberta', value: 'AB' },
  { key: 'BC', label: 'British Columbia', value: 'BC' },
  { key: 'MB', label: 'Manitoba', value: 'MB' },
  { key: 'NB', label: 'New Brunswick', value: 'NB' },
  { key: 'NL', label: 'Newfoundland and Labrador', value: 'NL' },
  { key: 'NT', label: 'Northwest Territories', value: 'NT' },
  { key: 'NS', label: 'Nova Scotia', value: 'NS' },
  { key: 'NU', label: 'Nunavut', value: 'NU' },
  { key: 'ON', label: 'Ontario', value: 'ON' },
  { key: 'PE', label: 'Prince Edward Island', value: 'PE' },
  { key: 'QC', label: 'Quebec', value: 'QC' },
  { key: 'SK', label: 'Saskatchewan', value: 'SK' },
  { key: 'YT', label: 'Yukon Territory', value: 'YT' }
];

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromPage: props.navigation.getParam('fromPage', null),
      firstName: props.auth.firstName,
      lastName: props.auth.lastName,
      street: props.profile.owner.street,
      city: props.profile.owner.city,
      province: props.profile.owner.province,
      postalCode: props.profile.owner.postalCode,
      phoneNumber: props.profile.owner.phoneNumber,
      additionalPhoneNumber: props.profile.owner.additionalPhoneNumber,
      alternateContactName: props.profile.owner.alternateContactName,
      alternateContactNumber: props.profile.owner.alternateContactNumber,
      actionLoading: false
    };

    this.onPressUpdateProfile = this.onPressUpdateProfile.bind(this);

    this.patientsCityRef = React.createRef();
    this.patientsProvinceRef = React.createRef();
    this.patientsPostalCodeRef = React.createRef();
    
    this.patientsFirstNameRef = React.createRef();
    this.patientsLastNameRef = React.createRef();

    this.patientsAlternateContactNameRef = React.createRef();

    this.nextKeyboardPatientsCity = this.nextKeyboardPatientsCity.bind(this);
    this.nextKeyboardPatientsProvince = this.nextKeyboardPatientsProvince.bind(this);
    this.nextKeyboardPatientsPostalCode = this.nextKeyboardPatientsPostalCode.bind(this);
    this.nextKeyboardPatientsFirstName = this.nextKeyboardPatientsFirstName.bind(this);
    this.nextKeyboardPatientsLastName = this.nextKeyboardPatientsLastName.bind(this);
    this.nextKeyboardPatientsAlternateContactName = this.nextKeyboardPatientsAlternateContactName.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings My Profile');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  async onPressUpdateProfile() {
    const { actions } = this.props;
    const {
      fromPage,
      street = '',
      city = '',
      province = '',
      postalCode = '',
      phoneNumber = '',
      additionalPhoneNumber = '',
      alternateContactName = '',
      alternateContactNumber = ''
    } = this.state;

    this.setState({ actionLoading: true });

    await ProfileApi.updateMyProfile({
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      alternateContactName,
      alternateContactNumber
    })
      .promise.then(async result => {
        this.setState({ actionLoading: false });

        actions.setProfileOwner({
          street,
          city,
          province,
          postalCode,
          phoneNumber,
          additionalPhoneNumber,
          alternateContactName,
          alternateContactNumber
        });
        
        if (fromPage === 'checkout' || fromPage === 'transportation') {
          this.onPressBack();
        } else {
          actions.setAlert('Your profile has been updated.');
        }
      })
      .catch(error => {
        console.log('My profile error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardPatientsCity() {
    this.patientsCityRef.current.focus();
  }

  nextKeyboardPatientsProvince() {
    this.patientsProvinceRef.togglePicker(true);
  }

  nextKeyboardPatientsPostalCode() {
    this.patientsProvinceRef.togglePicker(true);
    setTimeout(() => {
      this.patientsPostalCodeRef.current.focus();
    }, 200);
  }

  nextKeyboardPatientsFirstName() {
    this.patientsFirstNameRef.current.focus();
  }

  nextKeyboardPatientsLastName() {
    this.patientsLastNameRef.current.focus();
  }

  nextKeyboardPatientsAlternateContactName() {
    this.patientsAlternateContactNameRef.current.focus();
  }

  render() {
    const {
      fromPage,
      firstName,
      lastName,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      alternateContactName,
      alternateContactNumber,
      actionLoading
    } = this.state;

    const pressBack = (fromPage === 'checkout' || fromPage === 'transportation') ? null : this.onPressBack;
    const pressClose = (fromPage === 'checkout' || fromPage === 'transportation') ? this.onPressBack : null;

    const alternateText = `If ${firstName} is unavailable, please contact:`;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="My Profile" onPressBack={pressBack} onPressClose={pressClose} />
        <KeyboardAwareScrollView style={styles.container} extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel,
                FormStyles.inputContainerDisabled
              ]}
              disabled
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={64}
              numberOfLines={1}
              label="First Name"
              value={firstName}
              onChangeText={text => this.setState({ firstName: text })}
            />
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel,
                FormStyles.inputContainerDisabled
              ]}
              disabled
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              label="Last Name"
              value={lastName}
              onChangeText={text => this.setState({ lastName: text })}
            />
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>My Address</AppText>
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
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="Street (inc. house or apt. number)"
              value={street}
              onChangeText={text => this.setState({ street: text })}
              onSubmitEditing={this.nextKeyboardPatientsCity}
            />
            <InputWithLabel
              onRef={this.patientsCityRef}
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
              label="City"
              value={city}
              onChangeText={text => this.setState({ city: text })}
              onSubmitEditing={this.nextKeyboardPatientsProvince}
            />
            <InputWithLabel
              onRef={ref => { this.patientsProvinceRef = ref }}
              select
              items={provinces}
              selectValue={province}
              containerStyle={[
                FormStyles.inputSelect,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={2}
              numberOfLines={1}
              returnKeyType="next"
              label="Province"
              onValueChange={text => this.setState({ province: text })}
              onDonePress={this.nextKeyboardPatientsPostalCode}
            />
            <InputWithLabel
              onRef={this.patientsPostalCodeRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              maxLength={6}
              numberOfLines={1}
              returnKeyType="next"
              label="Postal Code"
              value={postalCode}
              onChangeText={text =>
                this.setState({ postalCode: text.toUpperCase() })
              }
            />
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>My Contact Info</AppText>
            <InputWithLabel
              mask={'[000] [000]-[0000]'}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={12}
              numberOfLines={1}
              keyboardType="numeric"
              returnKeyType="done"
              label="Phone Number"
              value={phoneNumber}
              onChangeText={text => this.setState({ phoneNumber: text })}
            />
            <InputWithLabel
              mask={'[000] [000]-[0000]'}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={12}
              numberOfLines={1}
              keyboardType="numeric"
              returnKeyType="done"
              label="Additional Phone Number"
              value={additionalPhoneNumber}
              onChangeText={text =>
                this.setState({ additionalPhoneNumber: text })
              }
              onSubmitEditing={this.nextKeyboardPatientsAlternateContactName}
            />
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textInstructions, FormStyles.groupGapTop]}>{alternateText}</AppText>
            <InputWithLabel
              onRef={this.patientsAlternateContactNameRef}
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
              label="Alternate Contact Name"
              value={alternateContactName}
              onChangeText={text =>
                this.setState({ alternateContactName: text })
              }
            />
            <InputWithLabel
              mask={'[000] [000]-[0000]'}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={12}
              numberOfLines={1}
              keyboardType="numeric"
              returnKeyType="done"
              label="Alternate Contact Phone"
              value={alternateContactNumber}
              onChangeText={text =>
                this.setState({ alternateContactNumber: text })
              }
              onSubmitEditing={this.onPressUpdateProfile}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressUpdateProfile}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Update Profile</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...ProfileActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
