import React, {Component} from 'react';
import {View, Dimensions, Platform, Fragment, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  AppButton,
  Addresses,
  AppText,
} from '@components/common';
import {chooseCorrectAddress, strNotNull} from '@utils/Globals';
import {Colors, Globals} from '@constants/GlobalStyles';
import styles from './PatientBookCaregiversCheckout.styles';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientBookCaregiversCheckout extends Component {
  constructor(props) {
    super(props);

    const patientAddress = {
      name: `${props.patientAddress.patientsFirstName} ${props.patientAddress.patientsLastName}`,
      street: props.patientAddress.patientsStreet,
      city: props.patientAddress.patientsCity,
      province: props.patientAddress.patientsProvince,
      postalCode: props.patientAddress.patientsPostalCode,
      phoneNumber: props.patientAddress.patientsPhoneNumber,
    };

    const myAddress = {
      name: `${props.auth.firstName} ${props.auth.lastName}`,
      street: props.myAddress.street,
      city: props.myAddress.city,
      province: props.myAddress.province,
      postalCode: props.myAddress.postalCode,
      phoneNumber: props.myAddress.phoneNumber,
    };

    let selected = 'myself';
    if (
      props.auth.subRole === 'lovedOne' ||
      props.auth.subRole === 'familyMember'
    ) {
      selected = 'patient';
    }

    this.state = {
      services: props.navigation.getParam('services', []),
      caregiverTimes: props.navigation.getParam('caregiverTimes', []),
      actionLoading: false,
      selectedAddress: selected,
      patientAddress,
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Book Caregivers Checkout');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.patientAddressProps !== this.props.patientAddress) {
      const patientAddress = {
        name: `${this.props.patientAddress.patientsFirstName} ${this.props.patientAddress.patientsLastName}`,
        street: this.props.patientAddress.patientsStreet,
        city: this.props.patientAddress.patientsCity,
        province: this.props.patientAddress.patientsProvince,
        postalCode: this.props.patientAddress.patientsPostalCode,
        phoneNumber: this.props.patientAddress.patientsPhoneNumber,
      };
      this.setState({
        patientAddress,
        patientAddressProps: this.props.patientAddress,
      });
    }
    if (prevState.myAddressProps !== this.props.myAddress) {
      const myAddress = {
        name: `${this.props.auth.firstName} ${this.props.auth.lastName}`,
        street: this.props.myAddress.street,
        city: this.props.myAddress.city,
        province: this.props.myAddress.province,
        postalCode: this.props.myAddress.postalCode,
        phoneNumber: this.props.myAddress.phoneNumber,
      };
      this.setState({myAddress, myAddressProps: this.props.myAddress});
    }
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressPayment = () => {
    const {navigation, actions, customAddresses} = this.props;
    const {
      patientAddress,
      myAddress,
      selectedAddress,
      services,
      caregiverTimes,
    } = this.state;

    const addressDisplayArr = chooseCorrectAddress(
      selectedAddress,
      patientAddress,
      myAddress,
      customAddresses,
    );

    if (
      !strNotNull(addressDisplayArr.street) ||
      !strNotNull(addressDisplayArr.city) ||
      !strNotNull(addressDisplayArr.province) ||
      !strNotNull(addressDisplayArr.postalCode) ||
      !strNotNull(addressDisplayArr.phoneNumber)
    ) {
      actions.setAlert(
        'Please be sure the delivery address you selected has the street, city, province, postal code, and phone number filled in.',
        'mediumDuration',
      );
      return;
    }

    navigation.navigate('PatientBookCaregiversPayment', {
      services,
      selectedAddress,
      addressDisplayArr,
      caregiverTimes,
    });
  };

  selectedAddressCallback = value => {
    this.setState({selectedAddress: value});
  };

  handleNote = note => {
    this.setState({note});
  };

  render() {
    const {actions, auth, navigation, customAddresses} = this.props;
    const {selectedAddress, patientAddress, myAddress} = this.state;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <CustomHeaderBack
                title="Checkout"
                onPressBack={this.onPressBack}
              />
              <KeyboardAwareScrollView
                extraScrollHeight={60}
                enableResetScrollToCoords={false}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                style={styles.scrollView}>
                <View style={styles.summaryContainer}>
                  <View style={styles.summaryBottomLine}>
                    <AppText textWeight="600" style={styles.textCostSummary}>
                      Where would you like the caregiver to go?
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

                <View style={styles.buttonContainer}>
                  <AppButton
                    onPress={this.onPressPayment}
                    width={width - 20}
                    height={42}
                    backgroundColor={Colors.buttonMain}
                    disabled={false}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.buttonText}>
                      CONTINUE TO PAYMENT
                    </AppText>
                  </AppButton>
                </View>
              </KeyboardAwareScrollView>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.mainBackground}}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  auth: state.auth,
  cartItems: state.homePersonalCare.cartItems,
  cart: state.homePersonalCare.cart,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBookCaregiversCheckout);
