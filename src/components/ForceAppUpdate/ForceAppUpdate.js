import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Linking, Platform } from 'react-native';
import images from '../../assets/images';
import { AppButton, BackArrow } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './ForceAppUpdate.styles';

/*
As of writing, this format works:
itms-apps://itunes.apple.com/app/id1514706662
itms-apps://itunes.apple.com/app/id<yourid>

If you log into https://appstoreconnect.apple.com
you can get your appid from the url: 
https://appstoreconnect.apple.com/apps/<yourid>/appstore/info

Linking.openUrl('itms-apps://itunes.apple.com/app/id1514706662');

itms-apps://itunes.apple.com/ca/app/id1514706662?mt=8

https://apps.apple.com/us/app/boom-health/id1514706662
*/

const storeUrl = Platform.select({
  ios: "https://apps.apple.com/us/app/boom-health/id1514706662",
  android: "market://details?id=name.com.app"
});

class ForceAppUpdate extends Component {
  onPressSignUpdateApp = () => {
    Linking.openURL(storeUrl).catch((error) => {
      console.log('error opening link.', error);
    });
  };

  render() {
    const { navigation, subRole } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={images.boomLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.textIntro}>We're better than ever</Text>
        <Text style={styles.textIntroB}>We have a new version the app waiting for you in the App Store. Please update the app.</Text>
        <AppButton
          onPress={this.onPressSignUpdateApp}
          width={200}
          height={38}
          backgroundColor={Colors.white}
          disabled={false}>
          <Text style={styles.buttonText}>Update to New Version</Text>
        </AppButton>
      </SafeAreaView>
    );
  }
}

export default ForceAppUpdate;
