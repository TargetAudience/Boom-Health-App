import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText,
  ScreenWrapper
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import { validateInputLetters, validatePostalCode } from '@utils/Globals';
import styles from './PatientInformation.styles';

import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

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

class PatientInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromPage: props.navigation.getParam('fromPage', null),
      actionLoading: false,
      patientsFirstName: '',
      patientsLastName: '',
      patientsStreet: '',
      patientsCity: '',
      patientsProvince: '',
      patientsPostalCode: '',
      patientsPhoneNumber: '',
      patientsAdditionalPhoneNumber: ''
    };

    this.onPressUpdate = this.onPressUpdate.bind(this);

    this.patientsStreetRef = React.createRef();
    this.patientsCityRef = React.createRef();
    this.patientsProvinceRef = React.createRef();
    this.patientsPostalCodeRef = React.createRef();
    this.patientsLastNameRef = React.createRef();

    this.nextKeyboardPatientsStreet = this.nextKeyboardPatientsStreet.bind(this);
    this.nextKeyboardPatientsCity = this.nextKeyboardPatientsCity.bind(this);
    this.nextKeyboardPatientsProvince = this.nextKeyboardPatientsProvince.bind(this);
    this.nextKeyboardPatientsPostalCode = this.nextKeyboardPatientsPostalCode.bind(this);

    this.nextKeyboardPatientsLastName = this.nextKeyboardPatientsLastName.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();

    //this.mixpanel.track('View Settings Patient Information');
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    ProfileApi.getPatientInformation()
      .promise.then(result => {
        const data = result.data;

        const patientInfo = data.patientInfo;

        this.setState({  
          actionLoading: false,
          patientsFirstName: patientInfo['patientsFirstName'],
          patientsLastName: patientInfo['patientsLastName'],
          patientsStreet: patientInfo['patientsStreet'],
          patientsCity: patientInfo['patientsCity'],
          patientsProvince: patientInfo['patientsProvince'],
          patientsPostalCode: patientInfo['patientsPostalCode'],
          patientsPhoneNumber: patientInfo['patientsPhoneNumber'],
          patientsAdditionalPhoneNumber: patientInfo['patientsAdditionalPhoneNumber']
        });

        actions.setProfilePatient({
          patientsFirstName: patientInfo['patientsFirstName'],
          patientsLastName: patientInfo['patientsLastName'],
          patientsStreet: patientInfo['patientsStreet'],
          patientsCity: patientInfo['patientsCity'],
          patientsProvince: patientInfo['patientsProvince'],
          patientsPostalCode: patientInfo['patientsPostalCode'],
          patientsPhoneNumber: patientInfo['patientsPhoneNumber'],
          patientsAdditionalPhoneNumber: patientInfo['patientsAdditionalPhoneNumber']
        });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  async onPressUpdate() {
    const { actions } = this.props;
    const {
      fromPage,
      patientsFirstName,
      patientsLastName,
      patientsStreet,
      patientsCity,
      patientsProvince,
      patientsPostalCode,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber
    } = this.state;

    if (_.isEmpty(patientsFirstName)) {
      actions.setAlert('Please enter the first name.');
      return;
    } else if (patientsFirstName.length < 2) {
      actions.setAlert('Be sure the first name is at least 2 characters.');
      return;
    } else if (validateInputLetters(patientsFirstName)) {
      actions.setAlert('First name can only contain letters and dashes.');
      return;
    }

    if (_.isEmpty(patientsLastName)) {
      actions.setAlert('Please enter the last name.');
      return;
    } else if (patientsLastName.length < 2) {
      actions.setAlert('Be sure the last name is at least 2 characters.');
      return;
    } else if (validateInputLetters(patientsLastName)) {
      actions.setAlert('Last name can only contain letters and dashes.');
      return;
    }

    if (_.isEmpty(patientsStreet)) {
      actions.setAlert('Please enter the street number and name.');
      return;
    }

    if (_.isEmpty(patientsCity)) {
      actions.setAlert('Please enter the city.');
      return;
    }

    if (_.isEmpty(patientsProvince)) {
      actions.setAlert('Please select the province.');
      return;
    }

    if (validatePostalCode(patientsPostalCode)) {
      actions.setAlert('Be sure to enter a valid postal code.');
      return;
    } else if (patientsPostalCode.length < 6) {
      actions.setAlert('Be sure the postal code is 6 characters.');
      return;
    }

    if (_.isEmpty(patientsPhoneNumber)) {
      actions.setAlert('Please enter a phone number.');
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.updatePatientInformation({
      patientsFirstName,
      patientsLastName,
      patientsStreet,
      patientsCity,
      patientsProvince,
      patientsPostalCode,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber
    })
      .promise.then(async result => {
        this.setState({ actionLoading: false });

        actions.setProfilePatient({
          patientsFirstName,
          patientsLastName,
          patientsStreet,
          patientsCity,
          patientsProvince,
          patientsPostalCode,
          patientsPhoneNumber,
          patientsAdditionalPhoneNumber
        });
        
        if (fromPage === 'checkout' || fromPage === 'transportation') {
          this.onPressBack();
        } else {
          actions.setAlert('Patient information has been updated.');
        }
      })
      .catch(error => {
        console.log('Patient information error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardPatientsLastName() {
    this.patientsLastNameRef.current.focus();
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

  render() {
    const {
      fromPage,
      patientsFirstName,
      patientsLastName,
      patientsStreet,
      patientsCity,
      patientsProvince,
      patientsPostalCode,
      patientsPhoneNumber,
      patientsAdditionalPhoneNumber,
      actionLoading
    } = this.state;

    const pressBack = (fromPage === 'checkout' || fromPage === 'transportation') ? null : this.onPressBack;
    const pressClose = (fromPage === 'checkout' || fromPage === 'transportation') ? this.onPressBack : null;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="Patient Information" onPressBack={pressBack} onPressClose={pressClose} />
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
              label="First Name"
              value={patientsFirstName}
              onChangeText={text => this.setState({ patientsFirstName: text })}
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
              maxLength={32}
              numberOfLines={1}
              label="Last Name"
              value={patientsLastName}
              onChangeText={text => this.setState({ patientsLastName: text })}
              onSubmitEditing={this.nextKeyboardPatientsStreet}
            />
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Patient Address</AppText>
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
              label="Street (inc. house or apt. number)"
              value={patientsStreet}
              onChangeText={text => this.setState({ patientsStreet: text })}
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
              value={patientsCity}
              onChangeText={text => this.setState({ patientsCity: text })}
              onSubmitEditing={this.nextKeyboardPatientsProvince}
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
              label="Province"
              onValueChange={text => this.setState({ patientsProvince: text })}
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
              maxLength={6}
              numberOfLines={1}
              returnKeyType="next"
              label="Postal Code"
              value={patientsPostalCode}
              onChangeText={text =>
                this.setState({ patientsPostalCode: text.toUpperCase() })
              }
            />
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textSubTitle, FormStyles.groupGapTop]}>Patient Contact Info</AppText>
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
              value={patientsPhoneNumber}
              onChangeText={text => this.setState({ patientsPhoneNumber: text })}
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
              value={patientsAdditionalPhoneNumber}
              onChangeText={text =>
                this.setState({ patientsAdditionalPhoneNumber: text })
              }
              onSubmitEditing={this.onPressUpdate}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressUpdate}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Update Patient Information</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

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
  mapStateToProps,
  mapDispatchToProps
)(PatientInformation);
