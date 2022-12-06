import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  Platform
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, ScreenWrapper } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './Account.styles';

export default class Account extends PureComponent {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Account');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressChangeEmail = () => {
    const { navigation } = this.props;

    navigation.navigate('ChangeEmail');
  };

  onPressChangePassword = () => {
    const { navigation } = this.props;

    navigation.navigate('ChangePassword');
  };

  render() {
    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="Account" onPressBack={this.onPressBack} />
        <ScrollView style={Globals.background}>
          <TouchableHighlight
            onPress={this.onPressChangeEmail}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.leftLabelText}>Change Email</AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressChangePassword}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.leftLabelText}>Change Password</AppText>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}
