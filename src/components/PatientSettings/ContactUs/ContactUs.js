import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppButton,
  AppText,
  ScreenWrapper
} from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './ContactUs.styles';
import { persistor } from '@state/store';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';

import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      actionLoading: false
    };

    this.onPressSend = this.onPressSend.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Contact Us');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressClearPersist = () => {
    persistor.purge();
  };

  onPressPurchaseFB = () => {
    analytics().logPurchase({ transaction_id: '123', value: 10.00, currency: 'CAD' });
  };

  onPressTestEventFB = () => {
    AppEventsLogger.logEvent('Visited Meals');
  };

  async onPressSend() {
    const { actions } = this.props;
    const { note } = this.state;

    if (note === '') {
      actions.setAlert('Please enter a note.');
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.sendContactUs({
      note
    })
      .promise.then(async result => {
        this.setState({ actionLoading: false, note: '' });

        //this.mixpanel.track('Sent Contact Us');

        actions.setAlert('You note has been sent. If applicable, you\'ll hear from us soon. Thank you!.');
      })
      .catch(error => {
        console.log('Contact us error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  render() {
    const { auth } = this.props;
    const { note, actionLoading } = this.state;

    const isAdmin = auth.lastName.includes('123') ? true : false;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Help or Contact Us"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView style={styles.container} extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '400' : '300'}`} style={styles.instructionsText}>Need help with our services or app? Contact us for fast, friendly customer service and technical support.</AppText>
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerMultiLine,
                FormStyles.inputContainerLabel
              ]}
              maxLength={1000}
              textAlignVertical="top"
              multiline
              style={FormStyles.inputStyleMultiLine}
              autoCorrect={true}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              returnKeyType="next"
              label="Note"
              value={note}
              onChangeText={text => this.setState({ note: text })}
            />
            <View>
              <ButtonLoading
                onPress={this.onPressSend}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Send Note</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
          {isAdmin ? 
            <View style={styles.buttonContainer}>
              <AppButton
                onPress={this.onPressClearPersist}
                width={170}
                height={38}
                backgroundColor={Colors.buttonSecondary}
                disabled={false}>
                <Text style={styles.buttonText}>Clear Persist</Text>
              </AppButton>
              <AppButton
                onPress={this.onPressPurchaseFB}
                width={170}
                height={38}
                backgroundColor={Colors.buttonSecondary}
                disabled={false}>
                <Text style={styles.buttonText}>Register Purchase Firebase</Text>
              </AppButton>
              <AppButton
                onPress={this.onPressTestEventFB}
                width={170}
                height={38}
                backgroundColor={Colors.buttonSecondary}
                disabled={false}>
                <Text style={styles.buttonText}>Test Event FB</Text>
              </AppButton>
            </View>
          : null }
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
