import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppButton, AppText, LoaderList } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientDischargePeople.styles';

import TasksApi from '@api/tasksApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';
import * as TransportationActions from '@ducks/transportation';

const { width } = Dimensions.get('screen');

class PatientDischargePeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: []
    };

    this.callBackLoadPeople = this.callBackLoadPeople.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
   // //this.mixpanel.track('View Patient Discharge People');
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ isLoading: true });

    setTimeout(() => {
      TasksApi.getPeople()
        .promise.then(result => {
          const items = result.data.people;

          this.setState({ isLoading: false, data: items });
        })
        .catch(error => {
          this.setState({ isLoading: false });
          actions.setAlert(error.data.error);
        });
    }, 300);
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  callBackLoadPeople = people => {
    const { actions } = this.props;

    //actions.setAlert('Person has been added.');
    this.setState({ isLoading: false, data: people });
  };

  onPressPerson = person => {
    const { navigation } = this.props;

    navigation.navigate('PatientDischargeAddEditPerson', { person, callBackLoadPeople: this.callBackLoadPeople });
  };

  onPressAddPerson = () => {
    const { navigation } = this.props;

    navigation.navigate('PatientDischargeAddEditPerson', { callBackLoadPeople: this.callBackLoadPeople });
  };

  getPersonLabel = type => {
    switch (type) {
      case 'myself':
        return 'Myself';
        break;
      case 'family_member':
        return 'Family Member';
        break;
      case 'friend':
        return 'Friend';
        break;
      case 'discharge_nurse':
        return 'Discharge Nurse';
        break;
      case 'other_caregiver':
        return 'Other caregiver';
        break;
      case 'physician':
        return 'Physician';
        break;
    }
  };

  renderRowItem = data => {
    return (
      <TouchableHighlight
        onPress={() => this.onPressPerson(data)}
        activeOpacity={0.6}
        underlayColor={Colors.white}
        key={`key_${data.personId}`}>
        <View style={styles.rowContainer}>
          <View>
            <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.leftLabelText}>
              {data.firstName} {data.lastName}
            </AppText>
            <AppText textWeight="300" style={styles.leftLabelSubText}>
              {this.getPersonLabel(data.personType)}
            </AppText>
          </View>
          <Image style={Globals.iconChevron} source={images.iconChevron} />
        </View>
      </TouchableHighlight>
    );
  };

  renderBottomButton = () => {
    return (
      <View style={styles.buttonsContainer}>
        <AppButton
          onPress={this.onPressAddPerson}
          width={width - 20}
          height={38}
          backgroundColor={Colors.buttonMain}
          disabled={false}
          style={styles.button}>
          <AppText textWeight="500" style={styles.buttonText}>
            Add Person
          </AppText>
        </AppButton>
      </View>
    );
  };

  render() {
    const { isLoading, data, isActionSheetOpen, isAddModalOpen } = this.state;
    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title="People" onPressBack={this.onPressBack} />
        <LoaderList loading={isLoading} />
        {!isLoading ? (
          <ScrollView style={Globals.background}>
            {data.map((item, idx) => {
              return this.renderRowItem(item);
            })}
            {this.renderBottomButton()}
          </ScrollView>
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientDischargePeople);
