import React, { Component } from 'react';
import { View, ScrollView, Platform, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppText, CustomHeaderBack, AppButton, Addresses, CheckmarkToggle } from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import { Colors, Globals } from '@constants/GlobalStyles';
import styles from './PatientSeniorProtectionPackages.styles';
import {
  chooseCorrectAddress,
  strNotNull,
} from '@utils/Globals';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const { width } = Dimensions.get('screen');

const quarterlyData = {
  device: '$99.00',
  packagePrice: '$199.97',
  totalPrice: '$298.97'
};
const yearlyData = {
  device: '$99.00',
  packagePrice: '$551.88',
  totalPrice: '$650.88'
};

class PatientSeniorProtectionPackages extends Component {
  constructor(props) {
    super(props);

    const patientAddress = {
      name: `${props.patientAddress.patientsFirstName} ${props.patientAddress.patientsLastName}`,
      street: props.patientAddress.patientsStreet,
      city: props.patientAddress.patientsCity,
      province: props.patientAddress.patientsProvince,
      postalCode: props.patientAddress.patientsPostalCode,
      phoneNumber: props.patientAddress.patientsPhoneNumber
    };

    const myAddress = {
      name: `${props.auth.firstName} ${props.auth.lastName}`,
      street: props.myAddress.street,
      city: props.myAddress.city,
      province: props.myAddress.province,
      postalCode: props.myAddress.postalCode,
      phoneNumber: props.myAddress.phoneNumber
    };

    let selected = 'myself';
    if (props.auth.subRole === 'lovedOne' || props.auth.subRole === 'familyMember') {
      selected = 'patient';
    }

    this.state = {
      note: '',
      actionLoading: false,
      selectedAddress: selected,
      patientAddress,
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
      selectedPackage: { name: 'quarterly',  months: '3', data: quarterlyData }
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const { settings } = this.props;

    analytics().logScreenView({
      screen_name: 'patient_senior_protection_packages',
      screen_class: 'patient_senior_protection_packages'
    });

    //this.mixpanel.track('View Senior Protection Packages');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.patientAddressProps !== this.props.patientAddress) {
      const patientAddress = {
        name: `${this.props.patientAddress.patientsFirstName} ${this.props.patientAddress.patientsLastName}`,
        street: this.props.patientAddress.patientsStreet,
        city: this.props.patientAddress.patientsCity,
        province: this.props.patientAddress.patientsProvince,
        postalCode: this.props.patientAddress.patientsPostalCode,
        phoneNumber: this.props.patientAddress.patientsPhoneNumber
      };
      this.setState({
        patientAddress,
        patientAddressProps: this.props.patientAddress
      });
    }
    if (prevState.myAddressProps !== this.props.myAddress) {
      const myAddress = {
        name: `${this.props.auth.firstName} ${this.props.auth.lastName}`,
        street: this.props.myAddress.street,
        city: this.props.myAddress.city,
        province: this.props.myAddress.province,
        postalCode: this.props.myAddress.postalCode,
        phoneNumber: this.props.myAddress.phoneNumber
      };
      this.setState({ myAddress, myAddressProps: this.props.myAddress });
    }
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressPayment = () => {
    const { navigation, actions, customAddresses, subRole } = this.props;
    const { patientAddress, myAddress, selectedAddress, selectedPackage } = this.state;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    const addressDisplayArr = chooseCorrectAddress(selectedAddress, patientAddress, myAddress, customAddresses);

    if (
      !strNotNull(addressDisplayArr.street) ||
      !strNotNull(addressDisplayArr.city) ||
      !strNotNull(addressDisplayArr.province) ||
      !strNotNull(addressDisplayArr.postalCode) ||
      !strNotNull(addressDisplayArr.phoneNumber)
    ) {
      actions.setAlert(
        'Please be sure the delivery address you selected has the street, city, province, postal code, and phone number filled in.',
        'mediumDuration'
      );
      return;
    }

    navigation.navigate('PatientSeniorProtectionPayment', {
      selectedAddress,
      addressDisplayArr,
      selectedPackage
    });
  };

  selectedAddressCallback = value => {
    this.setState({ selectedAddress: value });
  };

  handleNote = note => {
    this.setState({ note });
  };

  onPressSelectPackage = item => {
    this.setState({ selectedPackage: item });
  };

  render() {
    const { actions, auth, navigation, customAddresses } = this.props;
    const { note, selectedAddress, patientAddress, myAddress, selectedPackage } = this.state;

    const charactersRemaining = 250 - note.length;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title="Checkout" onPressBack={this.onPressBack} />
        <ScrollView
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          style={styles.scrollView}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBottomLine}>
              <AppText textWeight="600" style={styles.textCostSummary}>
                Shipping Address
              </AppText>
            </View>
            <Addresses
              navigation={navigation}
              actions={actions}
              subRole={auth.subRole}
              patientAddress={patientAddress}
              myAddress={myAddress}
              customAddresses={customAddresses}
              selectedAddressCallback={this.selectedAddressCallback}
              selected={selectedAddress}
              fromPage="checkout"
              pageType="null"
              addressType="standard"
            />
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryBottomLine}>
              <AppText textWeight="600" style={styles.textCostSummary}>
                Select a Package
              </AppText>
            </View>
          </View>

          <Entry
            text="Quarterly"
            data={quarterlyData}
            checked={selectedPackage.name === 'quarterly'}
            onPress={() => this.onPressSelectPackage({ name: 'quarterly', months: '3', data: quarterlyData })}
          />
          <Entry
            text="Yearly"
            data={yearlyData}
            checked={selectedPackage.name === 'yearly'}
            onPress={() => this.onPressSelectPackage({ name: 'yearly', months: '12', data: yearlyData })}
          />

          <View style={styles.buttonContainer}>
            <AppButton
              onPress={this.onPressPayment}
              width={width - 20}
              height={42}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonText}>
                CONTINUE TO PAYMENT
              </AppText>
            </AppButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const Entry = ({ data, text, checked, onPress }) => (
  <TouchableHighlight onPress={onPress} activeOpacity={1} underlayColor={Colors.white}>
    <View style={[styles.rowContainer, checked ? styles.pink : styles.grey]}>
      <View style={styles.rowInner}>
        <CheckmarkToggle checked={checked} onPress={onPress} />
        <View style={styles.contentContainer}>
          <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.planTextHeading}>
            {text} Payment
          </AppText>
          <View style={styles.rowPayment}>
            <AppText textWeight="300" style={styles.planText}>
              Device
            </AppText>
            <AppText textWeight="500" style={styles.planTextNumber}>
              {data.device}
            </AppText>
          </View>
          <View style={styles.rowPayment}>
            <AppText textWeight="300" style={styles.planText}>
              {text} Monitoring
            </AppText>
            <AppText textWeight="500" style={styles.planTextNumber}>
              {data.packagePrice}
            </AppText>
          </View>
          <View style={[styles.rowPayment, styles.topLine, checked ? styles.pinkLine : styles.greyLine]}>
            <AppText textWeight="300" style={styles.planText}>
              Total Device & Service
            </AppText>
            <AppText textWeight="500" style={styles.planTextNumber}>
              {data.totalPrice}
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.bulletContainer}>
        <AppText textWeight="400" style={styles.planBulletText}>
          {'\u2022'} $0 Shipping
        </AppText>
        <AppText textWeight="400" style={styles.planBulletText}>
          {'\u2022'} $0 Setup Fees
        </AppText>
        <AppText textWeight="400" style={styles.planBulletText}>
          {'\u2022'} Free Fall Detection
        </AppText>
      </View>
    </View>
  </TouchableHighlight>
);

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
  auth: state.auth,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses,
  subRole: state.auth.subRole,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientSeniorProtectionPackages);
