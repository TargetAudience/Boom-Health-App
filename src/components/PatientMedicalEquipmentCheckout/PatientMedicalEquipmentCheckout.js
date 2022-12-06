import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import moment from 'moment';
import {
  CustomHeaderBack,
  AppButton,
  Addresses,
  CheckmarkToggle,
  AppText,
} from '@components/common';
import {
  chooseCorrectAddress,
  strNotNull,
  nearestPastMinutes,
} from '@utils/Globals';
import {Colors, Globals} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentCheckout.styles';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientMedicalEquipmentCheckout extends Component {
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

    const deliveryMost = props.cartItems.reduce(function (prev, current) {
      return prev.delivery > current.delivery ? prev : current;
    });

    const rushDeliveryMost = props.cartItems.reduce(function (prev, current) {
      return prev.rushDelivery > current.rushDelivery ? prev : current;
    });

    const delivery = deliveryMost.delivery;
    const rushDelivery = rushDeliveryMost.rushDelivery;

    let selected = 'myself';
    if (
      props.auth.subRole === 'lovedOne' ||
      props.auth.subRole === 'familyMember'
    ) {
      selected = 'patient';
    }

    this.state = {
      note: '',
      selectedDeliveryTime: 'morning',
      actionLoading: false,
      selectedDeliveryType: 'standard',
      selectedAddress: selected,
      patientAddress,
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
      delivery,
      rushDelivery,
      pickupDate: null,
      pickupDateToSend: null,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      initialTime: new Date(),
      minimumTime: new Date(),
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medical Equipment Checkout');
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
      pickupDate,
      pickupDateToSend,
      patientAddress,
      myAddress,
      note,
      selectedAddress,
      selectedDeliveryType,
      selectedDeliveryTime,
      delivery,
      rushDelivery,
    } = this.state;

    if (
      selectedDeliveryType === 'standard' &&
      (pickupDate === '' || pickupDate === null)
    ) {
      actions.setAlert('Please select a date for your delivery.');
      return;
    }

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

    const today = moment().format('YYYY-MM-DD');
    const blackoutDates = [
      '2020-12-24',
      '2020-12-25',
      '2020-12-26',
      '2020-12-27',
      '2020-12-31',
      '2021-01-01',
      '2021-01-02',
    ];

    if (blackoutDates.includes(pickupDateToSend)) {
      actions.setAlert(
        'Sorry! Unfortunately, you chose a holiday date when we are not delivering: ' +
          pickupDateToSend,
        'mediumDuration',
      );
      return;
    }

    if (selectedDeliveryType !== 'standard' && blackoutDates.includes(today)) {
      actions.setAlert(
        'Sorry! Unfortunately, you are booking on a day when we are closed for the holidays. Please choose Standard Delivery and select a delivery date.',
        'mediumDuration',
      );
      return;
    }

    const deliveryPrice =
      selectedDeliveryType === 'standard' ? delivery : rushDelivery;

    navigation.navigate('PatientMedicalEquipmentPayment', {
      note,
      pickupDate,
      pickupDateToSend,
      selectedAddress,
      addressDisplayArr,
      deliveryPrice,
      selectedDeliveryTime,
      selectedDeliveryType,
    });
  };

  selectedAddressCallback = value => {
    this.setState({selectedAddress: value});
  };

  handleNote = note => {
    this.setState({note});
  };

  onPressDeliveryType = item => {
    this.setState({selectedDeliveryType: item});
  };

  onPressDeliveryTime = item => {
    this.setState({selectedDeliveryTime: item});
  };

  onPressPickupDate = () => {
    this.setState({isDatePickerVisible: true});
  };

  onPressDateConfirm = date => {
    const formattedDate = moment(date)
      .format('ddd, MMM. D, YYYY')
      .toUpperCase();
    const formattedDateToSendRevised = moment(date).format('YYYY-MM-DD');

    let initialTime = new Date();
    let minimumTime = new Date();

    const isToday = moment(0, 'HH').diff(date, 'days') == 0;

    if (isToday) {
      const addHours = moment().add(2, 'hours').format();
      const nearestPastMin = nearestPastMinutes(15, moment(addHours));
      initialTime = new Date(nearestPastMin);
      minimumTime = new Date(nearestPastMin);
    } else {
      minimumTime = null;
    }

    this.setState(
      prevState => ({
        initialTime,
        minimumTime,
        dateChanged: true,
        pickupDate: formattedDate,
        pickupDateToSend: formattedDateToSendRevised,
      }),
      () => {
        this.forceUpdate();
      },
    );

    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  renderEquipmentCheckout() {
    const {
      selectedDeliveryTime,
      pickupDate,
      isDatePickerVisible,
      delivery,
      rushDelivery,
      note,
      selectedDeliveryType,
    } = this.state;

    const charactersRemaining = 250 - note.length;

    const deliveryDisplay = `$${delivery}`;
    const rushDeliveryDisplay = `$${rushDelivery}`;

    const showDeliveryTime = selectedDeliveryType === 'standard' ? true : false;

    const minimumDateThisWeek = moment().add(1, 'days');

    return (
      <>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date(minimumDateThisWeek)}
          minimumDate={new Date(minimumDateThisWeek)}
          minuteInterval={15}
          onConfirm={this.onPressDateConfirm}
          onCancel={this.hideDatePicker}
          headerTextIOS="Select a date"
          isDarkModeEnabled={false}
          textColor="black"
        />

        <View style={styles.deliveryContainer}>
          <View style={styles.deliveryBottomLine}>
            <AppText textWeight="500" style={styles.textCostSummary}>
              Delivery Type
            </AppText>
          </View>
          <View style={styles.checkMarkContainer}>
            <Checkmark
              text="Standard Delivery"
              secondaryText={deliveryDisplay}
              checked={selectedDeliveryType === 'standard'}
              onPress={() => this.onPressDeliveryType('standard')}
            />
            <Checkmark
              text="Same Day Delivery"
              secondaryText={rushDeliveryDisplay}
              checked={selectedDeliveryType === 'rush'}
              onPress={() => this.onPressDeliveryType('rush')}
            />
          </View>
        </View>

        {showDeliveryTime ? (
          <View style={styles.deliveryContainer}>
            <View style={styles.deliveryBottomLine}>
              <AppText textWeight="500" style={styles.textDelivery}>
                Delivery Time
              </AppText>
            </View>
            <View style={styles.buttonRow}>
              <View>
                <AppButton
                  onPress={this.onPressPickupDate}
                  width={144}
                  height={34}
                  backgroundColor={Colors.darkGrayButton}
                  disabled={false}>
                  <View style={styles.iconAndTextContainer}>
                    <Image
                      style={styles.calendarWhite}
                      source={images.calendarWhite}
                    />
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.openText}>
                      SELECT DATE
                    </AppText>
                  </View>
                </AppButton>
              </View>
              <AppText textWeight="500" style={styles.timeDateText}>
                {pickupDate}
              </AppText>
            </View>
            <AppText textWeight="500" style={styles.selectTimeText}>
              Select Delivery Window
            </AppText>
            <View style={styles.checkMarkContainer}>
              <Checkmark
                text="9am - 12pm"
                secondaryText=""
                checked={selectedDeliveryTime === 'morning'}
                onPress={() => this.onPressDeliveryTime('morning')}
              />
              <Checkmark
                text="12pm - 3pm"
                secondaryText=""
                checked={selectedDeliveryTime === 'afternoon'}
                onPress={() => this.onPressDeliveryTime('afternoon')}
              />
            </View>
          </View>
        ) : null}

        <View style={styles.deliveryContainer}>
          <View style={styles.deliveryBottomLine}>
            <AppText textWeight="500" style={styles.textDelivery}>
              Add a Note
            </AppText>
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
            returnKeyType="done"
            onSubmitEditing={this.onPressPayment}
          />
          <AppText textWeight="300" style={styles.numCharacters}>
            {charactersRemaining} characters remaining
          </AppText>
        </View>
      </>
    );
  }

  render() {
    const {actions, navigation, auth, customAddresses} = this.props;
    const {selectedAddress, patientAddress, myAddress} = this.state;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View
              style={[
                styles.container,
                {paddingTop: insets.top},
              ]}>
              <CustomHeaderBack
                title="Checkout"
                onPressBack={this.onPressBack}
              />
              <KeyboardAwareScrollView
                extraScrollHeight={60}
                enableResetScrollToCoords={false}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER} style={styles.containerB}>
                <View style={styles.summaryContainer}>
                  <View style={styles.summaryBottomLine}>
                    <AppText textWeight="600" style={styles.textCostSummary}>
                      Delivery Address
                    </AppText>
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
                    fromPage="checkout"
                    pageType="null"
                    addressType="standard"
                  />
                </View>
                {this.renderEquipmentCheckout()}

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
        <SafeAreaView style={{flex: 0, backgroundColor: Colors.mainBackground}} />
      </>
    );
  }
}

const Checkmark = ({text, secondaryText, checked, onPress}) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={1}
    underlayColor={Colors.white}>
    <View style={styles.deliveryOuter}>
      <View style={styles.deliveryInner}>
        <CheckmarkToggle checked={checked} onPress={onPress} />
        <AppText textWeight="500" style={styles.textCheckmark}>
          {text}
        </AppText>
      </View>
      <AppText textWeight="400" style={styles.textCheckmark2}>
        {secondaryText}
      </AppText>
    </View>
  </TouchableHighlight>
);

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
  cartItems: state.equipment.cartItems,
  cart: state.equipment.cart,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientMedicalEquipmentCheckout);
