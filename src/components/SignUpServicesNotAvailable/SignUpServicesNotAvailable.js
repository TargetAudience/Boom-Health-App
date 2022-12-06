import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
//import MixpanelManager from '@utils/Analytics';
import images from '@assets/images';
import { AppButton, BackArrow, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import styles from './SignUpServicesNotAvailable.styles';

export default class SignUpServicesNotAvailable extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Sign Up Services Not Available');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
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

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>  
        <BackArrow onPressBack={this.onPressBack} backIconDark />
        <View style={styles.containerAlign}>
          <Image style={styles.icon} source={images.locationSad} />
          <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textMessage}>We{"'"}re working on it!</AppText>
          <AppText textWeight={'400'} style={styles.textMessageB}>We{"'"}ll let you know when services are available in your area. Your interest will help get us there sooner.</AppText>

          <View style={styles.buttonContainer}>
            <AppButton
              style={styles.secondButton}
              onPress={this.onPressApp}
              width={190}
              height={38}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.buttonText}>Take me to the App</AppText>
            </AppButton>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
