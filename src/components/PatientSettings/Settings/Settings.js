import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  AppButton,
  CustomHeaderBack,
  ModalFeedback,
  AppText,
} from '@components/common';
import {PubSubContext} from 'src/pubsub';
import images from '@assets/images';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors, Globals} from '@constants/GlobalStyles';
import styles from './Settings.styles';
import {version} from '@lib/Settings';
import CryptoES from 'crypto-es';
import {genRanHex} from '@utils/Globals';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as AuthActions from '@ducks/auth';
import * as SettingsActions from '@ducks/settings';
import * as AlertActions from '@ducks/alert';
import * as PubNubActions from '@ducks/pubnub';
import * as ProfileActions from '@ducks/profile';

import ProfileApi from '@api/profileApi';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      isFeedBackModalOpen: false,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
    analytics().logScreenView({
      screen_name: 'settings',
      screen_class: 'settings',
    });
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Home');
  }

  async onPressSend() {
    const key = CryptoES.enc.Hex.parse('B716D4E001AC020A176F825D3F9AA1EC');
    const generateIV = genRanHex(32);
    const iv = CryptoES.enc.Hex.parse(generateIV);
    const data = {
      message: 'Message JOSH4',
    };
    const ciphertext = CryptoES.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
    }).toString();

    console.log('data', data);
    console.log('ciphertext', ciphertext);

    await ProfileApi.testCrypto({encrypted: ciphertext, iv: generateIV})
      .promise.then(async result => {
        const data = result.data;
        console.log('data', data);
      })
      .catch(error => {
        console.log('testCrypto error', error);
      });
  }

  onPressChangePassword = () => {
    const {navigation} = this.props;

    navigation.navigate('ChangePassword');
  };

  onPressAccount = () => {
    const {navigation} = this.props;

    navigation.navigate('Account');
  };

  onPressMyProfile = () => {
    const {navigation} = this.props;

    navigation.navigate('MyProfile');
  };

  onPressPatientInformation = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientInformation');
  };

  onPressPatientNeeds = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientNeeds');
  };

  onPressPaymentInfo = () => {
    const {navigation} = this.props;

    navigation.navigate('PaymentInfo');
  };

  onPressPaymentHistory = () => {
    const {navigation} = this.props;

    navigation.navigate('PaymentHistory');
  };

  onPressFamilyMembers = () => {
    const {navigation} = this.props;

    navigation.navigate('FamilyMembers');
  };

  onPressNotifications = () => {
    const {navigation} = this.props;

    navigation.navigate('Notifications');
  };

  onPressFaq = () => {
    const {navigation} = this.props;

    navigation.navigate('LaunchWebView', {
      title: '',
      link: 'https://boomhealth.joshwinter.com',
      backArrow: true,
    });
  };

  onPressHelp = () => {
    const {navigation} = this.props;

    navigation.navigate('ContactUs');

    /*navigation.navigate('LaunchWebView', {
      title: '',
      link: 'https://boomhealth.joshwinter.com',
      backArrow: true
    });*/
  };

  onPressFeedback = () => {
    this.setState({
      isFeedBackModalOpen: true,
    });
  };

  onPressCancel = () => {
    this.setState({
      isFeedBackModalOpen: false,
    });
  };

  onPressLegal = () => {
    const {navigation} = this.props;

    navigation.navigate('LaunchWebView', {
      title: '',
      link: 'https://boom.health/registration/terms',
      backArrow: true,
    });
  };

  onPressSignOut = async () => {
    const {pubsub} = this.context;
    const {navigation, actions} = this.props;

    actions.signOut();
    actions.clearHereNow();
    actions.clearProfile();
    actions.clearPubNub();

    pubsub.closeConnections();

    // this.mixpanel.reset();
    analytics().logEvent('sign_out');
    analytics().resetAnalyticsData();

    //this.mixpanel.track('Sign Out');

    await AsyncStorage.clear();

    navigation.navigate('PreAuthFlow');
  };

  render() {
    const {auth, familyMyself} = this.props;
    const {isFeedBackModalOpen} = this.state;

    const showFamilySectionPre = auth.subRole !== 'myself';
    const showFamilySection =
      showFamilySectionPre &&
      !Number(familyMyself.blocked) &&
      Number(familyMyself.admin);
    const showPatientInformation =
      auth.subRole == 'lovedOne' || auth.subRole == 'familyMember'
        ? true
        : false;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top}]}>
            <CustomHeaderBack title="Settings" />
            <ScrollView style={styles.containerB}>
              <TouchableHighlight
                onPress={this.onPressAccount}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Account
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onPressMyProfile}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    My Profile
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              {showPatientInformation ? (
                <TouchableHighlight
                  onPress={this.onPressPatientInformation}
                  activeOpacity={0.6}
                  underlayColor={Colors.white}>
                  <View style={styles.rowContainer}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.leftLabelText}>
                      Patient Information
                    </AppText>
                    <Image
                      style={Globals.iconChevron}
                      source={images.iconChevron}
                    />
                  </View>
                </TouchableHighlight>
              ) : null}

              <TouchableHighlight
                onPress={this.onPressPatientNeeds}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Patient Needs
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <View style={styles.spacer} />

              {showFamilySection ? (
                <TouchableHighlight
                  onPress={this.onPressFamilyMembers}
                  activeOpacity={0.6}
                  underlayColor={Colors.white}>
                  <View style={styles.rowContainer}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.leftLabelText}>
                      Family Members
                    </AppText>
                    <Image
                      style={Globals.iconChevron}
                      source={images.iconChevron}
                    />
                  </View>
                </TouchableHighlight>
              ) : null}

              <TouchableHighlight
                onPress={this.onPressPaymentInfo}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Payment Information
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onPressPaymentHistory}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Order History
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onPressNotifications}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Notifications
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <View style={styles.spacer} />

              <TouchableHighlight
                onPress={this.onPressLegal}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Legal Information
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onPressHelp}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Help or Contact Us
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.onPressFeedback}
                activeOpacity={0.6}
                underlayColor={Colors.white}>
                <View style={styles.rowContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.leftLabelText}>
                    Feedback
                  </AppText>
                  <Image
                    style={Globals.iconChevron}
                    source={images.iconChevron}
                  />
                </View>
              </TouchableHighlight>

              <View style={styles.usernameContainer}>
                <AppText textWeight="300" style={styles.signedInAsText}>
                  SIGNED IN AS
                </AppText>
                <AppText textWeight="400" style={styles.emailText}>
                  {auth.emailAddress.toUpperCase()}
                </AppText>
              </View>

              <AppButton
                style={styles.signOutButtonContainer}
                onPress={this.onPressSignOut}
                width={110}
                height={32}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <AppText textWeight="600" style={styles.signOutButtonText}>
                  SIGN OUT
                </AppText>
              </AppButton>

              <Text style={styles.appVersionText}>Version {version}</Text>
            </ScrollView>
            <ModalFeedback
              onPressCancel={this.onPressCancel}
              isModalOpen={isFeedBackModalOpen}
            />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  auth: state.auth,
  familyMyself: state.profile.familyMyself,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...SettingsActions,
      ...AlertActions,
      ...PubNubActions,
      ...ProfileActions,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
