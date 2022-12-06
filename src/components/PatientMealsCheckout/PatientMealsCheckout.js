import React, {Component} from 'react';
import {
  Platform,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  AppButton,
  Addresses,
  AppText,
  CheckmarkToggle,
} from '@components/common';
import {chooseCorrectAddress, strNotNull} from '@utils/Globals';
import {Colors, Globals} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMealsCheckout.styles';

import * as AuthActions from '@ducks/auth';
import * as MealsActions from '@ducks/meals';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientMealsCheckout extends Component {
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

    let weeks = props.weeks;
    let cartItemsMeals = props.cartItemsMeals;
    let hasThisWeekMeal = false;
    let hasSubsequentWeeksMeals = false;
    let thisWeekDates = [];
    let selectedThisWeeksDelivery = '';
    let selectedFurtherWeeksDelivery = '';
    let selectedIsThisWeek = false;

    for (var key in cartItemsMeals) {
      const day = cartItemsMeals[key];

      day.forEach((meals, index) => {
        if (meals.isThisWeek === 1) {
          hasThisWeekMeal = true;
          thisWeekDates = weeks[0].thisWeek;
          selectedThisWeeksDelivery = thisWeekDates[0].date;
          selectedIsThisWeek = thisWeekDates[0].isThisWeek;
        } else {
          if (!hasThisWeekMeal) {
            hasThisWeekMeal = false;
          }
          hasSubsequentWeeksMeals = true;
          selectedFurtherWeeksDelivery = 'Tuesday';
        }
      });
    }

    this.state = {
      actionLoading: false,
      hasThisWeekMeal,
      hasSubsequentWeeksMeals,
      thisWeekDates,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
      deliveryNote: '',
      selectedAddress: selected,
      patientAddress,
      myAddress,
      patientAddressProps: props.patientAddress,
      myAddressProps: props.myAddress,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Meals Checkout');
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
      deliveryNote,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
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

    navigation.navigate('PatientMealsPayment', {
      selectedAddress,
      addressDisplayArr,
      note: deliveryNote,
      selectedThisWeeksDelivery,
      selectedFurtherWeeksDelivery,
      selectedIsThisWeek,
    });
  };

  selectedAddressCallback = value => {
    this.setState({selectedAddress: value});
  };

  handleNote = deliveryNote => {
    this.setState({deliveryNote});
  };

  onPressThisWeeksDelivery = item => {
    this.setState({
      selectedThisWeeksDelivery: item.date,
      selectedIsThisWeek: item.isThisWeek,
    });
  };

  onPressFurtherWeeksDelivery = day => {
    this.setState({selectedFurtherWeeksDelivery: day, selectedIsThisWeek: 0});
  };

  isCheckedFurtherWeeks = day => {
    const {selectedFurtherWeeksDelivery} = this.state;
    if (selectedFurtherWeeksDelivery === day) {
      return true;
    }
    return false;
  };

  isCheckedThisWeeks = (day, index) => {
    const {selectedThisWeeksDelivery} = this.state;
    if (selectedThisWeeksDelivery === day) {
      return true;
    } else if (selectedThisWeeksDelivery === '' && index === 0) {
      return true;
    }
    return false;
  };

  render() {
    const {auth, navigation, actions, customAddresses} = this.props;
    const {
      thisWeekDates,
      hasThisWeekMeal,
      hasSubsequentWeeksMeals,
      deliveryNote,
      selectedAddress,
      patientAddress,
      myAddress,
    } = this.state;

    const charactersRemaining = 250 - deliveryNote.length;

    const showThisWeekSection = hasThisWeekMeal ? true : false;
    const showSubsequentWeeksSection = hasSubsequentWeeksMeals ? true : false;
    const subsequentWeeksTitle = showThisWeekSection
      ? 'Which day of the week would you like all future orders delivered?'
      : 'What day should we deliver your order?';

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
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                style={styles.containerB}>
                <View style={styles.summaryContainer}>
                  <View style={styles.summaryBottomLine}>
                    <AppText textWeight="500" style={styles.textSectionTitle}>
                      Where would you like your meals delivered?
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
                    fromPage="meals"
                    pageType="null"
                    addressType="standard"
                  />
                </View>

                <View style={styles.deliveryContainer}>
                  <View style={styles.deliveryBottomLine}>
                    <AppText textWeight="500" style={styles.textSectionTitle}>
                      Delivery Time
                    </AppText>
                  </View>
                  {showThisWeekSection ? (
                    <>
                      <AppText textWeight="400" style={styles.deliveryDateText}>
                        When should we deliver this week's order?
                      </AppText>
                      <View style={styles.checkMarkContainer}>
                        {thisWeekDates.map((item, index) => {
                          const isCheckedThisWeeks = this.isCheckedThisWeeks(
                            item.date,
                            index,
                          );
                          return (
                            <Checkmark
                              text={item.display}
                              checked={isCheckedThisWeeks}
                              onPress={() =>
                                this.onPressThisWeeksDelivery(item)
                              }
                            />
                          );
                        })}
                      </View>
                    </>
                  ) : null}
                  {showSubsequentWeeksSection ? (
                    <>
                      <AppText
                        textWeight="400"
                        style={[
                          styles.deliveryDateText,
                          styles.deliveryDateTextGap,
                        ]}>
                        {subsequentWeeksTitle}
                      </AppText>
                      <View style={styles.checkMarkContainer}>
                        <Checkmark
                          text="Tuesday"
                          checked={this.isCheckedFurtherWeeks('Tuesday')}
                          onPress={() =>
                            this.onPressFurtherWeeksDelivery('Tuesday')
                          }
                        />
                        <Checkmark
                          text="Friday"
                          checked={this.isCheckedFurtherWeeks('Friday')}
                          onPress={() =>
                            this.onPressFurtherWeeksDelivery('Friday')
                          }
                        />
                      </View>
                    </>
                  ) : null}
                  <View style={styles.timeDeliveryWindowContainer}>
                    <Image style={styles.bullet} source={images.bulletOrange} />
                    <AppText textWeight="300" style={styles.timeDeliveryWindow}>
                      All deliveries are between 5pm and 8pm.
                    </AppText>
                  </View>
                </View>

                <View style={styles.deliveryContainer}>
                  <View style={styles.deliveryBottomLine}>
                    <AppText textWeight="500" style={styles.textDelivery}>
                      Delivery Instructions
                    </AppText>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder=""
                    placeholderTextColor="#9E9E9E"
                    value={deliveryNote}
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
      ...MealsActions,
      ...AuthActions,
      ...AlertActions,
      ...ProfileActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  auth: state.auth,
  cartItemsMeals: state.meals.cartItemsMeals,
  weeks: state.meals.weeks,
  cart: state.meals.cart,
  patientAddress: state.profile.patient,
  myAddress: state.profile.owner,
  customAddresses: state.profile.customAddresses,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientMealsCheckout);
