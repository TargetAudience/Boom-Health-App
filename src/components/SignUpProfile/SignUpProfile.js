import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import creditCardType from 'credit-card-type';
import CheckBox from '../../../src/@crazycodeboy/react-native-check-box';


import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  CreditCardInput,
  ButtonLoading,
  AppButton,
  AppText
} from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import {
  validatePostalCode,
  onlyNumbers,
  prettyCardNumber,
  extractCardType,
  uuidv4
} from '@utils/Globals';
import styles from './SignUpProfile.styles';
import images from '@assets/images';

import ProfileApi from '@api/profileApi';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

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

class SignUpProfile extends Component {
  constructor(props) {
    super(props);

    const flowType = this.props.navigation.getParam('flowType', '');

    this.stateSave = {
      actionLoading: false,
      flowType,
      street: '123 Main St.',
      city: 'Ottawa',
      province: 'ON',
      postalCode: 'K2A1P6',
      phoneNumber: '6135555555',
      additionalPhoneNumber: '6135555555',
      patientsPostalCode: 'L4S2M6',
      patientsProvince: 'ON',
      patientsCity: 'St. Catharines',
      patientsStreet: '123 Front St.',
      patientsFirstName: 'Rob',
      patientsLastName: 'Stevenson',
      patientsPhoneNumber: '9055555555',
      patientsAdditionalPhoneNumber: '9055555555',
      alternateContactName: 'Josh Winter',
      alternateContactNumber: '6135555555',
      cardType: '',
      cvv: '123',
      expiryMonth: '12',
      expiryYear: '21',
      cardNumber: '4000000000000077',
      nameOnCard: 'Josh Winter',
      sameAddressChecked: false
    };

    this.state = {
      actionLoading: false,
      flowType: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      additionalPhoneNumber: '',
      alternateContactName: '',
      alternateContactNumber: '',
      patientsPostalCode: '',
      patientsProvince: '',
      patientsCity: '',
      patientsStreet: '',
      patientsFirstName: '',
      patientsLastName: '',
      patientsPhoneNumber: '',
      patientsAdditionalPhoneNumber: '',
      cardType: '',
      cvv: '',
      expiryMonth: '',
      expiryYear: '',
      cardNumber: '',
      nameOnCard: '',
      sameAddressChecked: false,
      showProvinceModal: false,
    };

    this.onPressSignUp = this.onPressSignUp.bind(this);

    this.nextKeyboardCity = this.nextKeyboardCity.bind(this);
    this.nextKeyboardProvince = this.nextKeyboardProvince.bind(this);
    this.nextKeyboardPostalCode = this.nextKeyboardPostalCode.bind(this);
    this.nextKeyboardPhoneNumber = this.nextKeyboardPhoneNumber.bind(this);
    this.nextKeyboardAdditionalPhoneNumber = this.nextKeyboardAdditionalPhoneNumber.bind(this);
    this.nextKeyboardAlternateContactName = this.nextKeyboardAlternateContactName.bind(this);
    this.nextKeyboardAlternateContactNumber = this.nextKeyboardAlternateContactNumber.bind(this);
    
    this.nextKeyboardNameOnCard = this.nextKeyboardNameOnCard.bind(this);
    this.nextKeyboardCardNumber = this.nextKeyboardCardNumber.bind(this);
    this.nextKeyboardExpiryMonth = this.nextKeyboardExpiryMonth.bind(this);
    this.nextKeyboardExpiryYear = this.nextKeyboardExpiryYear.bind(this);
    this.nextKeyboardCvv = this.nextKeyboardCvv.bind(this);

    this.cityRef = React.createRef();
    this.provinceRef = React.createRef();
    this.postalCodeRef = React.createRef();
    this.phoneNumberRef = React.createRef();
    this.additionalPhoneNumberRef = React.createRef();
    this.alternateContactNameRef = React.createRef();
    this.alternateContactNumberRef = React.createRef();

    this.nameOnCardRef = React.createRef();
    this.creditCardNumberRef = React.createRef();
    this.expiryMonthRef = React.createRef();
    this.expiryYearRef = React.createRef();
    this.cvvRef = React.createRef();

    this.patientsStreetRef = React.createRef();
    this.patientsCityRef = React.createRef();
    this.patientsProvinceRef = React.createRef();
    this.patientsPostalCodeRef = React.createRef();
    this.patientsFirstNameRef = React.createRef();
    this.patientsLastNameRef = React.createRef();
    this.patientsPhoneNumberRef = React.createRef();
    this.patientsAdditionalPhoneNumberRef = React.createRef();

    this.nextKeyboardPatientsStreet = this.nextKeyboardPatientsStreet.bind(this);
    this.nextKeyboardPatientsCity = this.nextKeyboardPatientsCity.bind(this);
    this.nextKeyboardPatientsProvince = this.nextKeyboardPatientsProvince.bind(this);
    this.nextKeyboardPatientsPostalCode = this.nextKeyboardPatientsPostalCode.bind(this);
    this.nextKeyboardPatientsFirstName = this.nextKeyboardPatientsFirstName.bind(this);
    this.nextKeyboardPatientsLastName = this.nextKeyboardPatientsLastName.bind(this);
    this.nextKeyboardPatientsPhoneNumber = this.nextKeyboardPatientsPhoneNumber.bind(this);
    this.nextKeyboardPatientsAdditionalPhoneNumber = this.nextKeyboardPatientsAdditionalPhoneNumber.bind(this);
  
    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {
      actions,
      navigation: {
        state: {
          params: { city, province, postalCode }
        }
      }
    } = this.props;
    const {
      postalCode: statePostalCode,
      province: stateProvince,
      city: stateCity
    } = this.state;

    const flowType = this.props.navigation.getParam('flowType', '');

    const newPostalCode = flowType === 'Myself' ? postalCode : statePostalCode;
    const newProvince = flowType === 'Myself' ? province : stateProvince;
    const newCity = flowType === 'Myself' ? city : stateCity;

    this.setState({
      flowType,
      city: newCity,
      province: newProvince,
      postalCode: newPostalCode,
    });

    actions.clearTempInvites();

    //this.mixpanel.track('View Sign Up Profile');
  }

  async onPressSignUp() {
    const { navigation, actions, tempInvites, auth } = this.props;
    const {
      flowType,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      alternateContactName,
      alternateContactNumber,
      sameAddressChecked,
      patientsPostalCode,
      patientsProvince,
      patientsCity,
      patientsStreet,
      patientsFirstName,
      patientsLastName,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber,
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      nameOnCard,
      cardNumber
    } = this.state;

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

    if (nameOnCard === '') {
      actions.setAlert('Please enter the name on your credit card.');
      return;
    }

    if (expiryMonth === '') {
      actions.setAlert('Please enter your credit card expiry month.');
      return;
    }

    if (expiryYear === '') {
      actions.setAlert('Please enter your credit card expiry year.');
      return;
    }

    if (cardNumber === '') {
      actions.setAlert('Please enter your credit card number.');
      return;
    }

    if (cvv === '') {
      actions.setAlert('Please enter your credit card cvc.');
      return;
    }

    this.setState({ actionLoading: true });

    const cardUuid = uuidv4();

    await ProfileApi.updateRegister({
      flowType,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      alternateContactName,
      alternateContactNumber,
      sameAddressChecked,
      patientsPostalCode,
      patientsProvince,
      patientsCity,
      patientsStreet,
      patientsFirstName,
      patientsLastName,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber,
      cardUuid,
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard,
      tempInvites
    })
      .promise.then(async result => {
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

        let patientsStreetInsert = '';
        let patientsCityInsert = '';
        let patientsProvinceInsert = '';
        let patientsPostalCodeInsert = '';
        if (sameAddressChecked) {
          patientsStreetInsert = street;
          patientsCityInsert = city;
          patientsProvinceInsert = province;
          patientsPostalCodeInsert = postalCode;
        } else {
          patientsStreetInsert = patientsStreet;
          patientsCityInsert = patientsCity;
          patientsProvinceInsert = patientsProvince;
          patientsPostalCodeInsert = patientsPostalCode;
        }

        actions.setProfilePatient({
          patientsPostalCode: patientsPostalCodeInsert,
          patientsProvince: patientsProvinceInsert,
          patientsCity: patientsCityInsert,
          patientsStreet: patientsStreetInsert,
          patientsFirstName,
          patientsLastName,
          patientsPhoneNumber,
          patientsAdditionalPhoneNumber
        });

        this.setState({ actionLoading: false });

        const lastFour = cardNumber.substr(cardNumber.length - 4);

        actions.addCard({
          cardUuid,
          cardType,
          expiryMonth,
          expiryYear,
          last4: lastFour,
          isDefault: 1
        })

        actions.clearTempInvites();

        navigation.dispatch(
          NavigationActions.navigate({
            routeName: 'PostAuthFlowPatient',
            action: NavigationActions.navigate('PatientHome')
          })
        );
      })
      .catch(error => {
        console.log('servicesCheck error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  toggleSameAddressChecked = () => {
    const { sameAddressChecked } = this.state;

    this.setState({ sameAddressChecked: !sameAddressChecked });
  };

  onPressRemoveInvitePerson = item => {
    const { actions } = this.props;

    actions.removeTempInvite(item.personId);
  };

  onPressInviteFamilyMember = () => {
    const { navigation } = this.props;

    navigation.navigate('SignUpInvite');
  };

  nextKeyboardCity() {
    this.cityRef.current.focus();
  }

  nextKeyboardProvince() {
    this.provinceRef.togglePicker(true);
  }

  nextKeyboardPostalCode() {
    this.provinceRef.togglePicker(true);
    setTimeout(() => {
      this.postalCodeRef.current.focus();
    }, 200);
  }

  nextKeyboardPhoneNumber() {
    this.phoneNumberRef.focus();
  }

  nextKeyboardAdditionalPhoneNumber() {
    this.additionalPhoneNumberRef.focus();
  }

  nextKeyboardAlternateContactName() {
    this.alternateContactNameRef.current.focus();
  }

  nextKeyboardAlternateContactNumber() {
    this.alternateContactNumberRef.focus();
  }

  nextKeyboardNameOnCard() {
    this.nameOnCardRef.current.focus();
  }

  nextKeyboardCardNumber() {
    this.creditCardNumberRef.current.focus();
  }

  nextKeyboardExpiryMonth() {
    this.expiryMonthRef.current.focus();
  }

  nextKeyboardExpiryYear() {
    this.expiryYearRef.current.focus();
  }

  nextKeyboardCvv() {
    this.cvvRef.current.focus();
  }

  nextKeyboardPatientsStreet() {
    this.patientsStreetRef.current.focus();
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

  nextKeyboardPatientsPhoneNumber() {
    this.patientsPhoneNumberRef.focus();
  }

  nextKeyboardPatientsAdditionalPhoneNumber() {
    this.patientsAdditionalPhoneNumberRef.focus();
  }


  renderFamilyMember(data, index) {
    const addGapTop = index !== 0 ? styles.inviteGapTop : null;
    const checkedAdmin = data.checkedAdmin ? 'Admin' : '';
    const checkedChats = data.checkedChats ? 'Chats' : '';
    const checkedGroupPurchases = data.checkedGroupPurchases
      ? 'Group Purchases'
      : '';
    const roles = [checkedAdmin, checkedChats, checkedGroupPurchases];
    const rolesString = roles.filter(item => item).join(', ');

    const showRoles = checkedAdmin || checkedChats || checkedGroupPurchases;

    return (
      <View key={data.personId} style={[styles.inviteContainer, addGapTop]}>
        <View>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textInviteName}>{data.firstName} {data.lastName}</AppText>

          {showRoles ? (
            <AppText textWeight="400" style={styles.textInviteRoles}>{rolesString}</AppText>
          ) : null}
          <AppText textWeight="400" style={styles.textInviteEmail}>{data.emailAddress}</AppText>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.onPressRemoveInvitePerson(data)} activeOpacity={0.8}>
            <Image style={styles.imageRemoveInvite} source={images.cancelIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderInvites() {
    const { tempInvites } = this.props;

    return (
      <>
        <FormWrapper>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Invite Other Family Members</AppText>
        </FormWrapper>

        {tempInvites.length ? (
          <View style={styles.invitesWrap}>
              {tempInvites.map((data, index) => {
                return this.renderFamilyMember(data, index);
              })}
          </View>
        ) : null}

        <FormWrapper>
          <AppButton
            onPress={this.onPressInviteFamilyMember}
            width={176}
            height={30}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>Invite a Family Member</AppText>
          </AppButton>
        </FormWrapper>
      </>
    )
  }

  renderPatientsAddress() {
    const {
      sameAddressChecked,
      patientsPostalCode,
      patientsProvince,
      patientsCity,
      patientsStreet,
      patientsFirstName,
      patientsLastName,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber,
    } = this.state;

    return (
      <>
        <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Patient's Address</AppText>

        <CheckBox
          style={styles.checkbox}
          onClick={this.toggleSameAddressChecked}
          isChecked={sameAddressChecked}
          rightText="Same as My Address above"
          rightTextStyle={{ fontFamily: 'SFProText-Regular' }}
          checkBoxColor={Colors.highlight}
        />

        {!sameAddressChecked ? (
          <>
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
              label="Patient's Street (inc. house or apt. number)"
              value={patientsStreet}
              onSubmitEditing={this.nextKeyboardPatientsCity}
              onChangeText={text => this.setState({ patientsStreet: text })}
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
              returnKeyType="next"
              label="Patient's City"
              value={patientsCity}
              onSubmitEditing={this.nextKeyboardPatientsProvince}
              onChangeText={text =>
                this.setState({ patientsCity: text })
              }
            />
            <InputWithLabel
              onRef={ref => { this.patientsProvinceRef = ref }}
              select
              items={provinces}
              selectValue={patientsProvince}
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
              label="Patient's Province"
              onDonePress={this.nextKeyboardPatientsPostalCode}
              onValueChange={text => this.setState({ patientsProvince: text })}
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
              label="Patient's Postal Code"
              value={patientsPostalCode}
              onSubmitEditing={this.nextKeyboardPatientsFirstName}
              onChangeText={text =>
                this.setState({ patientsPostalCode: text.toUpperCase() })
              }
            />
          </>
        ) : null}
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
          maxLength={32}
          numberOfLines={1}
          returnKeyType="next"
          label="Patient's First Name"
          value={patientsFirstName}
          onSubmitEditing={this.nextKeyboardPatientsLastName}
          onChangeText={text => this.setState({ patientsFirstName: text })}
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
          maxLength={32}
          numberOfLines={1}
          returnKeyType="next"
          label="Patient's Last Name"
          value={patientsLastName}
          onSubmitEditing={this.nextKeyboardPatientsPhoneNumber}
          onChangeText={text => this.setState({ patientsLastName: text })}
        />
        <InputWithLabel
          refInput={ref => { this.patientsPhoneNumberRef = ref }}
          containerStyle={[
            FormStyles.inputContainer,
            FormStyles.inputContainerLabel
          ]}
          mask={'[000] [000]-[0000]'}
          style={FormStyles.inputStyle}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          maxLength={12}
          numberOfLines={1}
          returnKeyType="done"
          keyboardType="numeric"
          label="Patient's Phone Number"
          value={patientsPhoneNumber}
          onSubmitEditing={this.nextKeyboardPatientsAdditionalPhoneNumber}
          onChangeText={text => this.setState({ patientsPhoneNumber: text })}
        />
        <InputWithLabel
          refInput={ref => { this.patientsAdditionalPhoneNumberRef = ref }}
          containerStyle={[
            FormStyles.inputContainer,
            FormStyles.inputContainerLabel
          ]}
          mask={'[000] [000]-[0000]'}
          style={FormStyles.inputStyle}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          maxLength={12}
          numberOfLines={1}
          returnKeyType="done"
          keyboardType="numeric"
          label="Patient's Additional Phone Number"
          value={patientsAdditionalPhoneNumber}
          onSubmitEditing={this.nextKeyboardNameOnCard}
          onChangeText={text =>
            this.setState({ patientsAdditionalPhoneNumber: text })
          }
        />
      </>
    );
  }

  render() {
    const {
      flowType,
      street,
      city,
      province,
      postalCode,
      phoneNumber,
      additionalPhoneNumber,
      alternateContactName,
      alternateContactNumber,
      cardType,
      cvv,
      expiryMonth,
      expiryYear,
      cardNumber,
      nameOnCard,
      actionLoading,
      showProvinceModal,
      sameAddressChecked
    } = this.state;

    const showPatient = flowType === 'LovedOne' ? true : false;

    let afterAlternateContactNumber;
    if (flowType === 'Myself') {
      afterAlternateContactNumber = this.nextKeyboardNameOnCard;
    } else {
      if (sameAddressChecked) {
        afterAlternateContactNumber = this.nextKeyboardPatientsFirstName;
      } else {
        afterAlternateContactNumber = this.nextKeyboardPatientsStreet;
      }
    }

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title="My Profile" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textSubTitle}>My Address</AppText>

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
              onSubmitEditing={this.nextKeyboardCity}
            />
            <InputWithLabel
              onRef={this.cityRef}
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
              label="City"
              value={city}
              onChangeText={text => this.setState({ city: text })}
              onSubmitEditing={this.nextKeyboardProvince}
            />
            <InputWithLabel
              onRef={ref => { this.provinceRef = ref }}
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
              onDonePress={this.nextKeyboardPostalCode}
              onValueChange={text => this.setState({ province: text })}
            />
            <InputWithLabel
              onRef={this.postalCodeRef}
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
              onSubmitEditing={this.nextKeyboardPhoneNumber}
              onChangeText={text =>
                this.setState({ postalCode: text.toUpperCase() })
              }
            />

            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Contact Info</AppText>

            <InputWithLabel
              refInput={ref => { this.phoneNumberRef = ref }}
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
              onSubmitEditing={this.nextKeyboardAdditionalPhoneNumber}
              onChangeText={text => this.setState({ phoneNumber: text })}
            />
            <InputWithLabel
              refInput={ref => { this.additionalPhoneNumberRef = ref }}
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
              onSubmitEditing={this.nextKeyboardAlternateContactName}
              onChangeText={text =>
                this.setState({ additionalPhoneNumber: text })
              }
            />

            <AppText textWeight="500" style={[styles.textInstructions, FormStyles.groupGapTop]}>If unavailable, please contact:</AppText>

            <InputWithLabel
              onRef={this.alternateContactNameRef}
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
              label="Alternate Contact Name"
              value={alternateContactName}
              onSubmitEditing={this.nextKeyboardAlternateContactNumber}
              onChangeText={text =>
                this.setState({ alternateContactName: text })
              }
            />
            <InputWithLabel
              refInput={ref => { this.alternateContactNumberRef = ref }}
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
              label="Alternate Contact Number"
              value={alternateContactNumber}
              onSubmitEditing={afterAlternateContactNumber}
              onChangeText={text =>
                this.setState({ alternateContactNumber: text })
              }
            />

            {showPatient ? this.renderPatientsAddress() : null}

            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Payment Info</AppText>

            <InputWithLabel
              onRef={this.nameOnCardRef}
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
              label="Name on Card"
              value={nameOnCard}
              onSubmitEditing={this.nextKeyboardCardNumber}
              onChangeText={text => this.setState({ nameOnCard: text })}
            />
            <CreditCardInput
              onRef={this.creditCardNumberRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              number={cardNumber}
              keyboardType="numeric"
              returnKeyType="done"
              type={cardType}
              onSubmitEditing={this.nextKeyboardExpiryMonth}
              onChangeText={text => {
                const cleanText = onlyNumbers(text);
                let ccType = '';
                if (text) {
                  ccType = extractCardType(creditCardType(cleanText));
                }
                this.setState({
                  cardNumber: prettyCardNumber(cleanText, ccType),
                  cardType: ccType
                });
              }}
            />
            <View style={FormStyles.inputSideBySide}>
              <View
                style={[
                  FormStyles.inputSideBySideInner,
                  FormStyles.sideBySideFirst
                ]}>
                <InputWithLabel
                  onRef={this.expiryMonthRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={2}
                  numberOfLines={1}
                  placeholder="MM"
                  returnKeyType="next"
                  keyboardType="numeric"
                  label="Expiry Month"
                  value={expiryMonth}
                  onChangeText={text => {
                    this.setState({ expiryMonth: onlyNumbers(text) });
                    if (text.length === 2) {
                      this.nextKeyboardExpiryYear();
                    }
                  }}
                />
              </View>
              <View style={FormStyles.inputSideBySideInner}>
                <InputWithLabel
                  onRef={this.expiryYearRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={2}
                  numberOfLines={1}
                  placeholder="YY"
                  keyboardType="number-pad"
                  label="Expiry Year"
                  value={expiryYear}
                  onChangeText={text => {
                    this.setState({ expiryYear: onlyNumbers(text) });
                    if (text.length === 2) {
                      this.nextKeyboardCvv();
                    }
                  }}
                />
              </View>
            </View>
            <InputWithLabel
              onRef={this.cvvRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={4}
              numberOfLines={1}
              returnKeyType="done"
              keyboardType="number-pad"
              label="CVC"
              value={cvv}
              onSubmitEditing={this.onPressSignUp}
              onChangeText={text => {
                this.setState({ cvv: onlyNumbers(text) });
              }}
            />
          </FormWrapper>

          {showPatient ? this.renderInvites() : null}

          <FormWrapper style={styles.bottomGap}>
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressSignUp}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>ADD PROFILE</AppText>
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
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  tempInvites: state.profile.tempInvites,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpProfile);
