import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableHighlight, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppButton, GenericModal, CheckmarkToggle, AppText } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './CovidSurvey.styles';
import { nearestPastMinutes } from '@utils/Globals';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

const { width } = Dimensions.get('screen');

class CovidSurvey extends Component {
  constructor(props) {
    super(props);

    const fromSection = this.props.navigation.getParam(
      'fromSection',
      []
    );
    const savedState = this.props.navigation.getParam(
      'savedState',
      []
    );
    const services = this.props.navigation.getParam(
      'services',
      []
    );
    const firstCaregiver = this.props.navigation.getParam(
      'firstCaregiver',
      []
    );
    const secondCaregiver = this.props.navigation.getParam(
      'secondCaregiver',
      []
    );

    const postCovidPage = this.props.navigation.getParam(
      'postCovidPage',
      []
    );

    this.state = {
      fromSection,
      savedState,
      firstCaregiver,
      secondCaregiver,
      services,
      postCovidPage,
      question1Answer: '',
      question2Answer: '',
      question3Answer: '',
      question4Answer: '',
      question5Answer: '',
      question6Answer: '',
      isResultModalOpen: false,
      finalResult: '',
      buttonLabel: ''
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCancel = () => {
    this.setState({ isResultModalOpen: false });
  };

  onPressNext = from => {
    const { actions } = this.props;
    const { question1Answer, question2Answer, question3Answer, question4Answer, question5Answer, question6Answer } = this.state;

    if (question1Answer === '' || question2Answer === '' || question3Answer === '' || question4Answer === '' || question5Answer === '' || question6Answer === '') {
      actions.setAlert('Please be sure to answer all questions.');
      return;
    }

    let finalResult = '';
    let resultMessage = '';
    let buttonLabel = '';
    let modalHeight = 0;
    let scrollHeight = 0;
    if (question1Answer === 'no' && question2Answer === 'no' && question3Answer === 'no' && question4Answer === 'no' && question5Answer === 'no' && question6Answer === 'no') {
      finalResult = 'pass';
      resultMessage = 'Thank you for completing the questionnaire. Please continue with your booking.';
      buttonLabel = 'Continue';
      modalHeight = 210;
      scrollHeight = 75;
    } else {
      finalResult = 'fail';
      resultMessage ='Thank you for completing the questionnaire. Based on your answers, we recommend that your loved one get tested because he or she has symptoms or is a "close contact" of someone who currently has COVID-19. Unfortunately we can\'t send a caregiver at this time.';
      buttonLabel = 'Close';
      modalHeight = 280;
      scrollHeight = 145;
    }

    this.setState({ modalHeight, scrollHeight, buttonLabel, finalResult, resultMessage, isResultModalOpen: true });
  };

  onPressContinue = () => {
    const { navigation } = this.props;
    const { savedState, postCovidPage, services, firstCaregiver, secondCaregiver, finalResult } = this.state;

    //('View Health Assessment ' + postCovidPage);

    this.setState({ isResultModalOpen: false });

    if (finalResult === 'pass') {
      navigation.navigate(postCovidPage, {
        savedState, services, firstCaregiver, secondCaregiver
      });
    }
  };

  onPressAnswer = (questionNum, answer) => {
    if (questionNum === 'question1') {
      this.setState({ question1Answer: answer });
    } else if (questionNum === 'question2') {
      this.setState({ question2Answer: answer });
    } else if (questionNum === 'question3') {
      this.setState({ question3Answer: answer });
    } else if (questionNum === 'question4') {
      this.setState({ question4Answer: answer });
    } else if (questionNum === 'question5') {
      this.setState({ question5Answer: answer });
    } else if (questionNum === 'question6') {
      this.setState({ question6Answer: answer });
    }
  }

  render() {
    const { modalHeight, scrollHeight, buttonLabel, resultMessage, isResultModalOpen, question1Answer, question2Answer, question3Answer, question4Answer, question5Answer, question6Answer } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title="Health Assessment" onPressBack={this.onPressBack} />
       
          <ScrollView style={styles.container}>
            <View style={styles.introContainer}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textIntroBold}>Covid-19 Survey</AppText>
            </View>
            <View style={styles.bodyContainer}>
              <AppText textWeight="300" style={styles.textIntro}>In the past 14-days has the patient or anyone in the patient's household had any of the following symptoms?</AppText>
              <Checkmark text="Fever" checked={question1Answer} onPress={(answer) => this.onPressAnswer('question1', answer)} />
              <Checkmark text="Cough" checked={question2Answer} onPress={(answer) => this.onPressAnswer('question2', answer)} />
              <Checkmark text="Sore Throat" checked={question3Answer} onPress={(answer) => this.onPressAnswer('question3', answer)} />
              <Checkmark text="Shortness of Breath" checked={question4Answer} onPress={(answer) => this.onPressAnswer('question4', answer)} />

              <AppText textWeight="300" style={[styles.textIntro, styles.textIntroGapBottom]}>In the past 14-days has the patient or anyone in the patient's household:</AppText>
              <Checkmark text="Had close contact with anyone who exhibited the above symptoms or tested positive for Coronavirus (COVID-19)" checked={question5Answer} onPress={(answer) => this.onPressAnswer('question5', answer)} />
              <Checkmark text="Returned from travel from outside the country" checked={question6Answer} onPress={(answer) => this.onPressAnswer('question6', answer)} />
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomContainerInner}>
              <AppButton
                style={styles.button}
                onPress={this.onPressNext}
                width={width - 20}
                height={42}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>NEXT</AppText>
              </AppButton>
            </View>
          </View>
       
        <GenericModal
          onPressOne={this.onPressContinue}
          buttonOneLabel={buttonLabel}
          isModalOpen={isResultModalOpen}
          onPressCloseButton={this.onPressCancel}
          titleText="Information Submitted"
          buttonOneWidth={160}
          modalHeight={modalHeight}
          scrollHeight={scrollHeight}
          helpText={resultMessage}
        />
      </SafeAreaView>
    );
  }
}

const Checkmark = ({ text, checked, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={1}
    underlayColor={Colors.white}>
    <View style={styles.questionContainer}>
      <AppText textWeight="500" style={styles.questionText}>{text}</AppText>
      <View style={styles.answerContainer}>
        <View style={styles.checkmarkContainer}>
          <CheckmarkToggle checked={checked === 'yes'} onPress={() => onPress('yes')} />
          <AppText textWeight="500" style={styles.answerText}>YES</AppText>
        </View>
        <View style={styles.checkmarkContainer}>
          <CheckmarkToggle checked={checked === 'no'} onPress={() => onPress('no')} />
          <AppText textWeight="500" style={styles.answerText}>NO</AppText>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidSurvey);
