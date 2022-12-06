import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, ListItem, CustomMultiPicker } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import Modal from 'react-native-modal';
import images from '@assets/images';
import styles from './MedicationRemindersReminders.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

class MedicationRemindersReminders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   ////this.mixpanel.track('View Medication Reminders');
  }

  onPressClose = () => {
    const { navigation } = this.props;

    navigation.navigate('Schedule', { pageFrom: 'filters' });
  };

  onPressClear = () => {
    const { actions } = this.props;

    actions.clearFilters();
  };

  onPressFiltersModalClear = () => {
    this.setState({ visibleModal: false });
  };

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  onPressFrequency = () => {
    const { actions, navigation } = this.props;

    this.setState({ visibleModal: true });
  };

  render() {
    const { visibleModal } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Reminders"
          onPressBack={this.onPressBack}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="Frequency"
            selectionTextSize={14}
            selectionText="Days Interval"
          />
          <AppText textWeight="300" style={styles.listItemTitle}>HOW MANY TIMES A DAY?</AppText>
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="Twice a day"
          />
          <AppText textWeight="300" style={styles.listItemTitle}>SET TIME AND DOSE</AppText>
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="08:00"
            selectionTextSize={14}
            selectionText="Take 1 dose"
          />
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="18:00"
            selectionTextSize={14}
            selectionText="Take 1 dose"
          />
          <AppText textWeight="300" style={styles.listItemTitle}>FOR HOW LONG?</AppText>
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="Starts"
            selectionTextSize={14}
            selectionText="Jan 4, 2022"
          />
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressFrequency}
            mainText="Ends"
            selectionTextSize={14}
            selectionText="Jan 14, 2022"
          />
        </ScrollView>

        <Modal
          isVisible={visibleModal}
          style={styles.bottomModal}
          backdropOpacity={0.3}
          useNativeDriver
          onBackdropPress={() => this.setState({ visibleModal: false })}>
          <View style={styles.modalContentsContainer}>
            <View style={styles.modalHeaderContainer}>
              <View style={styles.leftButtonText} />
              <AppText textWeight="500" style={styles.modalHeaderText}>Frequency</AppText>
              <TouchableOpacity
                style={styles.rightButtonContainer}
                onPress={this.onPressFiltersModalClear}
                activeOpacity={0.8}
                hitSlop={{ top: 5, bottom: 5, left: 15, right: 15 }}>
                <AppText textWeight="500" style={styles.rightButtonText}>Close</AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.customMultiPickerContainer}>
              
            </View>
          </View>
        </Modal>
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
)(MedicationRemindersReminders);
