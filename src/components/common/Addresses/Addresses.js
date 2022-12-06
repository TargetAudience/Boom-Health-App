import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { FormWrapper, InputWithLabel, ButtonLoading, CustomHeaderBack, AppButton, CheckmarkToggle, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import { isNumeric } from '@utils/Globals';
import images from '@assets/images';
import styles from './Addresses.styles';

import ProfileApi from '@api/profileApi';

class Addresses extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    ProfileApi.getCustomAddresses()
      .promise.then(result => {
        const data = result.data.addresses;

        this.setState({ actionLoading: false });

        actions.storeCustomAddresses(data);
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressRemoveItem = item => {
    const { subRole, actions, customAddresses, pageType, selectedPickup, selected, selectedDropOff, selectedAddressCallback } = this.props;

    let currentAddress = '';
    if (pageType === 'pickup') {
      currentAddress = selectedPickup;
      if (Number(selectedDropOff) === Number(item)) {
        actions.setAlert('Sorry, this address being used for the Drop Off address.');
        return;
      }
    } else if (pageType === 'dropOff') {
      currentAddress = selectedDropOff;
      if (Number(selectedPickup) === Number(item)) {
        actions.setAlert('Sorry, this address being used for the Pickup address.');
        return;
      }
    } else {
      currentAddress = selected;
    }

    if (isNumeric(currentAddress) && Number(currentAddress) == Number(item)) {
      let selected = 'myself';
      if (subRole === 'lovedOne' || subRole === 'familyMember') {
        selected = 'patient';
      }

      selectedAddressCallback(selected);
    }

    actions.removeCustomAddress(item);

    ProfileApi.removeCustomAddress({addressId: item})
      .promise.then(result => {
      })
      .catch(error => {
        actions.setAlert(error.data.error);
      });
  };

  onPressAddAddress = item => {
    // Custom address.
    const { navigation, addressType, pageType } = this.props;

    navigation.navigate('PatientModalAddress', { addressType, pageType, callback: this.alertWhenModalCloses });
  };

  alertWhenModalCloses = result => {
    const addressId = result.addressId;

    this.props.selectedAddressCallback(addressId);
  };

  onPressEdit = item => {
    const { navigation, fromPage } = this.props;

    if (item === 'patient') {
      navigation.navigate('PatientModalEditPatientAddress', { fromPage });
    } else {
      navigation.navigate('PatientModalEditMyAddress', { fromPage });
    }
  };

  onPressSelectAddress = item => {
    this.props.selectedAddressCallback(item);
  };

  renderCustomAddresses = (selectedAddress) => {
    const { customAddresses, addressType, pageType, selectedPickup, selectedDropOff } = this.props;

    let currentAddress = '';
    if (pageType === 'pickup') {
      currentAddress = selectedPickup;
    } else if (pageType === 'dropOff') {
      currentAddress = selectedDropOff;
    } else {
      currentAddress = selectedAddress;
    }

    if (customAddresses) {
      const customAddressesFiltered = customAddresses.filter(item => item.addressType === addressType);

      const rendering = customAddressesFiltered.map((item, index) => {
        const checked = Number(currentAddress) === Number(item.addressId);

        return (
          <TouchableHighlight
            key={item.addressId.toString()}
            onPress={() => this.onPressSelectAddress(item.addressId)}
            activeOpacity={1}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <View style={styles.rowInner}>
                <CheckmarkToggle checked={checked} onPress={() => this.onPressSelectAddress(item.addressId)} />
                <View>
                  <Text style={styles.leftLabelText}>{item.nickname}</Text>
                  {item.street ? (
                    <Text style={styles.leftLabelTextAddress}>{item.street}</Text>
                  ) : (
                    <Text style={styles.leftLabelTextAddress}>Please enter a street</Text>
                  )}
                  {item.city ? (
                  <Text style={styles.leftLabelTextAddress}>{item.city}, {item.province}</Text>
                  ) : (
                    <Text style={styles.leftLabelTextAddress}>Please enter a city</Text>
                  )}
                  {!item.province ? (
                    <Text style={styles.leftLabelTextAddress}>Please enter a province</Text>
                  ) : null}
                  {!item.postalCode ? (
                    <Text style={styles.leftLabelTextAddress}>Please enter a postal code</Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.removeContainer}> 
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onPressRemoveItem(item.addressId)}>
                  <Image source={images.cancel} style={styles.cancel} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableHighlight>
        )
      });
      return rendering;
    }
    return null;
  }

  render() {
    const { subRole, patientAddress, myAddress, pageType, selected, selectedPickup, selectedDropOff } = this.props;

    // subRole of myself would only get My Address.
    let showPatientAddress = false;
    if (subRole === 'lovedOne' || subRole === 'familyMember') {
      showPatientAddress = true;
    }

    let selectedAddress = '';
    if (pageType === 'pickup') {
      selectedAddress = selectedPickup;
    } else if (pageType === 'dropOff') {
      selectedAddress = selectedDropOff;
    } else {
      selectedAddress = selected;
    }

    return (
      <View style={styles.addressContainer}>
        {showPatientAddress ? (
          <Entry text="Patient Address" data={patientAddress} checked={selectedAddress === 'patient'} onPress={() => this.onPressSelectAddress('patient')} onPressEdit={() => this.onPressEdit('patient')} />
        ) : null}
        <Entry text="My Address" data={myAddress} checked={selectedAddress === 'myself'} onPress={() => this.onPressSelectAddress('myself')} onPressEdit={() => this.onPressEdit('myself')} />
        {this.renderCustomAddresses(selectedAddress)}
        <View style={styles.addAddressContainer}>
          <AppButton
            onPress={this.onPressAddAddress}
            width={148}
            height={32}
            backgroundColor={Colors.buttonMain}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonTextAdd}>Add New Address</AppText>
          </AppButton>
        </View>
      </View>
    );
  }
}

const Entry = ({ data, text, style, checked, onPress, onPressEdit }) => (  
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={1}
    underlayColor={Colors.white}>
    <View style={styles.rowContainer}>
      <View style={styles.rowInner}>
        <CheckmarkToggle checked={checked} onPress={onPress} />
        <View>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.leftLabelText}>{text}</AppText>
          {data.street ? (
            <AppText textWeight="300" style={styles.leftLabelTextAddress}>{data.street}</AppText>
          ) : (
            <AppText textWeight="300" style={styles.leftLabelTextAddress}>Please enter a street (inc. house or{'\n'}apt. number)</AppText>
          )}
          {data.city ? (
          <AppText textWeight="300" style={styles.leftLabelTextAddress}>{data.city}, {data.province}</AppText>
          ) : (
            <AppText textWeight="300" style={styles.leftLabelTextAddress}>Please enter a city</AppText>
          )}
          {!data.province ? (
            <AppText textWeight="300" style={styles.leftLabelTextAddress}>Please enter a province</AppText>
          ) : null}
          {!data.postalCode ? (
            <AppText textWeight="300" style={styles.leftLabelTextAddress}>Please enter a postal code</AppText>
          ) : null}
        </View>
      </View>
      <View style={styles.removeContainer}> 
        <AppButton
          style={styles.buttonEdit}
          onPress={onPressEdit}
          width={46}
          height={26}
          backgroundColor={Colors.transparent}
          disabled={false}>
          <Text style={styles.buttonEditText}>Edit</Text>
        </AppButton>
      </View>
    </View>
  </TouchableHighlight>
);

export default Addresses;
