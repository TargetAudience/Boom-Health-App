import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableHighlight, Image, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import {
  CustomHeaderBack,
  LoaderList,
  PresetMealItem,
  AppButton,
  PresetMealInformation,
  GenericModal,
  CartItem,
  Addresses
} from '@components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { currencyFormat, chooseCorrectAddress, strNotNull } from '@utils/Globals';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientBookHomePersonalCareCheckout.styles';
import { assetsUrl } from '@lib/Settings';

import ProfileApi from '@api/profileApi';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const { width } = Dimensions.get('screen');

class PatientBookHomePersonalCareCheckout extends Component {
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

    let selected = 'myself';
    if (props.auth.subRole === 'lovedOne' || props.auth.subRole === 'familyMember') {
      selected = 'patient';
    }
    
    this.state = {
      note: '',
      actionLoading: false,
      selectedDelivery: 'frontDoor',
      selectedDeliveryType: 'standard',
      selectedAddress: selected,
      patientAddress, 
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
      delivery: 'test',
      rushDelivery: 'test',
      selectedTime: null
    };
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
      }
      this.setState({ patientAddress, patientAddressProps: this.props.patientAddress });
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
    }
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressPayment = () => {
    const { navigation, actions, customAddresses } = this.props;
    const { patientAddress, myAddress, note, selectedAddress } = this.state;

    const addressDisplayArr = chooseCorrectAddress(selectedAddress, patientAddress, myAddress, customAddresses);

    if (!strNotNull(addressDisplayArr.street) || !strNotNull(addressDisplayArr.city) || !strNotNull(addressDisplayArr.province) || !strNotNull(addressDisplayArr.postalCode) || !strNotNull(addressDisplayArr.phoneNumber)) {
      actions.setAlert('Please be sure the delivery address you selected has the street, city, province, postal code, and phone number filled in.', 'mediumDuration');
      return;
    }

    navigation.navigate('PatientBookHomePersonalCarePayment', { note, selectedAddress, addressDisplayArr });
  };

  selectedAddressCallback = value => {
    this.setState({selectedAddress: value});
  };

  handleNote = note => {
    this.setState({ note });
  };

  render() {
    const { actions, auth, cart, customAddresses, navigation } = this.props;
    const { note, cartType, selectedDelivery, selectedAddress, patientAddress, myAddress } = this.state;

    const charactersRemaining = 250 - note.length;

    return (
      <>
        <CustomHeaderBack title="Checkout" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <ScrollView ref={ref => { this.scrollViewRef = ref; }} style={styles.scrollView}> 
            <View style={styles.summaryContainer}>
              <View style={styles.summaryBottomLine}>
                <Text style={styles.textCostSummary}>Delivery Address</Text>
              </View>
              <Addresses 
                navigation={navigation} 
                actions={actions}
                subRole={auth.subRole}
                patientAddress={patientAddress} 
                myAddress={myAddress} 
                customAddresses={customAddresses} 
                selectedAddress={selectedAddress}
                selectedAddressCallback={this.selectedAddressCallback}
                selected={selectedAddress}
                fromPage="homeCare"
                pageType="null"
                addressType="standard"
              />
            </View>

            <View style={styles.deliveryContainer}>
              <View style={styles.deliveryBottomLine}>
                <Text style={styles.textDelivery}>Add a Note</Text>
              </View>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder="Instructions? Special Requests? Add them here."
                placeholderTextColor="#9E9E9E"
                value={note}
                maxLength={250}
                numberOfLines={4}
                onChangeText={liveNote => this.handleNote(liveNote)}
                multiline
              />
              <Text style={styles.numCharacters}>{charactersRemaining} characters remaining</Text>
            </View>

            <View style={styles.buttonContainer}>
              <AppButton
                onPress={this.onPressPayment}
                width={width - 20}
                height={42}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <Text style={styles.buttonText}>CONTINUE TO PAYMENT</Text>
              </AppButton>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </>
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
  auth: state.auth,
  cartItems: state.homePersonalCare.cartItems,
  cart: state.homePersonalCare.cart,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCareCheckout);

