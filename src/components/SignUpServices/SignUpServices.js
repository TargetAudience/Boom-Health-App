import React, { Component } from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
//import MixpanelManager from '@utils/Analytics';
import images from '@assets/images';
import { AppButton, BackArrow, AppText } from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import styles from './SignUpServices.styles';

export const IconLookup = [
  {
    key: 'caregivers',
    label: 'Caregivers',
    image: images.homeIconCaregivers
  },
  {
    key: 'personalCare',
    label: 'Personal Services',
    image: images.homeIconPersonalCare
  },
  {
    key: 'mealPlan',
    label: 'Prepared Meals',
    image: images.homeIconMeals
  },
  {
    key: 'medicalEquipment',
    label: 'Medical Equipment',
    image: images.homeIconEquipment
  },
  {
    key: 'emergencyAssistance',
    label: 'Emergency Assistance',
    image: images.homeIconPersonalProtection
  },
  {
    key: 'transportation',
    label: 'Transportation',
    image: images.homeIconTransportation
  }
];

export default class SignUpServices extends Component {
  constructor(props) {
    super(props);

    const flowType = this.props.navigation.getParam('flowType', '');

    let successMessage =
      flowType === 'Myself'
        ? 'Great news! The following services are available in your area:'
        : 'Great news! The following services are available in this area:';

    this.state = {
      flowType,
      available: this.props.navigation.getParam('available', ''),
      city: this.props.navigation.getParam('city', ''),
      province: this.props.navigation.getParam('province', ''),
      postalCode: this.props.navigation.getParam('postalCode', ''),
      services: this.props.navigation.getParam('services', ''),
      successMessage
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Sign Up Services');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressCompleteProfile = () => {
    const { navigation } = this.props;
    const { flowType, city, province, postalCode } = this.state;

    navigation.navigate('SignUpProfile', {
      flowType,
      city,
      province,
      postalCode
    });
  };

  onPressApp = () => {
    const { navigation } = this.props;

    navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'PostAuthFlowPatient',
        action: NavigationActions.navigate('PatientHome')
      })
    );
  };

  renderItem = item => {
    return (
      <View key={item.key} style={styles.imageSetContainer}>
        <View style={styles.imageSet}>
          <View style={styles.imageContainer}>
            <Image style={styles.navImage} source={item.image} resizeMode="contain" />
          </View>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.name}>{item.label}</AppText>
        </View>
      </View>
    );
  };

  render() {
    const { successMessage, services, city, province } = this.state;

    const emergencyAssistance = IconLookup.find(item => item.key === 'emergencyAssistance');

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <ScrollView>
          <BackArrow onPressBack={this.onPressBack} backIconDark />
          <View style={styles.containerAlign}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textMessage}>{successMessage}</AppText>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '700' : '600'}`} style={styles.textCity}>{city}, {province}</AppText>

            {services.length
              ? services.map((data, index) => {
                  const lookup = IconLookup.find(item => item.key === data);
                  return this.renderItem(lookup);
                })
              : null}
            
            {this.renderItem(emergencyAssistance)}

            <View style={styles.buttonContainer}>
              <AppButton
                onPress={this.onPressCompleteProfile}
                width={270}
                height={38}
                backgroundColor={Colors.buttonSecondary}
                disabled={false}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Complete My Profile Now</AppText>
              </AppButton>
              <AppButton
                style={styles.secondButton}
                onPress={this.onPressApp}
                width={270}
                height={38}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Maybe later, take me to the App</AppText>
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
