import React, { Component } from 'react';
import { View } from 'react-native';
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
  AppText
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import { validatePostalCode } from '@utils/Globals';
import styles from './CaregiverMyServiceRange.styles';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import PersonalCareCalendarApi from '@api/personalCareCalendarApi';

const distances = [
  { key: '5', label: '5 Kms', value: '5' },
  { key: '10', label: '10 Kms', value: '10' },
  { key: '15', label: '15 Kms', value: '15' },
  { key: '20', label: '20 Kms', value: '20' },
  { key: '25', label: '25 Kms', value: '25' },
  { key: '30', label: '30 Kms', value: '30' }
];

class CaregiverMyServiceRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postalCode: props.auth.postalCode,
      distance: props.auth.travelDistance.toString(),
      actionLoading: false
    };

    this.onPressSend = this.onPressSend.bind(this);
    this.nextKeyboardDistance = this.nextKeyboardDistance.bind(this);
    this.distanceRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Caregiver My Service Range');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  nextKeyboardDistance() {
    this.distanceRef.togglePicker(true);
  }

  async onPressSend() {
    const { actions } = this.props;
    const { distance, postalCode } = this.state;

    if (validatePostalCode(postalCode)) {
      actions.setAlert('Be sure to enter a valid postal code.');
      return;
    } else if (postalCode.length < 6) {
      actions.setAlert('Be sure your postal code is 6 characters.');
      return;
    }

    if (distance === '') {
      actions.setAlert('Please enter your travel distance.');
      return;
    }

    this.setState({ actionLoading: true });

    const that = this;
    await PersonalCareCalendarApi.updateServiceRange({
      distance,
      postalCode
    })
      .promise.then(async result => {
        const data = result.data;

        that.setState({ actionLoading: false });
        actions.setServiceRange({distance, postalCode});
        actions.setAlert('Your service range has been updated.');
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  render() {
    const { distance, postalCode, actionLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="My Service Range" onPressBack={this.onPressBack} />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <InputWithLabel
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={6}
              numberOfLines={1}
              returnKeyType="next"
              keyboardType="email-address"
              label="Postal Code for Service Area"
              value={postalCode}
              onSubmitEditing={this.nextKeyboardDistance}
              onChangeText={text => this.setState({ postalCode: text.toUpperCase() })}
            />
            <InputWithLabel
              onRef={ref => { this.distanceRef = ref }}
              select
              items={distances}
              selectValue={distance}
              containerStyle={[
                FormStyles.inputSelect,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={2}
              numberOfLines={1}
              returnKeyType="next"
              label="Travel Distance from Postal Code"
              onDonePress={this.nextKeyboardDistance}
              onValueChange={text => this.setState({ distance: text })}
            />
            <AppText textWeight="500" style={styles.instructionsText}>Distance in Kilometers you are able to travel</AppText>
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressSend}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>Update</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverMyServiceRange);
