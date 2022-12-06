import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersRefillReminder.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

class MedicationRemindersRefillReminder extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medication Reminders');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Refill Reminder"
          onPressBack={this.onPressBack}
        />
        <ScrollView contentContainerStyle={styles.containerB}>

        </ScrollView>
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
)(MedicationRemindersRefillReminder);
