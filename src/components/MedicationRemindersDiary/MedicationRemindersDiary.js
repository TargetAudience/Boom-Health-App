import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableHighlight, SectionList, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import { ActionSheet } from 'native-base';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, LoaderList, FaceIcon } from '@components/common';
import images from '@assets/images';
import { uppercaseFirst } from '@utils/Globals';
import styles from './MedicationRemindersDiary.styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

//const ACTIONSHEET_BUTTONS = ['Edit Entry', 'Delete Entry', 'Cancel'];

const diary = [
  {
    data: [
      {
        diaryId: 0,
        feeling: 'good',
        time: '9:30am',
        entry: 'Breakfast: Cereal with 1% milk Half a grapefruit Coffee Lunch: Green salad: Lattuce, Tomatoes, shredded Cheddar Cheese, 1/2 cup of grilled chicken Water Dinner: Mousaka Callard Greens water'
      },
      {
        diaryId: 1,
        feeling: 'bad',
        time: '2:00pm',
        entry: 'Hello.'
      }
    ],
    title: 'Today - Thurs Dec 15'
  },
  {
    data: [
      {
        diaryId: 2,
        feeling: 'great',
        time: '11:00am',
        entry: 'Hello.'
      },
      {
        diaryId: 3,
        feeling: 'okay',
        time: '5:00pm',
        entry: 'Hello.'
      }
    ],
    title: 'Yesterday - Wed Dec 14'
  },
  {
    data: [
      {
        diaryId: 4,
        feeling: 'awful',
        time: '11:00am',
        entry: 'Hello.'
      },
      {
        diaryId: 5,
        feeling: 'good',
        time: '5:00pm',
        entry: 'Hello.'
      }
    ],
    title: 'Tues Dec 13'
  }
];

class MedicationRemindersDiary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'all',
      isLoading: false,
      diary
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medication Reminders Diary');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  onPressPrev = () => {
  };

  onPressNext = () => {
  };

  onPressDiaryMenu = () => {
    /*ActionSheet.show({
        options: ACTIONSHEET_BUTTONS,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1
      },
      buttonIndex => this.onPressActionSheet(buttonIndex)
    );*/
  };

  //onPressActionSheet = buttonIndex => {
  //};

  keyExtractor = item => {
    return `key_${item.diaryId}`;
  };

  getColor = feeling => {
    switch (feeling) {
      case 'great':
        return '#60a93e';
      case 'good':
        return '#8cbc42';
      case 'okay':
        return '#fdd537';
      case 'bad':
        return '#ff8e24';
      case 'awful':
        return '#fe3b27';
      default:
        return '#1c1c1c';
    }
  }

  renderRowItem = data => {
    const { item, section: { title } } = data;

    let displayTitle = data.index === 0 ? title : '';
    let gapStyle = data.index === 0 ? styles.gapTop : null;

    return (
      <View style={[styles.cellContainer, gapStyle]}>
        {displayTitle ? (
          <View style={styles.cellTop}>
            <AppText textWeight="500" style={styles.textDate}>
              {title}
            </AppText>
          </View>
        ) : null}
        <View style={styles.cellInner}>
          <View>
            <FaceIcon icon={item.feeling} />
          </View>
          <View style={styles.outerContainer}>
            <View style={styles.topContainer}>
              <View style={styles.topContainerInner}>
                <AppText textWeight="700" style={[styles.textMood, {color: this.getColor(item.feeling)} ]}>
                  {uppercaseFirst(item.feeling)}
                </AppText>
                <AppText textWeight="300" style={styles.textTime}>
                  {item.time}
                </AppText>
              </View>
              <TouchableHighlight
                onPress={this.onPressDiaryMenu}
                underlayColor="transparent"
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>              
                <Image
                  source={images.downArrowButton}
                  style={styles.downArrowIcon}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.bottomContainer2}>
              <AppText textWeight="300" style={styles.textDiary}>
                {item.entry}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderGap = () => {
    return <View style={styles.gap}></View>;
  }

  render() {
    const { isLoading, diary } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Medication Diary" onPressBack={this.onPressBack} />
        <View style={styles.containerTop}>
          <View style={styles.rowLeft}>
            <Text style={styles.textTopLabel}>December 2021</Text>
          </View>
          <View style={styles.rowRight}>
            <TouchableHighlight
              onPress={this.onPressPrev}
              underlayColor="transparent"
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
              <Image
                source={images.pinkArrowLeftOff}
                style={[styles.icon, styles.iconFirst]}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.onPressNext}
              underlayColor="transparent"
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>              
              <Image
                source={images.pinkArrowRightOff}
                style={[styles.icon, styles.iconLast]}
              />
            </TouchableHighlight>
          </View>
        </View>

        <LoaderList loading={isLoading} />
        {!isLoading ? (            
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
            sections={diary}
            renderItem={this.renderRowItem}
            renderSectionHeader={this.renderHeader}
            ListFooterComponent={this.renderGap}
          />
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

export default connect(null, mapDispatchToProps)(MedicationRemindersDiary);
