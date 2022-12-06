import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppButton,
  CustomHeaderBack,
  ModalFeedback,
  AppText,
} from '@components/common';
import { PubSubContext } from 'src/pubsub';
import images from '@assets/images';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import { Colors, Globals } from '@constants/GlobalStyles';
import styles from './SettingsPersonalCare.styles';
import { version } from '@lib/Settings';

import * as AuthActions from '@ducks/auth';
import * as SettingsActions from '@ducks/settings';
import * as AlertActions from '@ducks/alert';
import * as PubNubActions from '@ducks/pubnub';
import * as ProfileActions from '@ducks/profile';

class SettingsPersonalCare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      isFeedBackModalOpen: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
    analytics().logScreenView({
      screen_name: 'personalcare_settings',
      screen_class: 'personalcare_settings'
    });
  }

  componentDidMount() {
    //this.mixpanel.track('View Personal Care Settings Home');
  }

  onPressChangePassword = () => {
    const { navigation } = this.props;

    navigation.navigate('ChangePassword');
  };

  onPressAccount = () => {
    const { navigation } = this.props;

    navigation.navigate('Account');
  };

  onPressMyProfile = () => {
    const { navigation } = this.props;

    navigation.navigate('MyProfile');
  };

  onPressNotifications = () => {
    const { navigation } = this.props;

    navigation.navigate('Notifications');
  };

  onPressHelp = () => {
    const { navigation } = this.props;

    navigation.navigate('ContactUs');
  };

  onPressFeedback = () => {
    this.setState({
      isFeedBackModalOpen: true
    });
  };

  onPressCancel = () => {
    this.setState({
      isFeedBackModalOpen: false
    });
  };

  onPressLegal = () => {
    const { navigation } = this.props;

    navigation.navigate('LaunchWebView', {
      title: '',
      link: 'https://boom.health/registration/terms',
      backArrow: true
    });
  };

  onPressSignOut = async () => {
    const { navigation, actions } = this.props;

    actions.signOut();
    actions.clearProfile();

    // this.mixpanel.reset();
    analytics().logEvent('sign_out');
    analytics().resetAnalyticsData();

    //this.mixpanel.track('Sign Out');

    await AsyncStorage.clear();

    navigation.navigate('PreAuthFlow');
  };

  render() {
    const { auth } = this.props;
    const { isFeedBackModalOpen } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <View style={styles.container}>
          <CustomHeaderBack title="Settings" />
          <ScrollView>
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
      </SafeAreaView>
    );
  }
  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...SettingsActions,
      ...AlertActions,
      ...PubNubActions,
      ...ProfileActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPersonalCare);
