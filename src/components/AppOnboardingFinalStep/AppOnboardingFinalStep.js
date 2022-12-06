import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { AppButton, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import { hasNotch } from '@freakycoder/react-native-helpers';

//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import { IsSmallScreen } from '@assets/util/dimensions';
import imgBoomLogo from '@assets/imagesAnim/boom-logo.png';

import * as AuthActions from '@ducks/auth';
import * as ProfileActions from '@ducks/profile';
import * as MyCalendarActions from '@ducks/myCalendar';
import * as TodaysAppointments from '@ducks/todaysAppointments';

class AppOnboardingFinalStep extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();

    this.state = {
      playing: false,
      isPaused: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
    analytics().logScreenView({
      screen_name: 'app_tutorial',
      screen_class: 'app_tutorial'
    });
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
    ////this.mixpanel.track('Play Video');
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
          <Image
            pointerEvents={'none'}
            style={styles.imagePlay}
            source={images.play}
          />
        </View>
      );
    }
    return null;
  };

  render() {
    const { playing, isPaused } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={imgBoomLogo} />
        </View>
        <ImageBackground
          style={styles.sliderContainer}
          resizeMode="contain"
          source={require('@assets/imagesAnim/background.png')}>
          <AppText textWeight="300" style={styles.textIntro}>
            Play video to see how it works
          </AppText>

          <View style={styles.flexDivided2}>
            {playing ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.onPressVideoPlayPause}>
                <Video
                  source={require('@assets/video/boom_mobile.mp4')}
                  ref={ref => {
                    this.videoRef = ref;
                  }}
                  paused={this.state.isPaused ? true : this.state.isPaused}
                  onEnd={this.onEnd}
                  style={styles.video} />
                {isPaused ? (
                  <Image style={styles.imagePause} source={images.pause} />
                ) : null}
              </TouchableOpacity>
            ) : (
              this.renderPlayButton()
            )}
          </View>
        </ImageBackground>
        <View style={styles.buttonsContainer}>
          <AppButton
            style={{ borderWidth: 1, borderColor: Colors.titleTextMain }}
            onPress={this.onEntryPointPress}
            width={220}
            height={38}
            backgroundColor={Colors.white}
            disabled={false}>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.buttonCaregiverText}>
              Sign Up
            </AppText>
          </AppButton>
          <AppButton
            style={styles.buttonPatient}
            onPress={this.onSignInPress}
            width={220}
            height={38}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.buttonPatientText}>
              Already signed up? Sign in.
            </AppText>
          </AppButton>
          <View>
            <TouchableHighlight
              style={styles.bottomLink}
              onPress={this.onSignUpLaterPress}
              underlayColor="transparent"
              hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
              <AppText textWeight="500" style={styles.textAlready}>
                Browse and Sign Up Later
              </AppText>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('screen');
const circleDiameter = width - 110;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textIntro: {
    fontSize: 25,
    textAlign: 'center',
    color: '#1c1c1c',
    marginTop: 20,
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonCaregiverText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.titleTextMain,
    fontSize: 14.5
  },
  buttonPatientText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '600'
  },
  textAlready: {
    textAlign: 'center',
    color: Colors.titleTextMain,
    fontSize: 13.5,
    fontWeight: '500'
  },
  buttonsRow: {
    borderWidth: 0,
    borderColor: 'green',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    flexDirection: 'row',
    width: '100%'
  },
  buttonsContainer: {
    borderWidth: 0,
    borderColor: 'green',
    height: 120,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: hasNotch() ? 40 : 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  playButtonOutside: {
    width: circleDiameter,
    height: circleDiameter,
    marginHorizontal: 40,
    backgroundColor: '#407bde',
    opacity: 0.07,
    borderRadius: circleDiameter * 0.5
  },
  imagePlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40
  },
  imagePause: {
    zIndex: 999,
    opacity: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40
  },
  video: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: width - 40,
    aspectRatio: 1.78,
    marginHorizontal: 20
  },
  flexDivided1: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flexDivided2: {
    height: circleDiameter,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'red'
  },
  flexDivided3: {
    marginTop: 50,
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderColor: 'orange'
  },
  logoContainer: {
    flex: 15
  },
  sliderContainer: {
    flex: 60,
    width: '100%',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flex: IsSmallScreen ? 30 : 25
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
        width: 130,
    height: 130,
    marginTop: 16
  },
  primaryButton: {
    marginBottom: 10,
    backgroundColor: Colors.titleTextMain
  },
  primaryButtonText: {
    color: 'white'
  },
  secondaryButton: {
    backgroundColor: Colors.titleTextMain,
    marginBottom: 10
  },
  secondaryButtonText: {
    color: Colors.titleTextMain
  },
  buttonStyles: {
    width: 200,
    paddingVertical: IsSmallScreen ? 7 : 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.titleTextMain
  },
  imageContainer: {
    flex: 70,
    width: '100%'
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: Colors.titleTextMain
  },
  bottomLink: {
    color: Colors.titleTextMain,
    borderBottomColor: Colors.titleTextMain,
    borderBottomWidth: 1,
    alignSelf: 'center'
  }
});

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

export default connect(null, mapDispatchToProps)(AppOnboardingFinalStep);
