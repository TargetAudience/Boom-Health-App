import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  AppText,
  CustomHeaderBack,
  ModalFeedback,
  NotificationsPromptBar
} from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import { Colors, Globals } from '@constants/GlobalStyles';
import styles from './CaregiverPersonalCareHome.styles';
import images from '@assets/images';

class PatientHome extends Component {
  constructor(props) {
    super(props);

    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;

    this.state = {
      isFeedBackModalOpen: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    analytics().logScreenView({
      screen_name: 'caregiverpersonalcare_home',
      screen_class: 'caregiverpersonalcare_home',
    });

   // //this.mixpanel.track('View Caregiver Personal Care Home');
  }

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

  onPressCaregiverMySchedule = () => {
    const { navigation } = this.props;

    navigation.navigate('CaregiverMyCalendar');
  };

  onPressCaregiverMyAvailabilityCalendar = () => {
    const { navigation } = this.props;

    navigation.navigate('CaregiverMyAvailabilityCalendar');
  };

  onPressCaregiverMyServices = () => {
    const { navigation } = this.props;

    navigation.navigate('CaregiverMyServices');
  };

  onPressCaregiverMyServiceRange = () => {
    const { navigation } = this.props;

    navigation.navigate('CaregiverMyServiceRange');
  };

  render() {
    const { auth } = this.props;
    const { isFeedBackModalOpen } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <>
          <CustomHeaderBack
            includeLogo
            onPressFeedback={this.onPressFeedback}
          />
          <NotificationsPromptBar />
        </>
        <View style={styles.welcomeContainer}>
          <AppText textWeight={'300'} style={styles.textWelcome}>
            Welcome back, <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.textWelcome2}>
              {auth.firstName}
            </AppText>
          </AppText>
        </View>

        <ScrollView>
          <TouchableHighlight
            onPress={this.onPressCaregiverMyAvailabilityCalendar}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.leftLabelText}>
                My Availability
              </AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressCaregiverMySchedule}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.leftLabelText}>
                My Scheduled Appointments
              </AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressCaregiverMyServices}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.leftLabelText}>
                My Services
              </AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressCaregiverMyServiceRange}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.leftLabelText}>
                My Service Range
              </AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>
        </ScrollView>
        <ModalFeedback
          onPressCancel={this.onPressCancel}
          isModalOpen={isFeedBackModalOpen}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PatientHome);
