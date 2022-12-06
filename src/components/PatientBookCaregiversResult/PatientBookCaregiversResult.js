import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {CustomHeaderBack, AppButton, AppText} from '@components/common';
import {Colors, Globals} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientBookCaregiversResult.styles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as AuthActions from '@ducks/auth';

const {width} = Dimensions.get('screen');

class PatientBookCaregiversResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intro: '',
      services: this.props.navigation.getParam('services', []),
      caregiverTimes: this.props.navigation.getParam('caregiverTimes', []),
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Book Caregivers Types');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {navigation, subRole} = this.props;
    const {services, caregiverTimes} = this.state;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate('PatientBookCaregiversCheckout', {
      services,
      caregiverTimes,
    });
  };

  getWorkerTypeText = type => {
    const {services} = this.state;

    let serviceList = [];
    let hasNurse = false;
    let message = '';

    for (var service of services) {
      serviceList.push(service.nameAbbrev);
    }
    if (serviceList.includes('RN')) {
      hasNurse = true;
      message += 'Nurse';
      if (type === 'bottom') {
        message += 's';
      }
    }
    if (serviceList.includes('PSW')) {
      if (hasNurse) {
        if (type === 'top') {
          message += ' or ';
        } else {
          message += ' and ';
        }
      }
      message += 'Personal Support Worker';
      if (type === 'bottom') {
        message += 's';
      }
    }
    return message;
  };

  renderTopText = () => {
    let message = 'Based on your selections, it looks like you need a ';
    message += this.getWorkerTypeText('top');
    message += '. The rates for our ';
    message += this.getWorkerTypeText('bottom');
    message += ' are as follows:';
    return message;
  };

  renderPricingText = () => {
    const {caregiverTimes} = this.state;

    if (caregiverTimes.caregiverTimes.urgency === 'urgent') {
      return 'Urgent Care Pricing';
    }
    return 'Pricing';
  };

  renderPricingPerHourLongText = item => {
    const {caregiverTimes} = this.state;

    if (caregiverTimes.caregiverTimes.urgency === 'urgent') {
      return `$${item.priceFirstHourUrgent} per hour for up to 1 hour + $${item.priceAdditionalHourUrgent} for each additional care hour.`;
    }
    return `$${item.priceFirstHour} per hour for up to 1 hour + $${item.priceAdditionalHour} for each additional care hour.`;
  };

  renderPricingPerHourText = item => {
    const {caregiverTimes} = this.state;

    if (caregiverTimes.caregiverTimes.urgency === 'urgent') {
      return `$${item.priceAdditionalHourUrgent} per hour for 3+ hours`;
    }
    return `$${item.priceAdditionalHour} per hour for 3+ hours`;
  };

  render() {
    const {services, caregiverTimes} = this.state;

    const numberOfHours =
      caregiverTimes.caregiverTimes.urgency === 'urgent' ? '2' : '4';
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingBottom: insets.bottom, paddingTop: insets.top},
            ]}>
            <CustomHeaderBack
              title="Caregiver Types"
              onPressBack={this.onPressBack}
            />
            <ScrollView style={styles.containerB}>
              <View
                style={[styles.introContainer, styles.introContainerAdjust]}>
                <AppText textWeight="300" style={styles.textIntro}>
                  {this.renderTopText()}
                </AppText>
              </View>

              {services.map(item => (
                <View
                  key={item.workerTypeId.toString()}
                  style={styles.messageContainer}>
                  <View style={styles.servicesInnerContainer}>
                    <View style={styles.iconNoteContainer}>
                      <Image style={styles.iconWorker} source={images.worker} />
                      <AppText textWeight="600" style={styles.iconText}>
                        {item.name}
                      </AppText>
                    </View>
                    <AppText textWeight="300" style={styles.textServices}>
                      <AppText textWeight="500" style={styles.textServices}>
                        Services:
                      </AppText>{' '}
                      {item.services}
                    </AppText>
                    <View style={styles.pricingContainer}>
                      <AppText textWeight="500" style={styles.textPricing}>
                        {this.renderPricingText()}:
                      </AppText>
                      <Text style={styles.price}>
                        {this.renderPricingPerHourLongText(item)}
                      </Text>
                      <Text style={styles.price}>
                        {this.renderPricingPerHourText(item)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              <View
                style={[styles.introContainer, styles.introContainerAdjustB]}>
                <AppText textWeight="300" style={styles.textIntro}>
                  As soon as your Caregiver service is booked, you'll receive a
                  call within {numberOfHours} hours from our Care Coordinator to
                  discuss the details of your visit, ensure that you have the
                  appropriate Care Provider to meet your needs, and confirm your
                  booking.
                </AppText>
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerInner}>
                <AppButton
                  style={styles.button}
                  onPress={this.onPressNext}
                  width={width - 20}
                  height={42}
                  backgroundColor={Colors.buttonMain}
                  disabled={false}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.buttonText}>
                    NEXT
                  </AppText>
                </AppButton>
              </View>
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBookCaregiversResult);
