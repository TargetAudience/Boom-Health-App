import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CheckBox from '../../../../src/@crazycodeboy/react-native-check-box';
import {Actionsheet, Box} from 'native-base';
import _ from 'lodash';
import {
  ScreenWrapper,
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText,
} from '@components/common';
import {PubSubContext} from 'src/pubsub';
import {Colors, FormStyles} from '@constants/GlobalStyles';
import {validateEmail, validateInputLetters} from '@utils/Globals';
import styles from './Invite.styles';

import * as ProfileActions from '@ducks/profile';
import * as AlertActions from '@ducks/alert';
import * as AuthActions from '@ducks/auth';
import * as PubNubActions from '@ducks/pubnub';

import ProfileApi from '@api/profileApi';
import ChatApi from '@api/chatApi';

const BUTTONS_ACTION_SHEET = ['Remove Invite', 'Cancel'];
const BUTTONS_ACTION_SHEET_2 = ['Block Family Member', 'Cancel'];
const BUTTONS_ACTION_SHEET_3 = ['Unblock Family Member', 'Cancel'];
const CANCEL_INDEX = 1;
const DESTRUCTIVE_INDEX = 0;

class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedItem: null,
      edit: this.props.navigation.getParam('edit', 0),
      userId: this.props.navigation.getParam('userId', null),
      inviteId: this.props.navigation.getParam('inviteId', null),
      familyAdmin: Number(this.props.navigation.getParam('familyAdmin', false)),
      firstName: this.props.navigation.getParam('firstName', ''),
      lastName: this.props.navigation.getParam('lastName', ''),
      emailAddress: this.props.navigation.getParam('emailAddress', ''),
      checkedAdmin: Number(this.props.navigation.getParam('admin', 0)),
      checkedChats: Number(this.props.navigation.getParam('chats', 0)),
      checkedGroupPurchases: Number(
        this.props.navigation.getParam('groupPurchases', 0),
      ),
      blocked: Number(this.props.navigation.getParam('blocked', 0)),
      completedRegistration: this.props.navigation.getParam(
        'completedRegistration',
        false,
      ),
    };

    this.onPress = this.onPress.bind(this);
    this.nextKeyboardLastName = this.nextKeyboardLastName.bind(this);
    this.nextKeyboardEmailAddress = this.nextKeyboardEmailAddress.bind(this);

    this.lastNameInputRef = React.createRef();
    this.emailAddressInputRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Settings Family Invite');
  }

  async onPress() {
    const {navigation, actions, auth, profile} = this.props;
    const {
      edit,
      userId,
      inviteId,
      firstName,
      lastName,
      emailAddress,
      familyAdmin,
      checkedAdmin,
      checkedChats,
      checkedGroupPurchases,
      blocked,
    } = this.state;

    if (_.isEmpty(profile.patient)) {
      actions.setAlert(
        'Please fill out the Patient Information section before sending out a family invite.',
      );
      return;
    }

    if (!edit) {
      if (firstName === '') {
        actions.setAlert('Please enter the first name.');
        return;
      } else if (firstName.length < 2) {
        actions.setAlert('Be sure the first name is at least 2 characters.');
        return;
      } else if (validateInputLetters(firstName)) {
        actions.setAlert('First name can only contain letters and dashes.');
        return;
      }

      if (lastName === '') {
        actions.setAlert('Please enter the last name.');
        return;
      } else if (lastName.length < 2) {
        actions.setAlert('Be sure the last name is at least 2 characters.');
        return;
      } else if (validateInputLetters(lastName)) {
        actions.setAlert('Last name can only contain letters and dashes.');
        return;
      }

      if (emailAddress === '') {
        actions.setAlert('Please enter the e-mail address.');
        return;
      } else if (!validateEmail(emailAddress)) {
        actions.setAlert('Be sure to enter a valid e-mail address.');
        return;
      }

      this.setState({actionLoading: true});

      await ProfileApi.addFamilyInvite({
        firstName,
        lastName,
        emailAddress,
        checkedAdmin,
        checkedChats,
        checkedGroupPurchases,
      })
        .promise.then(async result => {
          const data = result.data.user;

          this.setState({actionLoading: false});

          actions.addFamilyInvited({
            inviteId: data.inviteId,
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.emailAddress,
            familyAdmin: 0,
            admin: Number(data.admin),
            chats: Number(data.chats),
            groupPurchases: Number(data.groupPurchases),
            blocked: Number(blocked),
            completedRegistration: 0,
          });

          actions.setAlert(`The invite to ${firstName} has been sent.`);
          navigation.goBack();
        })
        .catch(error => {
          console.log('Invite error', error);
          this.setState({actionLoading: false});
          actions.setAlert(error.data.statusText);
        });
    } else {
      this.setState({actionLoading: true});

      if (userId) {
        // Is a family member.
        await ProfileApi.updateFamilyMember({
          userId,
          checkedAdmin,
          checkedChats,
          checkedGroupPurchases,
        })
          .promise.then(async result => {
            this.setState({actionLoading: false});

            actions.updateFamilyMember({
              userId,
              firstName,
              lastName,
              emailAddress,
              familyAdmin,
              admin: Number(checkedAdmin),
              chats: Number(checkedChats),
              groupPurchases: Number(checkedGroupPurchases),
              blocked: Number(blocked),
              completedRegistration: 1,
            });
            if (userId === auth.userId) {
              actions.updateMyFamilyPermissions({
                userId,
                admin: Number(checkedAdmin),
                chats: Number(checkedChats),
                groupPurchases: Number(checkedGroupPurchases),
                blocked: Number(blocked),
              });
            }
            actions.setAlert('The family member has been updated.');
            this.refreshChats();
            navigation.goBack();
          })
          .catch(error => {
            console.log('Invite error', error);
            this.setState({actionLoading: false});
            actions.setAlert(error.data.statusText);
          });
      } else {
        // Is an invite.
        await ProfileApi.updateFamilyMemberInvited({
          inviteId,
          checkedAdmin,
          checkedChats,
          checkedGroupPurchases,
        })
          .promise.then(async result => {
            this.setState({actionLoading: false});

            actions.updateFamilyMemberInvited({
              inviteId,
              firstName,
              lastName,
              emailAddress,
              familyAdmin,
              admin: Number(checkedAdmin),
              chats: Number(checkedChats),
              groupPurchases: Number(checkedGroupPurchases),
              blocked: Number(blocked),
              completedRegistration: 0,
            });
            actions.setAlert('The family member invitation has been updated.');
            this.refreshChats();
            navigation.goBack();
          })
          .catch(error => {
            console.log('Invite error', error);
            this.setState({actionLoading: false});
            actions.setAlert(error.data.statusText);
          });
      }
    }
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  onPressMenu = item => {
    this.setState({
      isOpen: true,
      selectedItem: item,
    });
  };

  onPressActionSheet = buttonIndex => {
    if (buttonIndex === 0) {
      this.deleteAction();
    } else if (buttonIndex === 1) {
      this.onClose();
    }
  };

  renderActionSheet = () => {
    const {completedRegistration, blocked, isOpen} = this.state;

    if (blocked) {
      return (
        <Actionsheet
          isOpen={isOpen}
          onClose={this.onClose}
          size="full"
          hideDragIndicator="true">
          <Actionsheet.Content bg="#f3f3f3">
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(0);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheetCancel}>
                  Unblock Family Member
                </Text>
              </Box>
            </Actionsheet.Item>
            <View style={styles.divider} />
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(1);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheet}>Cancel</Text>
              </Box>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      );
    }
    if (completedRegistration) {
      return (
        <Actionsheet
          isOpen={isOpen}
          onClose={this.onClose}
          size="full"
          hideDragIndicator="true">
          <Actionsheet.Content bg="#f3f3f3">
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(0);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheetCancel}>
                  Block Family Member
                </Text>
              </Box>
            </Actionsheet.Item>
            <View style={styles.divider} />
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(1);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheet}>Cancel</Text>
              </Box>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      );
    }
    return (
      <Actionsheet
        isOpen={isOpen}
        onClose={this.onClose}
        size="full"
        hideDragIndicator="true">
        <Actionsheet.Content bg="#f3f3f3">
          <Actionsheet.Item
            _pressed={{bg: '#e8e8e8'}}
            alignItems={'center'}
            bg="transparent"
            onPress={() => {
              this.onPressActionSheet(0);
            }}>
            <Box w="100%" h={7} px={4} justifyContent="center">
              <Text style={styles.textActionSheetCancel}>Remove Invite</Text>
            </Box>
          </Actionsheet.Item>
          <View style={styles.divider} />
          <Actionsheet.Item
            _pressed={{bg: '#e8e8e8'}}
            alignItems={'center'}
            bg="transparent"
            onPress={() => {
              this.onPressActionSheet(1);
            }}>
            <Box w="100%" h={7} px={4} justifyContent="center">
              <Text style={styles.textActionSheet}>Cancel</Text>
            </Box>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };

  /*onMenuPress = () => {
    const { completedRegistration, blocked } = this.state;

    let actionSheet = BUTTONS_ACTION_SHEET;
    if (completedRegistration) {
      actionSheet = BUTTONS_ACTION_SHEET_2;
    }
    if (blocked) {
      actionSheet = BUTTONS_ACTION_SHEET_3;
    }

    ActionSheet.show(
      {
        options: actionSheet,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.deleteAction();
        }
      }
    );
  };*/

  refreshChats() {
    const {pubsub} = this.context;
    const {actions, settings} = this.props;

    ChatApi.getChats({var: 'empty'})
      .promise.then(async result2 => {
        const chats = result2.data.chats;
        actions.addChats(chats);
        await pubsub.subscribeToChannels(chats, settings);
      })
      .catch(error => {
        console.log('refreshChats error', error);
      });
  }

  async deleteAction() {
    const {auth, actions, navigation} = this.props;
    const {completedRegistration, userId, inviteId} = this.state;

    if (completedRegistration) {
      // Block family member.
      const {
        firstName,
        lastName,
        emailAddress,
        familyAdmin,
        checkedAdmin,
        checkedChats,
        checkedGroupPurchases,
        blocked,
      } = this.state;

      const newBlocked = Number(!blocked);

      let blockedPerson = '';
      let blockedPersonUserId = 0;

      // Todo: Update only blocked vs. entire object.
      actions.updateFamilyMember({
        userId,
        firstName,
        lastName,
        emailAddress,
        familyAdmin,
        admin: Number(checkedAdmin),
        chats: Number(checkedChats),
        groupPurchases: Number(checkedGroupPurchases),
        blocked: newBlocked,
        completedRegistration: 1,
      });
      if (userId === auth.userId) {
        blockedPerson = 'myself';
        blockedPersonUserId = 0;
        actions.updateMyFamilyPermissions({
          userId,
          admin: Number(checkedAdmin),
          chats: Number(checkedChats),
          groupPurchases: Number(checkedGroupPurchases),
          blocked: newBlocked,
        });
      } else {
        blockedPerson = 'other';
        blockedPersonUserId = userId;
      }

      const message = newBlocked ? 'blocked' : 'unblocked';

      actions.setAlert(`The family member has been ${message}.`);
      navigation.goBack();

      await ProfileApi.blockFamilyMember({
        userId,
        blocked: newBlocked,
      })
        .promise.then(async result => {
          this.refreshChats();
        })
        .catch(error => {
          console.log('Invite error', error);
          actions.setAlert(error.data.statusText);
        });
    } else {
      // Remove invite.
      actions.removeFamilyInvited(inviteId);
      actions.setAlert('The invitation has been removed.');
      navigation.goBack();

      await ProfileApi.removeFamilyInvited({
        inviteId,
      })
        .promise.then(async result => {})
        .catch(error => {
          console.log('Invite error', error);
          actions.setAlert(error.data.statusText);
        });
    }
  }

  toggleChats = () => {
    const {checkedChats} = this.state;

    this.setState({checkedChats: !checkedChats});
  };

  toggleAdmin = () => {
    const {checkedAdmin} = this.state;

    this.setState({checkedAdmin: !checkedAdmin});
  };

  toggleGroupPurchases = () => {
    const {checkedGroupPurchases} = this.state;

    this.setState({checkedGroupPurchases: !checkedGroupPurchases});
  };

  nextKeyboardLastName() {
    this.lastNameInputRef.current.focus();
  }

  nextKeyboardEmailAddress() {
    this.emailAddressInputRef.current.focus();
  }

  render() {
    const {familyMyself} = this.props;
    const {
      edit,
      firstName,
      lastName,
      emailAddress,
      checkedAdmin,
      checkedChats,
      checkedGroupPurchases,
      familyAdmin,
      actionLoading,
    } = this.state;

    const title = edit ? 'Family Member' : 'Invite Family Member';
    const buttonLabel = edit ? 'Update Permissions' : 'Send Invite';

    const showMenu =
      edit && !familyAdmin && familyMyself.admin ? this.onPressMenu : null;
    const showAdminCheckbox =
      (edit && familyMyself.admin) || !edit ? true : false;

    const adminCheckboxDisabled = familyAdmin ? true : false;
    const adminCheckboxColor = familyAdmin
      ? Colors.buttonMainDisabled
      : Colors.highlight;

    const chatText = edit
      ? 'Participate in chats'
      : 'Add this family member to chats';
    const groupPurchaseText = edit
      ? 'Participate in group purchases'
      : 'Ask this family member to participate in group purchases';

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack
          title={title}
          onPressBack={this.onPressBack}
          onMenuPress={showMenu}
        />
        <KeyboardAwareScrollView
          style={styles.container}
          extraScrollHeight={60}
          enableResetScrollToCoords={false}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}>
            <FormWrapper style={styles.topGap}>
              <InputWithLabel
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                  !edit || FormStyles.inputContainerDisabled,
                ]}
                disabled={edit || false}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={32}
                numberOfLines={1}
                returnKeyType="next"
                label="First Name"
                value={firstName}
                onSubmitEditing={this.nextKeyboardLastName}
                onChangeText={text => this.setState({firstName: text})}
              />
              <InputWithLabel
                onRef={this.lastNameInputRef}
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                  !edit || FormStyles.inputContainerDisabled,
                ]}
                disabled={edit || false}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={32}
                numberOfLines={1}
                returnKeyType="next"
                label="Last Name"
                value={lastName}
                onChangeText={text => this.setState({lastName: text})}
                onSubmitEditing={this.nextKeyboardEmailAddress}
              />
              <InputWithLabel
                onRef={this.emailAddressInputRef}
                containerStyle={[
                  FormStyles.inputContainer,
                  FormStyles.inputContainerLabel,
                  !edit || FormStyles.inputContainerDisabled,
                ]}
                disabled={edit || false}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={64}
                numberOfLines={1}
                returnKeyType="next"
                keyboardType="email-address"
                label="Email Address"
                value={emailAddress}
                onChangeText={text => this.setState({emailAddress: text})}
                onSubmitEditing={this.nextKeyboardPassword}
              />

              {showAdminCheckbox ? (
                <CheckBox
                  style={styles.checkbox}
                  onClick={this.toggleAdmin}
                  isChecked={Boolean(checkedAdmin)}
                  disabled={adminCheckboxDisabled}
                  rightText="This person is a family co-administrator and can add or edit family members"
                  rightTextStyle={{fontFamily: 'SFProText-Regular'}}
                  checkBoxColor={adminCheckboxColor}
                />
              ) : null}

              <CheckBox
                style={styles.checkbox}
                onClick={this.toggleChats}
                isChecked={Boolean(checkedChats)}
                rightText={chatText}
                rightTextStyle={{fontFamily: 'SFProText-Regular'}}
                checkBoxColor={Colors.highlight}
              />

              <CheckBox
                style={styles.checkbox}
                onClick={this.toggleGroupPurchases}
                isChecked={Boolean(checkedGroupPurchases)}
                rightText={groupPurchaseText}
                rightTextStyle={{fontFamily: 'SFProText-Regular'}}
                checkBoxColor={Colors.highlight}
              />

              <View style={styles.buttonContainer}>
                <ButtonLoading
                  onPress={this.onPress}
                  isLoading={actionLoading}
                  containerStyle={FormStyles.button}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={FormStyles.buttonText}>
                    {buttonLabel}
                  </AppText>
                </ButtonLoading>
              </View>
            </FormWrapper>
            {this.renderActionSheet()}
          </ScrollView>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
    );
  }
  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  familyMyself: state.profile.familyMyself,
  auth: state.auth,
  pubnub: state.pubnub,
  settings: state.settings,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ProfileActions,
      ...AuthActions,
      ...AlertActions,
      ...PubNubActions,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
