import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomHeaderBack, AppText, InputWithLabel, FormWrapper, CheckmarkToggle } from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import { onlyNumbers } from '@utils/Globals';
import images from '@assets/images';
import styles from './MedicationRemindersDose.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

const measurement = [
  { type: 'mg', display: 'mg' },
  { type: 'g', display: 'g' },
  { type: 'mcg', display: 'mcg' },
  { type: 'iu', display: 'iu' },
  { type: 'ml', display: 'ml' },
  { type: 'pill', display: 'pill(s)' },
  { type: 'tbsp', display: 'tbsp' },
  { type: 'unit', display: 'unit(s)' },
  { type: 'cup', display: 'cup(s)' },
  { type: 'tsp', display: 'tsp' },
  { type: 'L', display: 'L' },
  { type: 'patch', display: 'patch(es)' },
  { type: 'lozenge', display: 'lozenge(s)' },
  { type: 'syrup', display: 'syrup' },
  { type: 'drop', display: 'drop(s)' },
  { type: 'spray', display: 'spray(s)' },
  { type: 'injection', display: 'injection' },
  { type: 'ointment', display: 'ointment' },
  { type: 'inhalation', display: 'inhalation' }
];

class MedicationRemindersDose extends Component {
  constructor(props) {
    super(props);

    let checked = [];
    checked.type = null;
    checked.display = null;

    this.state = {
      actionLoading: false,
      dose: '',
      checkedItem: checked
    };

    this.doseRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   // //this.mixpanel.track('View Medication Reminders Dose');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  isChecked = item => {
    const { checkedItem } = this.state;

    if (checkedItem.type === item.type) {
      return true;
    }
    return false;
  };

  onPressCheckmark = item => {
    let { checkedItem } = this.state;

    if (checkedItem.type !== item.type) {
      this.setState({ checkedItem: item });
    }
  };

  render() {
    const {
      dose
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Dose"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>
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
              maxLength={8}
              numberOfLines={1}
              keyboardType="number-pad"
              returnKeyType="done"
              label="Size of the Dose"
              fontWeight="500"
              value={dose}
              onChangeText={text => {
                this.setState({ dose: onlyNumbers(text) });
              }}
            />

            <AppText textWeight="500" style={styles.titleText}>Unit of Measurement</AppText>
            <View style={styles.contentContainer}>
              {measurement.map((item) => {
                const isChecked = this.isChecked(item);
                return (
                  <TouchableOpacity key={item.display} activeOpacity={1} onPress={() => this.onPressCheckmark(item)} style={styles.checkWrapper}>
                    <CheckmarkToggle
                      checked={isChecked}
                      onPress={() => this.onPressCheckmark(item)}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>{item.display}</AppText>
                  </TouchableOpacity>
                )
              })}
            </View>
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
)(MedicationRemindersDose);
