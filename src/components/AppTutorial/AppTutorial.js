import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { AppButton, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './AppTutorial.styles';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointments from '@ducks/todaysAppointments';

class AppTutorial extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      playing: false,
      isPaused: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
    analytics().logScreenView({screen_name: 'app_tutorial', screen_class: 'app_tutorial'});
  }

  onEntryPointPress = () => {
    const { navigation } = this.props;

    navigation.navigate('SignUpLanding');
  };

  onSignInPress = () => {
    const { navigation } = this.props;

    navigation.navigate('SignIn');
  };

  onSignUpLaterPress = () => {
    const { navigation, actions } = this.props;

    actions.clearMyCalendar();
    actions.clearProfile();
    actions.clearTodaysAppointments();

    actions.signIn({
      isUserSignedIn: false,
      userId: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      role: 'patient',
      subRole: 'guest',
      accountHolder: 0,
      accessToken: '',
      userCaregiverPrimary: ''
    });

    navigation.navigate('GuestAuthFlowPatient');
  };

  onPressVideoPlayPause = async () => {
    const { isPaused } = this.state;

    if (!isPaused) {
      this.setState({ isPaused: true });
    } else {
      this.setState({ isPaused: false });
    }
  };

  onEnd = status => {
    const { playing } = this.state;

    if (playing) {
      this.setState({ playing: false });
    }
  };

  onPressPlay = () => {
    this.setState({ playing: true });
   // //this.mixpanel.track('Play Video');
    analytics().logEvent('play_video');
  };

  renderPlayButton = () => {
    const { playing } = this.state;

    if (!playing) {
      return (
        <View>
          <TouchableOpacity
            style={styles.playButtonOutside}
            onPress={this.onPressPlay}
            activeOpacity={0.065}
          />
          <Image pointerEvents={'none'} style={styles.imagePlay} source={images.play} />
        </View>
      );
    }
    return null;
  };

  render() {
    const { playing, isPaused } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={images.boomLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.flexDivided1}>
          <AppText textWeight="300" style={styles.textIntro}>Play video to see how it works</AppText>
        </View>
        <View style={styles.flexDivided2}>
          {playing ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.onPressVideoPlayPause}>
              <Video 
                source={require('../../assets/video/boom_mobile.mp4')}
                ref={(ref) => { this.videoRef = ref }}
                paused = {this.state.isPaused ? true : this.state.isPaused }
                onEnd={this.onEnd}
                style={styles.video}>
              </Video>
              {isPaused ? (
                <Image style={styles.imagePause} source={images.pause} />
              ) : null}
            </TouchableOpacity>
          ) : (
            this.renderPlayButton()
          )}
        </View>
        <View style={styles.flexDivided3}>
          <View style={styles.buttonsContainer}>
            <AppButton
              onPress={this.onEntryPointPress}
              width={220}
              height={38}
              backgroundColor={Colors.white}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonCaregiverText}>Sign Up</AppText>
            </AppButton>
            <AppButton
              style={styles.buttonPatient}
              onPress={this.onSignInPress}
              width={220}
              height={38}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonPatientText}>Already signed up? Sign in.</AppText>
            </AppButton>
            <View>
              <TouchableHighlight
                onPress={this.onSignUpLaterPress}
                underlayColor="transparent"
                hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
                <AppText textWeight="500" style={styles.textAlready}>Browse and Sign Up Later</AppText>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...ProfileActions,
      ...MyCalendarActions,
      ...TodaysAppointments
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(AppTutorial);

