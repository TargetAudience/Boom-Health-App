import React, {Component} from 'react';
import {View, Image, ScrollView, Dimensions, Platform, Text, TouchableHighlight} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {CustomHeaderBack,  AppButton, AppText, LoaderList} from '@components/common';
import {Colors, Globals} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientDischargePeople.styles';

import ProfileApi from '@api/profileApi';
import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientDischargePeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
    };

    this.callBackLoadPeople = this.callBackLoadPeople.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {actions} = this.props;

    this.setState({isLoading: true});

    ProfileApi.getFamilyMembers()
      .promise.then(result => {
        const data = result.data.users;

        this.setState({isLoading: false});

        actions.addFamiliesRegistered(data);
        actions.addFamiliesInvited(data);
      })
      .catch(error => {
        this.setState({isLoading: false});
        actions.setAlert(error.data.error);
      });
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  callBackLoadPeople = people => {
    this.setState({isLoading: false, data: people});
  };

  onPressPerson = person => {
    const { navigation } = this.props;

    navigation.navigate('PatientDischargeAddEditPerson', { person, callBackLoadPeople: this.callBackLoadPeople });
  };

  onPressAddPerson = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientDischargeAddEditPerson', {
      callBackLoadPeople: this.callBackLoadPeople,
    });
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

  renderFamilyMember(data, index, isInvite) {
    const labelAdmin = data.familyAdmin ? 'Family admin' : 'Admin';
    const key = data.completedRegistration ? data.userId : data.inviteId;

    return (
      <TouchableHighlight
        onPress={() => this.onPressPerson(data)}
        activeOpacity={0.6}
        underlayColor={Colors.white}
        key={key}>
        <View style={styles.rowContainer}>
          <View>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.leftLabelText}>
              {data.firstName} {data.lastName}
            </AppText>
            <AppText textWeight="300" style={styles.leftLabelSubText}>
              {labelAdmin}
            </AppText>
            {/* <AppText textWeight="300" style={styles.leftLabelSubText}>
              {data.emailAddress}
            </AppText> */}
            {/* {data.blocked ? (
              <View style={styles.blockedContainer}>
                <Image
                  style={styles.permissionsBlocked}
                  source={images.permissionsBlocked}
                />
                <AppText
                  textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                  style={styles.textBlocked}>
                  BLOCKED
                </AppText>
              </View>
            ) : null} */}
          </View>
          <Image style={Globals.iconChevron} source={images.iconChevron} />
        </View>
      </TouchableHighlight>
    );
  }

  renderFamilyMembers() {
    const {familyMembers} = this.props;

    const familyMembersSortedA = _.orderBy(
      familyMembers,
      item => item.familyAdmin,
      'desc',
    );

    const familyMembersSortedB = _.orderBy(
      familyMembersSortedA,
      item => item.admin,
      'desc',
    );

    return (
      <>
        {familyMembers.length ? (
          <View style={styles.invitesWrap}>
            {familyMembersSortedB.map((data, index) => {
              return this.renderFamilyMember(data, index, 0);
            })}
          </View>
        ) : (
          <AppText textWeight="400" style={styles.textNone}>
            You have no registered family members
          </AppText>
        )}
      </>
    );
  }

  renderPendingInvited() {
    const {familyInvited} = this.props;

    return (
      <>
        {familyInvited.length ? (
          <View style={styles.invitesWrap}>
            {familyInvited.map((data, index) => {
              return this.renderFamilyMember(data, index, 1);
            })}
          </View>
        ) : (
          <Text textWeight="400" style={styles.textNone}>
            There are no pending invites
          </Text>
        )}
      </>
    );
  }

  render() {
    const {isLoading} = this.state;
    const {familyMembers, familyInvited} = this.props;

    return (
      <SafeAreaView style={Globals.safeAreaViewGray}>
        <CustomHeaderBack title="People" onPressBack={this.onPressBack} />
        <LoaderList loading={isLoading} />
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}>
          {!isLoading ? (
            <>
              {/* <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.textSubTitle}>
                Family Members
              </AppText> */}
              {!!familyMembers.length && this.renderFamilyMembers()}
              {/* <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.textSubTitle}>
                Pending Invites
              </AppText> */}
              {!!familyInvited.length && this.renderPendingInvited()}
              {this.renderBottomButton()}
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  familyMyself: state.profile.familyMyself,
  familyMembers: state.profile.familyMembers,
  familyInvited: state.profile.familyInvited,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...ProfileActions,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientDischargePeople);
