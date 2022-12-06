import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import {CustomHeaderBack, AppText} from '@components/common';
import images from '@assets/images';
import styles from './PatientBookCaregiversInterim.styles';
import MaskedView from '@react-native-masked-view/masked-view';

import * as AuthActions from '@ducks/auth';

const {width} = Dimensions.get('screen');

class PatientBookCaregiversInterim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intro: '',
      services: this.props.navigation.getParam('services', []),
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Book Caregivers Visit');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressUrgent = () => {
    const {navigation} = this.props;
    const {services} = this.state;

    navigation.navigate('PatientBookCaregiversDateTimesUrgent', {services});
  };

  onPressScheduled = () => {
    const {navigation} = this.props;
    const {services} = this.state;

    navigation.navigate('PatientBookCaregiversDateTimes', {services});
  };

  renderTopText = () => {
    const {services} = this.state;

    let message = 'Looks like you need a ';
    let serviceList = [];
    let hasNurse = false;
    for (var service of services) {
      serviceList.push(service.nameAbbrev);
    }
    if (serviceList.includes('RN')) {
      hasNurse = true;
      message += 'Nurse';
    }
    if (serviceList.includes('PSW')) {
      if (hasNurse) {
        message += ' or ';
      }
      message += 'Personal Support Worker';
    }
    message +=
      '. You and your Care Coordinator will help you decide which Caregiver is best for your needs.';
    return message;
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingBottom: insets.bottom, paddingTop: insets.top},
            ]}>
            <CustomHeaderBack
              title="Caregiver Urgency"
              onPressBack={this.onPressBack}
            />
            <ScrollView style={styles.container}>
              <View style={styles.introContainer}>
                <AppText textWeight="500" style={styles.textIntro}>
                  When would you like your care?
                </AppText>
              </View>
              <MaskedView
                maskElement={
                  <View style={[styles.maskBackground, {height: 80}]}>
                    <View style={styles.maskContainer}></View>
                  </View>
                }>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.onPressUrgent}>
                  <View style={styles.buttonBackground}>
                    <View style={[styles.buttonContainer, {height: 80}]}>
                      <Image
                        source={images.buttonImageLeaves}
                        style={styles.firstMask}
                        resizeMode="contain"
                      />
                      <View style={styles.buttonAlign}>
                        <AppText
                          textWeight={'600'}
                          style={styles.buttonTextTop}>
                          Urgent Care
                        </AppText>
                        <View style={styles.buttonContainerInner}>
                          <AppText textWeight={'500'} style={styles.buttonText}>
                            In the next 48 hours
                          </AppText>
                        </View>
                      </View>
                      <View style={styles.rightArrowImageContainer}>
                        <Image
                          style={styles.rightArrowImage}
                          source={images.rightArrow}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </MaskedView>

              <MaskedView
                maskElement={
                  <View style={[styles.maskBackground, {height: 96}]}>
                    <View style={styles.maskContainer}></View>
                  </View>
                }>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.onPressScheduled}>
                  <View style={styles.buttonBackground}>
                    <View style={[styles.buttonContainer, {height: 96}]}>
                      <Image
                        source={images.buttonImageLeaf}
                        style={styles.secondMask}
                        resizeMode="contain"
                      />
                      <View style={styles.buttonAlign}>
                        <AppText
                          textWeight={'600'}
                          style={styles.buttonTextTop}>
                          Scheduled Care
                        </AppText>
                        <View style={styles.buttonContainerInner}>
                          <AppText textWeight={'500'} style={styles.buttonText}>
                            Choose the date and time{'\n'}you require care
                          </AppText>
                        </View>
                      </View>
                      <View style={styles.rightArrowImageContainer}>
                        <Image
                          style={styles.rightArrowImage}
                          source={images.rightArrow}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </MaskedView>
            </ScrollView>
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

export default connect(null, mapDispatchToProps)(PatientBookCaregiversInterim);
