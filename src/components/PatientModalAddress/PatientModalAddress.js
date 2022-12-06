import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScreenWrapper, CustomHeaderBack, HelpModal, InputWithLabel, FormWrapper, ButtonLoading, AppText } from '@components/common';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import _ from 'lodash';
import {
  validatePostalCode
} from '@utils/Globals';
import styles from './PatientModalAddress.styles';
import images from '@assets/images';

import MealsApi from '@api/mealsApi';
import ProfileApi from '@api/profileApi';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';
import * as TransportationActions from '@ducks/transportation';

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

class PatientModalAddress extends Component {
  constructor(props) {
    super(props);

    const addressType = props.navigation.getParam('addressType', null);
    const pageType = props.navigation.getParam('pageType', null);

    this.state = {
      actionLoading: false,
      addressType,
      pageType,
      nickname: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      additionalPhoneNumber: ''
    };

    this.stateSAVE = {
      actionLoading: false,
      addressType,
      pageType,
      nickname: 'My Nickname',
      firstName: '',
      lastName: '',
      street: '123 Oak St.',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M4L1G2',
      phoneNumber: '',
      additionalPhoneNumber: ''
    };

    this.onPressAddAddress = this.onPressAddAddress.bind(this);

    this.patientsStreetRef = React.createRef();
    this.patientsCityRef = React.createRef();
    this.patientsProvinceRef = React.createRef();
    this.patientsPostalCodeRef = React.createRef();
    
    this.patientsFirstNameRef = React.createRef();
    this.patientsLastNameRef = React.createRef();

    this.nextKeyboardPatientsStreet = this.nextKeyboardPatientsStreet.bind(this);
    this.nextKeyboardPatientsCity = this.nextKeyboardPatientsCity.bind(this);
    this.nextKeyboardPatientsProvince = this.nextKeyboardPatientsProvince.bind(this);
    this.nextKeyboardPatientsPostalCode = this.nextKeyboardPatientsPostalCode.bind(this);

    this.nextKeyboardPatientsStreetChoice = this.nextKeyboardPatientsStreetChoice.bind(this);
    this.nextKeyboardPhoneNumberChoice = this.nextKeyboardPhoneNumberChoice.bind(this);

    this.nextKeyboardPatientsFirstName = this.nextKeyboardPatientsFirstName.bind(this);
    this.nextKeyboardPatientsLastName = this.nextKeyboardPatientsLastName.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   ////this.mixpanel.track('View Modal Address');
  }

  onPressClose = () => {
    const { navigation } = this.props;

    navigation.pop();
  };

  async onPressAddAddress() {
    const { navigation, actions } = this.props;
    const {
      pageType,
      addressType,
      nickname,
      firstName,
      lastName,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber
    } = this.state;

    if (nickname === '') {
      actions.setAlert('Please enter a nickname for this address.');
      return;
    }

    if (addressType !== 'condensed' && firstName === '') {
      actions.setAlert('Please enter a first name.');
      return;
    }

    if (addressType !== 'condensed' && lastName === '') {
      actions.setAlert('Please enter a last name.');
      return;
    }

    if (street === '') {
      actions.setAlert('Please enter your street number and name.');
      return;
    }

    if (city === '') {
      actions.setAlert('Please enter your city.');
      return;
    }

    if (province === '') {
      actions.setAlert('Please select your province.');
      return;
    }

    if (validatePostalCode(postalCode)) {
      actions.setAlert('Be sure to enter a valid postal code.');
      return;
    } else if (postalCode.length < 6) {
      actions.setAlert('Be sure your postal code is 6 characters.');
      return;
    }

    if (addressType !== 'condensed' && phoneNumber === '') {
      actions.setAlert('Please enter a phone number.');
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.addCustomAddress({
      addressType,
      nickname,
      firstName,
      lastName,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber
    })
      .promise.then(async result => {
        const addressId = result.data.address;

        this.setState({ actionLoading: false });

        actions.addCustomAddress({addressId, addressType, nickname, firstName, lastName, street, city, province, postalCode, phoneNumber, additionalPhoneNumber});

        if (pageType === 'pickup') {
          actions.setSelectedPickup(addressId);
        } else {
          actions.setSelectedDropOff(addressId);
        }

        const callback = _.get(navigation, 'state.params.callback', null);

        callback({addressId});

        navigation.goBack();
      })
      .catch(error => {
        console.log('addCustomAddress error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardPatientsStreet() {
    this.patientsStreetRef.current.focus();
  }

  nextKeyboardPatientsStreetChoice() {
    const { addressType } = this.state;

    const condensed = addressType === 'condensed' ? true : false;

    if (condensed) {
      this.patientsStreetRef.current.focus();
    } else {
      this.patientsFirstNameRef.current.focus();
    }
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

  nextKeyboardPhoneNumberChoice() {
    const { addressType } = this.state;

    const condensed = addressType === 'condensed' ? true : false;

    if (condensed) {
      this.onPressAddAddress();
    }
  }

  render() {
    const { auth } = this.props;
    const {
      addressType,
      nickname,
      firstName,
      lastName,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      actionLoading
    } = this.state;

    const title = 'Add Address';
    const labelButtonAdd = 'Add Address';

    const showField = addressType !== 'condensed' ? true : false;

    let postalCodeReturnKeyType;
    if (!showField) {
      postalCodeReturnKeyType = 'done';
    } else {
      postalCodeReturnKeyType = 'next';
    }

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title={title} onPressClose={this.onPressClose} />
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
              maxLength={64}
              numberOfLines={1}
              returnKeyType="next"
              label="Address Nickname"
              value={nickname}
              onChangeText={text => this.setState({ nickname: text })}
              onSubmitEditing={this.nextKeyboardPatientsStreetChoice}
            />

            {showField ? (
              <>
                <InputWithLabel
                  onRef={this.patientsFirstNameRef}
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
                  label="First Name"
                  value={firstName}
                  onChangeText={text => this.setState({ firstName: text })}
                  onSubmitEditing={this.nextKeyboardPatientsLastName}
                />

                <InputWithLabel
                  onRef={this.patientsLastNameRef}
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
                  label="Last Name"
                  value={lastName}
                  onChangeText={text => this.setState({ lastName: text })}
                  onSubmitEditing={this.nextKeyboardPatientsStreet}
                />
              </>
            ) : null}

            <InputWithLabel
              onRef={this.patientsStreetRef}
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
              label="Street"
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
              returnKeyType="next"
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
              onDonePress={this.nextKeyboardPatientsPostalCode}
              onValueChange={text => this.setState({ province: text })}
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
              maxLength={6}
              numberOfLines={1}
              label="Postal Code"
              value={postalCode}
              returnKeyType={postalCodeReturnKeyType}
              onChangeText={text =>
                this.setState({ postalCode: text.toUpperCase() })
              }
              onSubmitEditing={this.nextKeyboardPhoneNumberChoice}
            />

            {showField ? (
              <>
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
                  returnKeyType="next"
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
                  onSubmitEditing={this.onPressAddAddress}
                />
              </>
            ) : null}
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressAddAddress}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>{labelButtonAdd}</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions,
      ...TransportationActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientModalAddress);

