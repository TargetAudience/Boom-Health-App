import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import MixpanelManager from '@utils/Analytics';
import images from '../../assets/images';
import { AppButton, BackArrow, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './SignUpLanding.styles';

class SignUpLanding extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Sign Up Landing');
  }

  onPressSignUpAccountMyself = () => {
    const { navigation } = this.props;

    navigation.navigate('SignUpAccount', { flowType: 'Myself' });
  };

  onPressSignUpAccountLovedOne = () => {
    const { navigation } = this.props;

    navigation.navigate('SignUpAccount', { flowType: 'LovedOne' });
  };

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  onPressClose = () => {
    const { navigation } = this.props;

    navigation.dismiss();
  };

  onPressSignIn = () => {
    const { navigation } = this.props;

    navigation.navigate('SignIn');
  };

  render() {
    const { navigation, subRole } = this.props;

    const showBackArrow = subRole !== 'guest' ? true : false;

    return (
      <SafeAreaView style={styles.container}>
        {showBackArrow ? (
          <BackArrow white onPressBack={this.onPressBack} />
        ) : (
          <BackArrow close white onPressBack={this.onPressClose} />
        )}
        <Image
          source={images.boomLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText textWeight="300" style={styles.textIntro}>To continue{'\n'}please sign up.</AppText>
        <AppButton
          onPress={this.onPressSignUpAccountMyself}
          width={220}
          height={38}
          backgroundColor={Colors.white}
          disabled={false}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonCaregiverText}>I'm Caring for Myself</AppText>
        </AppButton>
        <AppButton
          style={styles.buttonPatient}
          onPress={this.onPressSignUpAccountLovedOne}
          width={220}
          height={38}
          backgroundColor={Colors.buttonMain}
          disabled={false}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonPatientText}>I'm Caring for a Loved One</AppText>
        </AppButton>
        <TouchableHighlight
          onPress={this.onPressSignIn}
          underlayColor="transparent"
          hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textAlready}>Already signed up? Sign in.</AppText>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  subRole: state.auth.subRole
});

export default connect(
  mapStateToProps,
  null
)(SignUpLanding);
