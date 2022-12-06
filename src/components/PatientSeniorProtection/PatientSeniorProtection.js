import React, {Component} from 'react';
import {View, ScrollView, Platform, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppText, AppButton, HeaderWavy, BackArrow} from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors, Globals} from '@constants/GlobalStyles';
import styles from './PatientSeniorProtection.styles';
import images from '@assets/images';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as SettingsActions from '@ducks/settings';

const {width} = Dimensions.get('screen');

const firstFlav =
  'M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

class PatientSeniorProtection extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {settings} = this.props;

    analytics().logScreenView({
      screen_name: 'patient_senior_protection_packages',
      screen_class: 'patient_senior_protection_packages',
    });

    //this.mixpanel.track('View Senior Protection Packages');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientSeniorProtectionPackages');
  };

  renderRecommendedBullet = text => {
    return (
      <View style={styles.recommendedContainer}>
        <Image style={styles.recommendedBullet} source={images.checkmarkPink} />
        <AppText textWeight={'300'} style={styles.recommendedText}>
          {text}
        </AppText>
      </View>
    );
  };

  renderFeatureItem = (heading, body) => {
    return (
      <View style={styles.featureContainer}>
        <Image style={styles.featureBullet} source={images.checkmarkPinkB} />
        <View>
          <AppText textWeight={'500'} style={styles.featureText}>
            {heading}
          </AppText>
          <AppText textWeight={'300'} style={styles.featureTextB}>
            {body}
          </AppText>
        </View>
      </View>
    );
  };

  renderStepItem = (step, heading, body) => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <AppText textWeight={'500'} style={styles.stepNumberText}>
            {step}
          </AppText>
        </View>
        <View>
          <AppText textWeight={'500'} style={styles.stepText}>
            {heading}
          </AppText>
          <AppText textWeight={'300'} style={styles.stepTextB}>
            {body}
          </AppText>
        </View>
      </View>
    );
  };

  renderFeedbackItem = (name, text) => {
    return (
      <View style={styles.feedbackContainer}>
        <AppText textWeight={'200'} style={styles.feedbackText}>
          {text}
        </AppText>
        <AppText textWeight={'400'} style={styles.feedbackTextB}>
          {name}
        </AppText>
      </View>
    );
  };

  render() {
    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.containerB}>
                <HeaderWavy
                  customStyles={styles.svgCurve}
                  customHeight={160}
                  customTop={128}
                  customBgColor="#d3e2fa"
                  customWavePattern={firstFlav}
                />
                <BackArrow backIconDark onPressBack={this.onPressBack} />
                <View style={styles.headingContainer}>
                  <AppText textWeight={'600'} style={styles.heading}>
                    Help Your Loved One Continue to Live on their Terms
                  </AppText>
                  <AppText textWeight={'400'} style={styles.headingB}>
                    with Boom Senior Protection
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.subHeading}>
                  The Boom Senior Protection device is a portable, simple to use
                  medical alert device with a button that customers can press
                  anytime to receive urgent assistance.
                </AppText>

                <View style={styles.deviceImageContainer}>
                  <Image style={styles.deviceImage} source={images.device} />
                  <AppText textWeight={'300'} style={styles.textDescription}>
                    When activated and within seconds an operator receives an
                    alert (with their specific location) who can assess the
                    situation, talk with the customer, call for assistance, and
                    notify loved ones.
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.recommendedHeading}>
                  The Boom Senior Protection service is recommended for people
                  who:
                </AppText>

                <View style={styles.bulletsContainer}>
                  {this.renderRecommendedBullet(
                    'Have history, risk, or fear of falling',
                  )}
                  {this.renderRecommendedBullet(
                    'Have chronic conditions (cognitive impairment, COPD, diabetes, diabetes, arthritis, heart conditions, MS, stroke, osteoporosis, Parkinson’s disease, macular degeneration)',
                  )}
                  {this.renderRecommendedBullet('Have mobility problems')}
                  {this.renderRecommendedBullet('Have visual impairments')}
                  {this.renderRecommendedBullet(
                    'Are recovering after discharge from hospital',
                  )}
                </View>

                <View style={styles.photoLadyContainer}>
                  <Image style={styles.photoLady} source={images.lady} />
                </View>

                <AppText textWeight={'600'} style={styles.featuresHeading}>
                  Features
                </AppText>

                <View style={styles.bulletsContainer}>
                  {this.renderFeatureItem(
                    'Wireless',
                    'Take it wherever you go on a nationwide wireless network.',
                  )}
                  {this.renderFeatureItem(
                    'Direct GPS Location',
                    'Sends your position directly to the monitoring center and/or a loved one.',
                  )}
                  {this.renderFeatureItem(
                    'Lightweight',
                    'Weighs 1.5 ounces - comfortable to carry or wear.',
                  )}
                  {this.renderFeatureItem(
                    'Better Sounding',
                    'Crystal clear audio quality - No need to hold to the ear or mouth to listen or speak.',
                  )}
                  {this.renderFeatureItem(
                    'Waterproof',
                    'Wear it in the rain, or in the bath or shower.',
                  )}
                  {this.renderFeatureItem(
                    'Extended Battery Life',
                    '72 Hour Use - For maximum use between charges.',
                  )}
                </View>

                <AppText textWeight={'600'} style={styles.howItWorksHeading}>
                  How it Works
                </AppText>

                <View style={styles.stepsContainer}>
                  {this.renderStepItem(
                    '1',
                    'A fall is detected or button is pressed',
                    'With the push your emergency help button, or if the built in fall alert feature senses a fall, the pendant immediately connects you with a trained emergency response agent 24 hrs a day, 7 days a week.',
                  )}
                  {this.renderStepItem(
                    '2',
                    'A Trained agent makes contact in real time',
                    'A caring response agent will quickly access your personal profile and assess the situation.',
                  )}
                  {this.renderStepItem(
                    '3',
                    'Help is on way while we stay connected',
                    'Our trained agent will make sure you get the help you need, and stay in communication until help arrives. Based on your preferences your family and friends can be notified of the emergency in real time.',
                  )}
                </View>

                <AppText textWeight={'600'} style={styles.feedbackHeading}>
                  Feedback On Our Service
                </AppText>

                {this.renderFeedbackItem(
                  'B. Suzuki',
                  '"Thank you for taking care of my mother\'s safety. Your customer care team rocks!"',
                )}
                {this.renderFeedbackItem(
                  'R. Ash',
                  '"All I can say is that my mother is alive because of her Personal Emergency Response device...God Bless everyone at Senior Protection."',
                )}
                {this.renderFeedbackItem(
                  'L. Dragan',
                  '"I got this for my parents and the staff were great to deal with they explained step up step how to use the device. My mom was set up within 2 days and she is very happy with her pendant. Would definitely recommend getting this if you have a senior in the family."',
                )}
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
                      SELECT A PACKAGE
                    </AppText>
                  </AppButton>
                </View>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...SettingsActions}, dispatch),
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
  subRole: state.auth.subRole,
  profile: state.profile,
  settings: state.settings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientSeniorProtection);
