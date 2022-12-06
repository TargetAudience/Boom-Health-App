import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import HomeCell from './HomeCell';
import { CustomHeaderBack, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersHome.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');
const cellWidth = width / 2;

export const menuItems = [
  {
    key: 'MedicationRemindersViewMedicines',
    topic: 'Medications & Times',
    topicSub: 'start here',
    color: '#94c948',
    icon: images.medicationReminder
  },
  {
    key: 'MedicationRemindersHistory',
    topic: 'History',
    topicSub: 'Taken & Skipped Doses',
    color: '#4eaaf0',
    icon: images.medicationHistory
  },
  {
    key: 'MedicationRemindersDiary',
    topic: 'Diary',
    topicSub: 'Reactions or Notes',
    color: '#d067f7',
    icon: images.medicationDiary
  }
];

class MedicationRemindersHome extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Medication Reminders Home');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  getData = () => {
    return menuItems.map(function (item, index) {
      if (index % 2 === 0) {
        item.firstRow = true;
      } else {
        item.firstRow = false;
      }
      return item;
    });
  };

  onPressItem = key => {
    const { navigation } = this.props;

    navigation.navigate(key);
  };

  render() {
    let data = this.getData();

    let gridItems = data.map((itemData, i) => (
      <HomeCell
        key={itemData.key}
        item={itemData}
        onPress={() => this.onPressItem(itemData.key)}
      />
    ));

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Medication Reminders"
          onPressBack={this.onPressBack}
        />
        <ScrollView contentContainerStyle={styles.containerB}>
          {gridItems}
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
)(MedicationRemindersHome);
