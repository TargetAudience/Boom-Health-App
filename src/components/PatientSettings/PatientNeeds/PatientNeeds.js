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
  AppText,
  ScreenWrapper
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './PatientNeeds.styles';

import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class PatientNeeds extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      patientAge: '',
      healthConditions: '',
      needs: '',
      actionLoading: false
    };

    this.onPressUpdate = this.onPressUpdate.bind(this);

    this.patientsAgeRef = React.createRef();
    this.patientHealthConditionsRef = React.createRef();

    this.nextKeyboardPatientHealthConditions = this.nextKeyboardPatientHealthConditions.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();

    //this.mixpanel.track('View Settings Patient Needs');
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    ProfileApi.getPatientNeeds()
      .promise.then(result => {
        const data = result.data;

        const patientNeeds = data.patientNeeds;

        this.setState({ 
          actionLoading: false,
          patientAge: patientNeeds['patientAge'],
          healthConditions: patientNeeds['healthConditions'],
          needs: patientNeeds['needs']
        });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  async onPressUpdate() {
    const { actions } = this.props;
    const { actionLoading, patientAge, healthConditions, needs } = this.state;

    if (actionLoading) {
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.updatePatientNeeds({
      patientAge,
      healthConditions,
      needs
    })
      .promise.then(async result => {
        this.setState({ actionLoading: false });

        actions.setProfileNeeds({
          patientAge,
          healthConditions,
          needs
        });
        actions.setAlert('Patient needs has been updated.');
      })
      .catch(error => {
        console.log('Patient needs error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  nextKeyboardPatientHealthConditions() {
    this.patientsAgeRef.togglePicker(true);
    setTimeout(() => {
      this.patientHealthConditionsRef.current.focus();
    }, 200);
  }

  getAges() {
    let ages = [];
    for (var i = 1; i <= 99; i++) {
      ages.push({ key: i.toString(), label: i.toString(), value: i });
    }
    return ages;
  }

  render() {
    const { patientAge, healthConditions, needs, actionLoading } = this.state;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Patient Needs"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView style={styles.container} extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <Text style={styles.instructionsText}>
              Information provided will be shared with service providers to
              help assist in the care of your family member.
            </Text>
            <InputWithLabel
              onRef={ref => { this.patientsAgeRef = ref }}
              select
              items={this.getAges()}
              selectValue={patientAge}
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
              label="Age"
              onValueChange={text => this.setState({ patientAge: text })}
              onDonePress={this.nextKeyboardPatientHealthConditions}
            />
            <InputWithLabel
              onRef={this.patientHealthConditionsRef}
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
              label="Health Conditions"
              value={healthConditions}
              onChangeText={text => this.setState({ healthConditions: text })}
            />
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
              label="Needs and Assistance Requirements"
              value={needs}
              secureTextEntry
              onChangeText={text => this.setState({ needs: text })}
            />
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onPressUpdate}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={FormStyles.buttonText}>Update Patient Needs</AppText>
              </ButtonLoading>
            </View>
          </FormWrapper>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientNeeds);
