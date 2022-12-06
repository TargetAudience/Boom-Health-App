import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, SectionList, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, TopNavMedicationHistory, LoaderList } from '@components/common';
import images from '@assets/images';
import styles from './MedicationRemindersHistory.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

const history = [
  {
    data: [
      {
        historyId: 1,
        taken: 1,
        date: 'Dec 12 @ 2:00pm',
        time: '2:12pm',
        name: 'Lipitor',
        dose: '10mg'
      },
      {
        historyId: 2,
        taken: 0,
        date: 'Dec 8 @ 8:00pm',
        time: '',
        name: 'Amoxicillin',
        dose: '15mg'
      }
    ],
    title: 'December 2021'
  },
  {
    data: [
      {
        historyId: 3,
        taken: 1,
        date: 'Nov 14 @ 9:00am',
        time: '9:02am',
        name: 'Nexium',
        dose: '20mg'
      },
      {
        historyId: 4,
        taken: 1,
        date: 'Nov 8 @ 5:00pm',
        time: '5:05pm',
        name: 'Spiriva',
        dose: '30mg'
      }
    ],
    title: 'November 2021'
  }
];

class MedicationRemindersHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'all',
      isLoading: false,
      filteredHistory: history
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //('View Medication Reminders History');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  onPressTopNav = selectedTab => {
    const { navigation } = this.props;

    filteredHistory = [];
    if (selectedTab === 'taken') {
      filteredHistory = history.reduce((result, sectionData) => {
        const { title, data } = sectionData;
        let filteredData = data.filter(element => {
          return element.taken === 1
        });
        if (filteredData.length !== 0) {
          result.push({
            title,
            data: filteredData
          });
        }

        return result;
      }, []);
    } else if (selectedTab === 'skipped') {
      filteredHistory = history.reduce((result, sectionData) => {
        const { title, data } = sectionData;
        let filteredData = data.filter(element => {
          return element.taken === 0
        });
        if (filteredData.length !== 0) {
          result.push({
            title,
            data: filteredData
          });
        }

        return result;
      }, []);
    } else {
      filteredHistory = history;
    }

    this.setState({ selectedTab, filteredHistory });
  };

  takenInfo = taken => {
    if (taken === 1) {
      return {
        label: 'TAKEN AT',
        labelStyle: styles.textTaken,
        image: images.checkmarkGreen,
        imageStyle: styles.checkboxGreen
      };
    }
    return {
      label: 'SKIPPED',
      labelStyle: styles.textSkipped,
      image: images.checkmarkRed,
      imageStyle: styles.checkmarkRed
    };
  };

  keyExtractor = item => {
    return `key_${item.name}`;
  };

  renderRowItem = data => {
    const { item } = data;

    const takenInfo = this.takenInfo(item.taken);

    return (
      <View style={styles.cellContainer}>
        <View style={styles.topContainer}>
          <AppText textWeight="300" style={styles.textDate}>
            {item.date}
          </AppText>
          <View style={styles.checkboxContainer}>
            <Image style={takenInfo.imageStyle} source={takenInfo.image} />
            <AppText textWeight="600" style={takenInfo.labelStyle}>
              {takenInfo.label} {item.time}
            </AppText>
          </View>
        </View>
        <View style={styles.bottomContainer2}>
          <AppText textWeight="600" style={styles.textMedicine}>
            {item.name}
          </AppText>
          <AppText textWeight="400" style={styles.textDose}>
            <AppText textWeight="600" style={styles.textDose}>
              Dose:{' '}
            </AppText>
            {item.dose}
          </AppText>
        </View>
      </View>
    );
  };

  renderHeader() {
    const { selectedTab } = this.state;

    let message = '';
    if (selectedTab === 'taken') {
      message = 'Doses taken from the last 90-days';
    } else if (selectedTab === 'skipped') {
      message = 'Doses skipped from the last 90-days';
    } else {
      message = 'All scheduled doses from the last 90-days';
    }

    return <Text style={styles.textIntro}>{message}</Text>;
  }

  render() {
    const { isLoading, filteredHistory } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Medication History" onPressBack={this.onPressBack} />
        <TopNavMedicationHistory onPress={this.onPressTopNav} />
        <LoaderList loading={isLoading} />
        {!isLoading ? (
          <View style={styles.container}>
            <SectionList
              ref={ref => {
                this.listRef = ref;
              }}
              stickySectionHeadersEnabled={false}
              removeClippedSubviews
              initialNumToRender={20}
              onEndReachedThreshold={1200}
              keyExtractor={this.keyExtractor}
              extraData={this.state}
              sections={filteredHistory}
              renderItem={this.renderRowItem}
              renderSectionHeader={({ section: { title } }) => (
                <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.header}>
                  {title}
                </AppText>
              )}
              ListHeaderComponent={() => this.renderHeader()}
            />
          </View>
        ) : null}
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

export default connect(null, mapDispatchToProps)(MedicationRemindersHistory);
