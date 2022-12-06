import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import call from 'react-native-phone-call';
import {
  AppText,
  PersonTopSection,
  CustomHeaderBack,
  ModalFeedback,
  WelcomeStoryModal,
  NotificationsPromptBar,
  AppButton,
} from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors, Globals} from '@constants/GlobalStyles';
import styles from './PatientHome.styles';
import images from '@assets/images';
import HomeCell from './HomeCell';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as AuthActions from '@ducks/auth';
import * as SettingsActions from '@ducks/settings';
import * as EquipmentActions from '@ducks/equipment';

import HomeApi from '@api/homeApi';

const {width} = Dimensions.get('screen');

const navigationItems = [
  {
    key: 'PatientBookCaregiversSales',
    name: 'Find Caregivers',
    description: 'Reliable, certified and friendly',
    image: images.homeIconCaregivers,
    screen: 'PatientBookCaregiversSales',
    iconW: 40,
    iconH: 38,
  },
  {
    key: 'PatientDischargeChecklist',
    name: 'Discharge Follow Up Tasks',
    description: 'Keep track of and assign tasks',
    image: images.homeIconChecklist,
    screen: 'PatientDischargeChecklist',
    iconW: 34,
    iconH: 46,
  },
  {
    key: 'PatientMealsSales',
    name: 'Order Prepared Meals',
    description: 'Delivered and ready-to-heat',
    image: images.homeIconMeals,
    screen: 'PatientMealsSales',
    iconW: 47,
    iconH: 37,
  },
  {
    key: 'PatientMedicalEquipmentSales',
    name: 'Rent or Purchase Equipment',
    description: 'Medical equipment at your doorstep',
    image: images.homeIconEquipment,
    screen: 'PatientMedicalEquipmentSales',
    iconW: 40,
    iconH: 38,
  },
  {
    key: 'PatientSeniorProtection',
    name: 'Get Emergency Assistance',
    description: 'Medical alert device',
    image: images.homeIconPersonalProtection,
    screen: 'PatientSeniorProtection',
    iconW: 37,
    iconH: 38,
  },
  {
    key: 'PatientOrderTransportationSales',
    name: 'Schedule Transportation',
    description: 'Accessible and escorted',
    image: images.homeIconTransportation,
    screen: 'PatientOrderTransportationSales',
    iconW: 57,
    iconH: 36,
  },
  {
    key: 'PatientBookHomePersonalCare',
    name: 'Book Personal Services',
    description: 'Haircuts, nails and more',
    image: images.homeIconPersonalCare,
    screen: 'PatientBookHomePersonalCare',
    iconW: 49,
    iconH: 38,
  },
];

class PatientHome extends Component {
  constructor(props) {
    super(props);

    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;

    this.state = {
      isFeedBackModalOpen: false,
      isStoryWelcomeModalOpen: false,
      showRentalRenewalPanel: false,
      pullRefreshing: false,
      equipmentCurrentlyRentedData: [],
    };

    this.data = this.getData();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;

    this.onPressPhoneNumber = this.onPressPhoneNumber.bind(this);
  }

  componentDidMount() {
    const {settings} = this.props;

    const {addListener} = this.props.navigation;

    this.listeners = [addListener('didFocus', this.handleDidFocus)];

    this.loadData();

    this.setState({
      isStoryWelcomeModalOpen:
        settings.hasShownStoryWelcomePopup === 0 ? true : false,
    });

    analytics().logScreenView({
      screen_name: 'patient_home',
      screen_class: 'patient_home',
    });

    ////this.mixpanel.track('View Home');
  }

  componentWillUnmount() {
    this.listeners.forEach(sub => sub.remove());
  }

  handleDidFocus = () => {
    const {actions, flagHomeRentalUpdate} = this.props;

    if (flagHomeRentalUpdate === 1) {
      this.loadData();
      actions.clearHomeRentalUpdate();
    }
  };

  loadData() {
    const {actions} = this.props;

    this.setState({actionLoading: true});

    HomeApi.getEquipmentCurrentlyRented()
      .promise.then(result => {
        const data = result.data;

        let rented = [];
        if (data.rented) {
          rented = data.rented;
        }

        this.setState({
          actionLoading: false,
          pullRefreshing: false,
          equipmentCurrentlyRentedData: rented,
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({actionLoading: false, pullRefreshing: false});
        actions.setAlert(error.data.error);
      });
  }

  onPressPhoneNumber() {
    call({
      number: '437-218-7900',
      prompt: false,
    }).catch(console.error);
  }

  onPressFeedback = () => {
    this.setState({
      isFeedBackModalOpen: true,
    });
  };

  onPressCancel = () => {
    const {actions} = this.props;

    this.setState({
      isFeedBackModalOpen: false,
      isStoryWelcomeModalOpen: false,
    });

    actions.setStoryWelcomePopupShown();
  };

  onPressItemHandler = screen => {
    const {navigation, subRole} = this.props;

    if (screen === 'PatientDischargeChecklist' && subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate(screen);
  };

  onPressStoryWelcomePopup = () => {
    const {navigation} = this.props;

    this.onPressCancel();

    navigation.navigate('PatientStory');
  };

  onPressMedicationReminders = () => {
    const {navigation} = this.props;

    navigation.navigate('MedicationRemindersHome');
  };

  getData = () => {
    return navigationItems.map(function (item, index) {
      if (index % 2 === 0) {
        item.firstRow = true;
      } else {
        item.firstRow = false;
      }
      return item;
    });
  };

  onPressRenewEquipment = () => {
    const {navigation, actions} = this.props;
    const {equipmentCurrentlyRentedData} = this.state;

    equipmentCurrentlyRentedData.forEach(item => {
      const cartItem = {
        uuid: item.uuid,
        itemUuid: item.itemUuid,
        name: item.name,
        rentOptions: item.rentOptions,
        price: 0,
        priceTally: 0,
        quantity: 1,
        categoryId: null,
        size: item.size,
        sizeId: item.sizeId,
        durationDays: null,
        duration: null,
        nickname: null,
        type: 'rent',
        cartType: 'equipment',
        delivery: item.delivery,
        rushDelivery: item.rushDelivery,
        cartItemType: 'renew',
      };
      actions.addToCart(cartItem);
    });

    navigation.navigate('PatientMedicalEquipmentCart', {from: 'renewal'});
  };

  onPullToRefresh = () => {
    this.setState({pullRefreshing: true}, () => {
      this.loadData();
    });
  };

  renderRecommendedBullet = item => {
    return (
      <View style={styles.equipmentRenewalItem}>
        <Image style={styles.equipmentBullet} source={images.checkmarkPink} />
        <AppText textWeight={'300'} style={styles.equipmentRenewalItemText}>
          {item.name}
        </AppText>
        <AppText textWeight={'500'} style={styles.equipmentRenewalItemTextB}>
          {item.displayDate}
        </AppText>
      </View>
    );
  };

  renderEquipmentCurrentlyRented = () => {
    const {equipmentCurrentlyRentedData} = this.state;

    if (equipmentCurrentlyRentedData.length === 0) {
      return;
    }

    return (
      <View style={styles.equipmentRenewalContainer}>
        <View style={styles.equipmentRenewalTopRowContainer}>
          <Image
            style={styles.equipmentIconBullet}
            source={images.homeIconEquipment}
          />
          <AppText textWeight={'600'} style={styles.equipmentRenewalTitle}>
            Equipment currently rented
          </AppText>
        </View>
        <AppText textWeight={'300'} style={styles.equipmentRenewalSubTitle}>
          To extend the rental period of your items, add them to your cart and
          complete a new purchase. From your cart you can make adjustments to
          the size of the item or length of the rental period.
        </AppText>
        {equipmentCurrentlyRentedData.map(item => {
          return (
            <View style={styles.equipmentRenewalItem} key={item.uuid}>
              {this.renderRecommendedBullet(item)}
            </View>
          );
        })}
        <View style={styles.spacer} />
        <AppButton
          onPress={this.onPressRenewEquipment}
          width={width - 54}
          height={34}
          backgroundColor={Colors.buttonMain}
          disabled={false}>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={styles.equipmentButtonText}>
            Add items to your cart
          </AppText>
        </AppButton>
      </View>
    );
  };

  render() {
    const {auth, subRole, profile} = this.props;
    const {isFeedBackModalOpen, isStoryWelcomeModalOpen, pullRefreshing} =
      this.state;

    const showFeedbackButton = subRole !== 'guest' ? true : false;

    const whoText = auth.subRole !== 'myself' ? 'YOUR LOVED ONE' : 'YOURSELF';

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top}]}>
            {showFeedbackButton ? (
              <>
                <CustomHeaderBack
                  includeLogo
                  onPressFeedback={this.onPressFeedback}
                />
                <NotificationsPromptBar />
              </>
            ) : (
              <CustomHeaderBack includeLogo />
            )}
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={pullRefreshing}
                  onRefresh={this.onPullToRefresh}
                />
              }>
              <PersonTopSection user={auth} profile={profile} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onPressStoryWelcomePopup}>
                <View style={styles.storyBackground}>
                  <View style={styles.storyContainer}>
                    <View style={styles.storyAlign}>
                      <View style={styles.storyTopContainer}>
                        <Image
                          style={styles.lisasStoryScriptImage}
                          source={images.lisasStoryScript}
                        />
                      </View>
                      <View style={styles.storyButtonContainer}>
                        <AppText
                          textWeight={'500'}
                          style={styles.buttonReadMoreText}>
                          Read about how Boom came to be
                        </AppText>
                        <Image
                          style={styles.rightArrowImage}
                          source={images.rightArrow}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.boomHelpContainer}>
                <AppText textWeight="600" style={styles.sectionHeadingText}>
                  USE{' '}
                  <AppText
                    style={[
                      styles.sectionHeadingTextBlue,
                      {
                        fontFamily: 'CenturyOldStyleStd-Bold',
                        fontWeight: '700',
                      },
                    ]}>
                    boom
                  </AppText>{' '}
                  TO HELP CARE FOR {whoText}
                </AppText>
              </View>

              {this.renderEquipmentCurrentlyRented()}

              <View style={styles.containerB}>
                {this.data.map(item => (
                  <HomeCell
                    key={item.key}
                    item={item}
                    onPress={() => this.onPressItemHandler(item.screen)}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.phoneNumberContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.onPressPhoneNumber}>
                <View style={styles.phoneNumberContainerB}>
                  <Image style={styles.phoneImage} source={images.phone} />
                  <View style={styles.phoneNumberInner}>
                    <AppText textWeight={'300'} style={styles.callUsText}>
                      Call Us:
                    </AppText>
                    <AppText textWeight={'400'} style={styles.phoneText}>
                      (437) 218-7900
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <ModalFeedback
              onPressCancel={this.onPressCancel}
              isModalOpen={isFeedBackModalOpen}
            />
            <WelcomeStoryModal
              onPressCloseButton={this.onPressCancel}
              onPressLink={this.onPressStoryWelcomePopup}
              isModalOpen={isStoryWelcomeModalOpen}
            />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...SettingsActions, ...EquipmentActions, ...AuthActions},
      dispatch,
    ),
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
  subRole: state.auth.subRole,
  profile: state.profile,
  settings: state.settings,
  flagHomeRentalUpdate: state.auth.flagHomeRentalUpdate,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome);

/*
<TouchableOpacity
  activeOpacity={0.8}
  onPress={this.onPressMedicationReminders}>            
    <AppText
      textWeight={'500'}
      style={styles.buttonMedicationReminders}>
      Medication Reminders
    </AppText>
</TouchableOpacity>
*/
