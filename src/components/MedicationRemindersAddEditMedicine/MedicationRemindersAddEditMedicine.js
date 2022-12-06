import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import moment from 'moment';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CustomHeaderBack, FormWrapper, AppButton, ListItem, AppText, Input } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersAddEditMedicine.styles';
import { nearestPastMinutes } from '@utils/Globals';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as TransportationActions from '@ducks/transportation';

const { width } = Dimensions.get('screen');

class MedicationRemindersAddEditMedicine extends Component {
  constructor(props) {
    super(props);

    this.stateSAVE = {
      pickupDate: 'THU, FEB. 3, 2020',
      pickupTime: '8:45 AM', 
      pickupLocation: '123 Front St.',
      dropOffLocation: '123 Oak St.',
      specialInstructions: '',
      pickupAddress: {
        city: 'St. Catharines',
        name: 'Rob2 Stevenson2',
        phoneNumber: '9055555555',
        postalCode: 'L4S2M6',
        province: 'ON',
        street: '123 Front St.',
      },
      dropOffAddress: {
        additionalPhoneNumber: '4165555555',
        addressId: 92,
        city: 'Toronto',
        firstName: 'Jane',
        lastName: 'Smith',
        name: 'Jane Smith',
        nickname: 'My Nickname',
        phoneNumber: '4165555555',
        postalCode: 'M4L1G2',
        province: 'ON',
        street: '123 Oak St.'
      },
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      timeChanged: true,
      dateChanged: true,
      pickupAddressChanged: true,
      dropOffAddressChanged: true,
      pickupAddressSelected: 'patient',
      dropOffAddressSelected: 92,
      pickupTimeToSend: '8:45 am',
      pickupDateToSend: '2020-12-03',
      initialTime: new Date(),
      minimumTime: new Date()
    };

    this.state = {
      medicationName: '',
      pickupDate: '',
      pickupTime: '', 
      pickupLocation: '',
      dropOffLocation: '',
      specialInstructions: '',
      pickupAddress: null,
      dropOffAddress: null,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      timeChanged: false,
      dateChanged: false,
      pickupAddressChanged: false,
      dropOffAddressChanged: false,
      pickupAddressSelected: null,
      dropOffAddressSelected: null,
      pickupTimeToSend: null,
      pickupDateToSend: null,
      initialTime: new Date(),
      minimumTime: new Date()
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   // //this.mixpanel.track('View Medication Reminders Add Edit Medicine');
  }

  componentDidUpdate(prevProps, prevState) {
    const pickupAddress = this.props.navigation.getParam('pickupAddress', []);
    const dropOffAddress = this.props.navigation.getParam('dropOffAddress', []);
    const selectedAddress = this.props.navigation.getParam('selectedAddress', []);

    if (pickupAddress.length !== 0 && prevState.pickupAddress !== pickupAddress) {
      this.props.navigation.state.params = undefined;
      this.setState({ pickupAddress, pickupAddressChanged: true });
    }
    if (dropOffAddress.length !== 0 && prevState.dropOffAddress !== dropOffAddress) {
      this.props.navigation.state.params = undefined;
      this.setState({ dropOffAddress, dropOffAddressChanged: true });
    }
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    actions.clearAllTransportation();

    navigation.goBack('');
  };

  onPressIcon = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersIcon', { specialInstructions });
  };

  onPressDose = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersDose', { specialInstructions });
  };

  onPressInstructions = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersInstructions', { onAddNote: this.onAddNote, specialInstructions });
  };

  onPressStorage = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersStorage', { specialInstructions });
  };

  onPressNote = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersNote', { specialInstructions });
  };

  onPressReminders = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersReminders', { specialInstructions });
  };

  onPressRefillReminder = () => {
    const { navigation } = this.props;
    const { specialInstructions } = this.state;

    navigation.navigate('MedicationRemindersRefillReminder', { specialInstructions });
  };

  render() {
    const { transportation } = this.props;
    const { medicationName, initialTime, minimumTime, pickupDate, pickupTime, pickupLocation, dropOffLocation, specialInstructions, isTimePickerVisible, isDatePickerVisible } = this.state;

    const selectedNoteDisplay = specialInstructions.length < 20 ? specialInstructions : `${specialInstructions.substring(0, 20)}...`;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Add Medication" onPressBack={this.onPressBack} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.formWrapper}>
            <Input
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              placeholder={'Name'}
              autoFocus={false}
              autoCapitalize={"sentences"}
              underlineColorAndroid="transparent"
              maxLength={32}
              numberOfLines={1}
              value={medicationName}
              onChangeText={text => this.setState({ medicationName: text })}
            />
          </View>

          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressIcon}
            mainText="Icon"
            selectionImage={images.pillRoundOrange}
            selectionImageStyle={styles.selectionMedication}
          />
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressDose}
            mainText="Dose"
            selectionTextSize={14}
            selectionText="5 mg"
          />

          <View style={styles.spacer} />

          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressInstructions}
            mainText="Instructions"
            selectionText={selectedNoteDisplay}
          />      
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressStorage}
            mainText="Storage Conditions"
            selectionTextSize={14}
            selectionText="Hello"
          /> 
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressNote}
            mainText="Note"
            selectionText=""
          />

          <View style={styles.spacer} />

          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressReminders}
            mainText="Reminders"
            selectionText=""
          />
          <ListItem
            styleContainer={styles.listItemContainer}
            onPress={this.onPressRefillReminder}
            mainText="Refill Reminder"
            selectionText=""
          />
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
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>ADD MEDICATION</AppText>
            </AppButton>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
      ...TransportationActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole,
  transportation: state.transportation
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicationRemindersAddEditMedicine);
