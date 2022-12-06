import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ScreenWrapper, Addresses, FormWrapper, InputWithLabel, ButtonLoading, CustomHeaderBack, AppButton, CheckmarkToggle, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import { chooseCorrectAddress, strNotNull } from '@utils/Globals';
import images from '@assets/images';
import styles from './PatientOrderTransportationAddress.styles';

import UserApi from '@api/userApi';
import ProfileApi from '@api/profileApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as ProfileActions from '@ducks/profile';
import * as TransportationActions from '@ducks/transportation';

const { width } = Dimensions.get('screen');

class PatientOrderTransportationAddress extends Component {
  constructor(props) {
    super(props);

    const patientAddress = {
      name: `${props.patientAddress.patientsFirstName} ${props.patientAddress.patientsLastName}`,
      street: props.patientAddress.patientsStreet,
      city: props.patientAddress.patientsCity,
      province: props.patientAddress.patientsProvince,
      postalCode: props.patientAddress.patientsPostalCode,
      phoneNumber: props.patientAddress.patientsPhoneNumber
    }

    const myAddress = {
      name: `${props.auth.firstName} ${props.auth.lastName}`,
      street: props.myAddress.street,
      city: props.myAddress.city,
      province: props.myAddress.province,
      postalCode: props.myAddress.postalCode,
      phoneNumber: props.myAddress.phoneNumber
    }

    const addressType = this.props.navigation.getParam('addressType', '');

    let selectedAddress = '';
    if (addressType === 'pickup') {
      selectedAddress = props.selectedPickup;
    } else {
      selectedAddress = props.selectedDropOff;
    }

    let buttonLabel = '';
    let screenTitle = '';
    let sectionTitle = '';
    if (addressType === 'pickup') {
      screenTitle = 'Pickup Location';
      sectionTitle = 'Pickup Address';
      buttonLabel = 'SELECT AS PICKUP LOCATION';
    } else {
      screenTitle = 'Drop Off Location';
      sectionTitle = 'Drop Off Address';
      buttonLabel = 'SELECT AS DROP OFF LOCATION';
    }

    let selected = 'myself';
    if (props.auth.subRole === 'lovedOne' || props.auth.subRole === 'familyMember') {
      selected = 'patient';
    }

    this.state = {
      addressType,
      defaultSelectedAddress: selected,
      selectedAddress,
      patientAddress, 
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
      buttonLabel,
      screenTitle,
      sectionTitle,
      actionLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidUpdate(prevProps, prevState) {
    const { navigation } = this.props;

    if (prevState.patientAddressProps !== this.props.patientAddress) {
      const patientAddress = {
        name: `${this.props.patientAddress.patientsFirstName} ${this.props.patientAddress.patientsLastName}`,
        street: this.props.patientAddress.patientsStreet,
        city: this.props.patientAddress.patientsCity,
        province: this.props.patientAddress.patientsProvince,
        postalCode: this.props.patientAddress.patientsPostalCode,
        phoneNumber: this.props.patientAddress.patientsPhoneNumber
      }
      this.setState({ patientAddress, patientAddressProps: this.props.patientAddress });
      this.selectedAddressCallback('patient');
    }
    if (prevState.myAddressProps !== this.props.myAddress) {
      const myAddress = {
        name: `${this.props.auth.firstName} ${this.props.auth.lastName}`,
        street: this.props.myAddress.street,
        city: this.props.myAddress.city,
        province: this.props.myAddress.province,
        postalCode: this.props.myAddress.postalCode,
        phoneNumber: this.props.myAddress.phoneNumber
      }
      this.setState({ myAddress, myAddressProps: this.props.myAddress });
      this.selectedAddressCallback('myself');
    }
  }

  componentDidMount() {
    //this.mixpanel.track('View Transportation Address Selection');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  selectedAddressCallback = value => {
    const { addressType, patientAddress, myAddress } = this.state;
    const { actions, customAddresses } = this.props;

    let preview = '';
    if (value === 'patient') {
      preview = patientAddress.street;
    } else if (value === 'myself') {
      preview = myAddress.street;
    } else {
      const customAddress = customAddresses.find(item => Number(item.addressId) === Number(value));
      preview = customAddress.street;
    }

    if (addressType === 'pickup') {
      actions.setSelectedPickup({value, preview});
    } else {
      actions.setSelectedDropOff({value, preview});
    }

    this.setState({selectedAddress: value});
  };

  onPressSelectLocation = () => {
    const { actions, navigation, customAddresses, selectedPickup, selectedDropOff } = this.props;
    const { selectedAddress, patientAddress, myAddress, addressType } = this.state;

    let revisedSelected = '';
    if (addressType === 'pickup') {
      revisedSelected = selectedPickup;
    } else {
      revisedSelected = selectedDropOff;
    }
  
    this.selectedAddressCallback(revisedSelected);

    const addressDisplayArr = chooseCorrectAddress(revisedSelected, patientAddress, myAddress, customAddresses);

    if (!strNotNull(addressDisplayArr.street) || !strNotNull(addressDisplayArr.city) || !strNotNull(addressDisplayArr.province) || !strNotNull(addressDisplayArr.postalCode)) {
      actions.setAlert('Please be sure the address you selected has the street, city, province, postal code, and phone number filled in.', 'mediumDuration');
      return;
    }

    let returnObj = {};
    if (addressType === 'pickup') {
      returnObj = { pickupAddress: addressDisplayArr };
    } else {
      returnObj = { dropOffAddress: addressDisplayArr };
    }

    navigation.navigate('PatientOrderTransportation', returnObj);
  };

  render() {
    const { auth, customAddresses, navigation, actions, selectedPickup, selectedDropOff } = this.props;
    const { addressType } = this.state;

    const {
      defaultSelectedAddress,
      patientAddress, 
      myAddress,
      buttonLabel,
      screenTitle,
      sectionTitle
    } = this.state;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title={screenTitle} onPressBack={this.onPressBack} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBottomLine}>
              <AppText textWeight="500" style={styles.textCostSummary}>{sectionTitle}</AppText>
            </View>
            <Addresses 
              navigation={navigation} 
              actions={actions}
              subRole={auth.subRole}
              patientAddress={patientAddress} 
              myAddress={myAddress} 
              customAddresses={customAddresses} 
              selectedPickup={selectedPickup}
              selectedDropOff={selectedDropOff}
              selectedAddressCallback={this.selectedAddressCallback}
              fromPage="transportation"
              pageType={addressType}
              addressType="condensed"
            />
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              onPress={this.onPressSelectLocation}
              width={width - 20}
              height={42}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>{buttonLabel}</AppText>
            </AppButton>
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AuthActions,
      ...AlertActions,
      ...TransportationActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  auth: state.auth,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses,
  selectedPickup: state.transportation.selectedPickup,
  selectedDropOff: state.transportation.selectedDropOff
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientOrderTransportationAddress);
