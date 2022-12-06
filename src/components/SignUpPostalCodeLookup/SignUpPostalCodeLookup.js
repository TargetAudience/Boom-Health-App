import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormWrapper, InputWithLabel, ButtonLoading, AppText } from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import { validatePostalCode, validateZipCode } from '@utils/Globals';
import { Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './SignUpPostalCodeLookup.styles';
import UserApi from '@api/userApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as ProfileActions from '@ducks/profile';

class SignUpPostalCodeLookup extends Component {
  constructor(props) {
    super(props);

    const flowType = this.props.navigation.getParam('flowType', '');

    let buttonLabel =
      flowType === 'Myself'
        ? 'Check if Services are in my Area'
        : 'Check if Services are in this Area';
    let postalCodeLabel =
      flowType === 'Myself' ? 'Zip Code or Postal Code' : 'Zip Code or Postal Code of Loved One';
    let introMessage =
      flowType === 'Myself'
        ? "To see if we're in your area,\nlet's do a quick check."
        : "To see if we're in your loved one's area,\nlet's do a quick check.";

    // m4l1g2
    
    this.state = {
      postalCode: '',
      postalCodeLabel,
      buttonLabel,
      introMessage,
      flowType,
      actionLoading: false
    };

    this.onPressFind = this.onPressFind.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Sign Up Postal Code Lookup');
  }

  async onPressFind() {
    const { navigation, actions } = this.props;
    const { postalCode, flowType } = this.state;

    if (postalCode === '') {
      actions.setAlert('Be sure to enter a zip code or postal code.');
      return;
    } else if (postalCode.length < 5) {
      actions.setAlert('Be sure to enter a valid zip code or postal code.');
      return;
    }

    this.setState({ actionLoading: true });

    await UserApi.postalCodeLookup({
      postalCode
    })
      .promise.then(async result => {
        const data = result.data;

        this.setState({ actionLoading: false });

        if (Number(data.error) === 1) {
          actions.setAlert(data.errorMessage);
        } else {
          actions.setServicesAvailable(data.services);

          navigation.navigate('SignUpServices', {
            flowType,
            available: data.available,
            city: data.city,
            province: data.province,
            postalCode,
            services: data.services
          });
        }
      })
      .catch(error => {
        console.log('SignUpPostalCodeLookup error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  render() {
    const {
      postalCode,
      postalCodeLabel,
      buttonLabel,
      introMessage,
      actionLoading
    } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <ScrollView>
          <View style={styles.outerContainer}>
            <Image style={styles.icon} source={images.location} />

            <AppText textWeight={`${(Platform.OS === 'ios') ? '500' : '400'}`} style={styles.textMessage}>{introMessage}</AppText>

            <FormWrapper style={styles.containerAlign}>
              <InputWithLabel
                onRef={this.confirmPasswordInputRef}
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel
                ]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
                underlineColorAndroid="transparent"
                maxLength={6}
                numberOfLines={1}
                returnKeyType="done"
                placeholder={postalCodeLabel}
                value={postalCode}
                onChangeText={text =>
                  this.setState({ postalCode: text.toUpperCase() })
                }
                onSubmitEditing={this.onPressFind}
              />
              <View>
                <ButtonLoading
                  onPress={this.onPressFind}
                  isLoading={actionLoading}
                  containerStyle={FormStyles.button}>
                  <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>{buttonLabel}</AppText>
                </ButtonLoading>
              </View>
            </FormWrapper>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AuthActions,
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpPostalCodeLookup);
