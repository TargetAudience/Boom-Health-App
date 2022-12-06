import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, Switch, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, CheckmarkToggle, FormWrapper, InputWithLabel } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersInstructions.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

const whenDose = [
  { type: 'withoutInstruction', display: 'Without instruction' },
  { type: 'beforeMeals', display: 'Before meals' },
  { type: 'whileEating', display: 'While eating' },
  { type: 'afterMeals', display: 'After meals' },
  { type: 'beforeBedtime', display: 'Before bedtime' }
];

const beforeMeal = [
  { type: 'withoutATime', display: 'Without specifying the time' },
  { type: '5Mins', display: '5 minutes before a meal' },
  { type: '10Mins', display: '10 minutes before a meal' },
  { type: '15Mins', display: '15 minutes before a meal' },
  { type: '20Mins', display: '20 minutes before a meal' },
  { type: '25Mins', display: '25 minutes before a meal' },
  { type: '30Mins', display: '30 minutes before a meal' },
  { type: '40Mins', display: '40 minutes before a meal' },
  { type: '50Mins', display: '50 minutes before a meal' },
  { type: '1Hour', display: '1 hour before a meal' },
  { type: '2Hours', display: '2 hours before a meal' },
  { type: '3Hours', display: '3 hours before a meal' },
  { type: '4Hours', display: '4 hours before a meal' },
  { type: '5Hours', display: '5 hours before a meal' },
  { type: '6Hours', display: '6 Hours before a meal' }
];

const afterMeal = [
  { type: 'withoutATime', display: 'Without specifying the time' },
  { type: '5Mins', display: '5 minutes after a meal' },
  { type: '10Mins', display: '10 minutes after a meal' },
  { type: '15Mins', display: '15 minutes after a meal' },
  { type: '20Mins', display: '20 minutes after a meal' },
  { type: '25Mins', display: '25 minutes after a meal' },
  { type: '30Mins', display: '30 minutes after a meal' },
  { type: '40Mins', display: '40 minutes after a meal' },
  { type: '50Mins', display: '50 minutes after a meal' },
  { type: '1Hour', display: '1 hour after a meal' },
  { type: '2Hours', display: '2 hours after a meal' },
  { type: '3Hours', display: '3 hours after a meal' },
  { type: '4Hours', display: '4 hours after a meal' },
  { type: '5Hours', display: '5 hours after a meal' },
  { type: '6Hours', display: '6 Hours after a meal' }
];

class MedicationRemindersInstructions extends Component {
  constructor(props) {
    super(props);

    let checkedWhenDose = [];
    checkedWhenDose.type = 'withoutInstruction';
    checkedWhenDose.display = null;

    let checkedBeforeMeal = [];
    checkedBeforeMeal.type = 'withoutATime';
    checkedBeforeMeal.display = null;

    let checkedAfterMeal = [];
    checkedAfterMeal.type = 'withoutATime';
    checkedAfterMeal.display = null;

    this.state = {
      ownInstructionText: '',
      addOwnInstruction: false,
      checkedWhenDose,
      checkedBeforeMeal,
      checkedAfterMeal,
      showBeforeMeals: false,
      showAfterMeals: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   // //this.mixpanel.track('View Medication Reminders Instruction');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  onChangeOwnInstruction = () => {
    const { addOwnInstruction } = this.state;

    this.setState({ addOwnInstruction: !addOwnInstruction });
  };

  isCheckedBeforeMeal = item => {
    const { checkedBeforeMeal } = this.state;

    if (checkedBeforeMeal.type === item.type) {
      return true;
    }
    return false;
  };

  isCheckedAfterMeal = item => {
    const { checkedAfterMeal } = this.state;

    if (checkedAfterMeal.type === item.type) {
      return true;
    }
    return false;
  };

  isCheckedWhenDose = item => {
    const { checkedWhenDose } = this.state;

    if (checkedWhenDose.type === item.type) {
      return true;
    }
    return false;
  };

  onPressCheckedWhenDose = item => {
    let { checkedWhenDose } = this.state;

    if (checkedWhenDose.type !== item.type) {
      this.setState({ checkedWhenDose: item });
    }

    let shouldCheckBeforeMeals = false;
    let shouldCheckAfterMeals = false;
    if (item.type === 'beforeMeals') {
      shouldCheckBeforeMeals = true;
    } else if (item.type === 'afterMeals') {
      shouldCheckAfterMeals = true;
    }
    this.setState({ showBeforeMeals: shouldCheckBeforeMeals, showAfterMeals: shouldCheckAfterMeals });
  };

  onPressCheckedBeforeMeal = item => {
    let { checkedBeforeMeal } = this.state;

    if (checkedBeforeMeal.type !== item.type) {
      this.setState({ checkedBeforeMeal: item });
    }
  };

  onPressCheckedAfterMeal = item => {
    let { checkedAfterMeal } = this.state;

    if (checkedAfterMeal.type !== item.type) {
      this.setState({ checkedAfterMeal: item });
    }
  };

  render() {
    const { addOwnInstruction, showBeforeMeals, showAfterMeals, ownInstructionText } = this.state;


    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Instructions"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
            <View style={styles.rowContainer}>
              <AppText textWeight="500" style={styles.leftLabelText}>Add own instruction</AppText>
              <Switch
                value={addOwnInstruction}
                trackColor={{
                  true: Colors.trackColor,
                  false: Colors.trackColorFalse
                }}
                onValueChange={this.onChangeOwnInstruction}
              />
            </View>

            {addOwnInstruction ? (
              <View style={styles.topGap}>
                <InputWithLabel
                  onRef={this.doseRef}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={48}
                  numberOfLines={1}
                  returnKeyType="done"
                  label="Own Instruction"
                  fontWeight="500"
                  value={ownInstructionText}
                  onChangeText={text => {
                    this.setState({ ownInstructionText: text });
                  }}
                />
              </View>
            ) : null}

            {!addOwnInstruction ? (
              <>
                <AppText textWeight="500" style={styles.titleText}>When Should You Take The Dose Of Medication</AppText>
                <View style={styles.contentContainer}>
                  {whenDose.map((item) => {
                    const isChecked = this.isCheckedWhenDose(item);
                    return (
                      <TouchableOpacity key={item.display} activeOpacity={1} onPress={() => this.onPressCheckedWhenDose(item)} style={styles.checkWrapper}>
                        <CheckmarkToggle
                          checked={isChecked}
                          onPress={() => this.onPressCheckedWhenDose(item)}
                        />
                        <AppText textWeight="400" style={styles.textCheckmark}>{item.display}</AppText>
                      </TouchableOpacity>
                    )
                  })}
                </View>

                {showBeforeMeals && 
                  <>
                    <AppText textWeight="500" style={styles.titleText}>How Long Before A Meal Should You Take The Medication</AppText>
                    <View style={styles.contentContainer}>
                      {beforeMeal.map((item) => {
                        const isChecked = this.isCheckedBeforeMeal(item);
                        return (
                          <TouchableOpacity key={item.display} activeOpacity={1} onPress={() => this.onPressCheckedBeforeMeal(item)} style={styles.checkWrapper}>
                            <CheckmarkToggle
                              checked={isChecked}
                              onPress={() => this.onPressCheckedBeforeMeal(item)}
                            />
                            <AppText textWeight="400" style={styles.textCheckmark}>{item.display}</AppText>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </>
                }

                {showAfterMeals && 
                  <>
                    <AppText textWeight="500" style={styles.titleText}>How Long After A Meal Should You Take The Medication</AppText>
                    <View style={styles.contentContainer}>
                      {afterMeal.map((item) => {
                        const isChecked = this.isCheckedAfterMeal(item);
                        return (
                          <TouchableOpacity key={item.display} activeOpacity={1} onPress={() => this.onPressCheckedAfterMeal(item)} style={styles.checkWrapper}>
                            <CheckmarkToggle
                              checked={isChecked}
                              onPress={() => this.onPressCheckedAfterMeal(item)}
                            />
                            <AppText textWeight="400" style={styles.textCheckmark}>{item.display}</AppText>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </>
                }
              </>
            ) : null}
          </FormWrapper>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
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
)(MedicationRemindersInstructions);
