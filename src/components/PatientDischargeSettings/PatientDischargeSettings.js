import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppText,
  LoaderList,
  CheckmarkToggle,
  ButtonLoading,
} from '@components/common';
import styles from './PatientDischargeSettings.styles';
import {Globals, FormStyles} from '@constants/GlobalStyles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Colors} from '@constants/GlobalStyles';

import TasksApi from '@api/tasksApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

const checkedData = [
  {
    checkedId: 0,
    label: 'Myself',
    key: 'myself',
  },
  {
    checkedId: 1,
    label: 'Family Members',
    key: 'family_member',
  },
  {
    checkedId: 2,
    label: 'Friends',
    key: 'friend',
  },
  {
    checkedId: 3,
    label: 'Physicians',
    key: 'physician',
  },
  {
    checkedId: 4,
    label: 'Discharge Nurses',
    key: 'discharge_nurse',
  },
  {
    checkedId: 5,
    label: 'Other Caregivers',
    key: 'other_caregiver',
  },
];

class PatientDischargeSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      checkedList: [],
      checkedListB: [],
      actionLoading: false,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    //('View Patient Discharge Settings');
  }

  loadData() {
    this.setState({isLoading: true});

    TasksApi.getSettings()
      .promise.then(result => {
        const dataA = result.data.listA;
        const dataB = result.data.listB;

        this.setState({
          checkedList: dataA,
          checkedListB: dataB,
          isLoading: false,
        });
        this.forceUpdate();
      })
      .catch(error => {
        this.setState({isLoading: false});
      });
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onPressSave = () => {
    const {actions} = this.props;
    const {checkedList, checkedListB} = this.state;

    this.setState({actionLoading: true});
    TasksApi.settingsUpdate({checkedList, checkedListB})
      .promise.then(() => {
        this.setState({actionLoading: false});

        actions.setAlert('Your settings have been saved.');
      })
      .catch(error => {
        console.log('error jos', error);
        this.setState({isLoading: false});
        actions.setAlert(error.data.error);
      });
  };

  onPressCheckmark = item => {
    let {checkedList} = this.state;

    if (checkedList.indexOf(item) == -1) {
      checkedList.push(item);
      this.setState({checkedList});
    } else {
      checkedList = checkedList.filter(i => i != item);
      this.setState({checkedList});
    }
  };

  onPressCheckmarkB = item => {
    let {checkedListB} = this.state;

    if (checkedListB.indexOf(item) == -1) {
      checkedListB.push(item);
      this.setState({checkedListB});
    } else {
      checkedListB = checkedListB.filter(i => i != item);
      this.setState({checkedListB});
    }
  };

  isChecked = item => {
    const {checkedList} = this.state;
    if (checkedList.indexOf(item) == -1) {
      return false;
    }
    return true;
  };

  isCheckedB = item => {
    const {checkedListB} = this.state;
    if (checkedListB.indexOf(item) == -1) {
      return false;
    }
    return true;
  };

  renderBottomButton = () => {
    const {actionLoading} = this.state;

    return (
      <View style={styles.buttonsContainer}>
        <ButtonLoading
          onPress={this.onPressSave}
          isLoading={actionLoading}
          containerStyle={FormStyles.button}>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={FormStyles.buttonText}>
            SAVE
          </AppText>
        </ButtonLoading>
      </View>
    );
  };

  renderRowItem = data => {
    const isChecked = this.isChecked(data.checkedId);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressCheckmark(data.checkedId)}>
        <View style={styles.checkmarkContainer}>
          <CheckmarkToggle
            checked={isChecked}
            onPress={() => this.onPressCheckmark(data.checkedId)}
          />
          <AppText textWeight="400" style={styles.textCheckmark}>
            {data.label}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderRowItemB = data => {
    const isChecked = this.isCheckedB(data.checkedId);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressCheckmarkB(data.checkedId)}
        key={data.checkedId.toString()}>
        <View style={styles.checkmarkContainer}>
          <CheckmarkToggle
            checked={isChecked}
            onPress={() => this.onPressCheckmarkB(data.checkedId)}
          />
          <AppText textWeight="400" style={styles.textCheckmark}>
            {data.label}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {isLoading} = this.state;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <CustomHeaderBack
                title="Settings"
                onPressBack={this.onPressBack}
                loading={isLoading}
                hasLoadingB
              />
              <ScrollView style={styles.containerB}>
                <View style={styles.content}>
                  <AppText textWeight="300" style={styles.instructionsText}>
                    Notify people automatically when an item in the list changes
                    to checked or unchecked:
                  </AppText>
                  <View style={styles.checkmarksContainer}>
                    {checkedData.map((route, idx) =>
                      this.renderRowItem(route, idx),
                    )}
                  </View>
                </View>
                <View style={styles.content}>
                  <AppText textWeight="300" style={styles.instructionsText}>
                    Notify people automatically when the list is complete:
                  </AppText>
                  <View style={styles.checkmarksContainer}>
                    {checkedData.map((route, idx) =>
                      this.renderRowItemB(route, idx),
                    )}
                  </View>
                </View>
                {this.renderBottomButton()}
              </ScrollView>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView
          style={{flex: 0, backgroundColor: Colors.mainBackground}}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientDischargeSettings);
