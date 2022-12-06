import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
  CustomHeaderBack,
  FormWrapper,
  AppButton,
  LoaderList,
  AppText,
  ScreenWrapper
} from '@components/common';
import images from '@assets/images';
import { Colors } from '@constants/GlobalStyles';
import styles from './FamilyMembers.styles';

import ProfileApi from '@api/profileApi';

import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';

class FamilyMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();

    //this.mixpanel.track('View Settings Family Members');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressEditPerson = item => {
    const { navigation } = this.props;

    navigation.navigate('Invite', {
      edit: true,
      userId: item.userId || null,
      inviteId: item.inviteId || null,
      firstName: item.firstName,
      lastName: item.lastName,
      emailAddress: item.emailAddress,
      familyAdmin: item.familyAdmin,
      admin: Boolean(Number(item.admin)),
      chats: Boolean(Number(item.chats)),
      groupPurchases: Boolean(Number(item.groupPurchases)),
      blocked: Boolean(Number(item.blocked)),
      completedRegistration: item.completedRegistration
    });
  };

  onPressInviteFamilyMember = () => {
    const { navigation } = this.props;

    navigation.navigate('Invite');
  };

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    ProfileApi.getFamilyMembers()
      .promise.then(result => {
        const data = result.data.users;

        this.setState({ actionLoading: false });

        actions.addFamiliesRegistered(data);
        actions.addFamiliesInvited(data);
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  renderFamilyMember(data, index, isInvite) {
    const { auth, familyMyself } = this.props;

    const addGapTop = index !== 0 ? styles.inviteGapTop : null;

    const checkedAdmin = data.admin ? 'Admin' : '';
    const checkedChats = data.chats ? 'Chats' : '';
    const checkedGroupPurchases = data.groupPurchases ? 'Group Purchases' : '';

    const isMyItem = auth.userId === data.userId ? true : false;
    const canEdit = isMyItem || familyMyself.admin ? true : false;

    const labelAdmin = data.familyAdmin ? 'FAMILY ADMIN' : 'ADMIN';

    const strikethroughStyle = data.blocked ? styles.strikethrough : null;

    const key = data.completedRegistration ? data.userId : data.inviteId;

    return (
      <View key={key} style={[styles.inviteContainer, addGapTop]}>
        <View>
          <View style={styles.textInviteNameContainer}>
            <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textInviteName}>{data.firstName} {data.lastName}</AppText>
            {checkedAdmin ? (
              <>
                <Image style={styles.admin} source={images.admin} />
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textInviteAdmin, strikethroughStyle]}>{labelAdmin}</AppText>
              </>
            ) : null}
          </View>
          {checkedChats ? (
            <View style={styles.roleContainer}>
              <Image style={styles.chat} source={images.permissionsChat} />
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textInviteIcon, strikethroughStyle]}>CHAT</AppText>
            </View>
          ) : null}
          {checkedGroupPurchases ? (
            <View style={styles.roleContainer}>
              <Image
                style={styles.permissionsGroupPurchase}
                source={images.permissionsGroupPurchase}
              />
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={[styles.textInviteIcon, strikethroughStyle]}>GROUP PURCHASES</AppText>
            </View>
          ) : null}
          <Text style={styles.textInviteEmail}>{data.emailAddress}</Text>
          {data.blocked ? (
            <View style={styles.blockedContainer}>
              <Image
                style={styles.permissionsBlocked}
                source={images.permissionsBlocked}
              />
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textBlocked}>BLOCKED</AppText>
            </View>
          ) : null}
        </View>
        {canEdit ? (
          <View>
            <TouchableOpacity
              onPress={() => this.onPressEditPerson(data)}
              activeOpacity={0.8}>
              <Image style={styles.edit} source={images.edit} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  renderFamilyMembers() {
    const { familyMembers } = this.props;

    const familyMembersSortedA = _.orderBy(
      familyMembers,
      item => item.familyAdmin,
      'desc'
    );

    const familyMembersSortedB = _.orderBy(
      familyMembersSortedA,
      item => item.admin,
      'desc'
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
          <AppText textWeight="400" style={styles.textNone}>You have no registered family members</AppText>
        )}
      </>
    );
  }

  renderPendingInvited() {
    const { familyInvited } = this.props;

    return (
      <>
        {familyInvited.length ? (
          <View style={styles.invitesWrap}>
            {familyInvited.map((data, index) => {
              return this.renderFamilyMember(data, index, 1);
            })}
          </View>
        ) : (
          <Text textWeight="400" style={styles.textNone}>There are no pending invites</Text>
        )}
      </>
    );
  }

  render() {
    const { familyMyself } = this.props;
    const { actionLoading } = this.state;

    const renderMain = !actionLoading;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title="Family Members"
          onPressBack={this.onPressBack}
        />
        <LoaderList loading={actionLoading} />
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}>
          {renderMain ? (
            <>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textSubTitle}>Family Members</AppText>
              {this.renderFamilyMembers()}
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textSubTitle}>Pending Invites</AppText>
              {this.renderPendingInvited()}
              {familyMyself.admin ? (
                <FormWrapper style={styles.inviteButtonMargins}>
                  <AppButton
                    onPress={this.onPressInviteFamilyMember}
                    width={178}
                    height={34}
                    backgroundColor={Colors.buttonMain}
                    disabled={false}>
                    <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>Invite a Family Member</AppText>
                  </AppButton>
                </FormWrapper>
              ) : null}
            </>
          ) : null}
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  familyMyself: state.profile.familyMyself,
  familyMembers: state.profile.familyMembers,
  familyInvited: state.profile.familyInvited
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...ProfileActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyMembers);
