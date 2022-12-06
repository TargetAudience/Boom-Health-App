import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  InputToolbar,
  Avatar,
} from 'react-native-gifted-chat';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import _ from 'lodash';
import {
  CustomHeaderBack,
  LoaderList,
  CheckmarkToggle,
  ButtonLoading,
  AppText
} from '@components/common';
import {PubSubContext} from 'src/pubsub';
import {photosUrl} from '@lib/Settings';
import {ROOM_PREFIX} from '@utils/ChatManager';
import images from '@assets/images';
import {Colors, GlobalStyles, Globals} from '@constants/GlobalStyles';
import styles from './ChatSelectUsers.styles';

import * as AlertActions from '@ducks/alert';
import * as PubNubActions from '@ducks/pubnub';

import ChatApi from '@api/chatApi';

class ChatSelectUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      isLoadingButton: false,
      item: props.navigation.getParam('item', []),
      members: [],
      nonMembers: [],
      checkedList: [],
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
   // //this.mixpanel.track('View Chat Members');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  generateKey(pre) {
    return `${pre}_${Math.random()}`;
  }

  loadData() {
    const {actions} = this.props;
    const {item} = this.state;

    this.setState({actionLoading: true});

    ChatApi.getChatMembers({chatRoomId: item.chatRoomId})
      .promise.then((result) => {
        const data = result.data.people;

        const members = data.filter((item) => item.active === 1);
        const nonMembers = data.filter((item) => item.active === 0);

        this.setState({members, nonMembers, actionLoading: false});
      })
      .catch((error) => {
        this.setState({actionLoading: false});
        actions.setAlert(error.data.error);
      });
  }

  onPressCheckmark = (item) => {
    let {checkedList} = this.state;

    if (checkedList.indexOf(item.chatRoomParticipantId) == -1) {
      checkedList.push(item.chatRoomParticipantId);
      this.setState({checkedList});
    } else {
      checkedList = checkedList.filter((i) => i != item.chatRoomParticipantId);
      this.setState({checkedList});
    }
  };

  onPressRemove = item => {
    ChatApi.removeFromChat({chatRoomParticipantId: item.chatRoomParticipantId})
      .promise.then((result) => {
        this.loadData();
        this.refreshChats();
      })
      .catch((error) => {});
  };

  onPressNext = () => {
    const {actions, navigation} = this.props;
    const {checkedList, nonMembers} = this.state;

    if (nonMembers.length === 0) {
      return;
    }

    if (checkedList.length === 0) {
      actions.setAlert('Please select at least one non-member.');
      return;
    }

    this.setState({isLoadingButton: true});

    ChatApi.addToChat({checkedList})
      .promise.then((result) => {
        this.loadData();
        this.refreshChats();
        this.setState({isLoadingButton: false});
      })
      .catch((error) => {
        this.setState({isLoadingButton: false});
        actions.setAlert(error.data.error);
      });
  };

  refreshChats() {
    const {pubsub} = this.context;
    const {actions, settings} = this.props;

    ChatApi.getChats({var: 'empty'})
      .promise.then(async (result2) => {
        const chats = result2.data.chats;
        actions.addChats(chats);
        await pubsub.subscribeToChannels(chats, settings);
      })
      .catch((error) => {
        console.log('refreshChats error', error);
      });
  }

  isChecked = (item) => {
    const {checkedList} = this.state;
    if (checkedList.indexOf(item) == -1) {
      return false;
    }
    return true;
  };

  render() {
    const {hereNow} = this.props;
    const {
      actionLoading,
      isLoadingButton,
      item,
      members,
      nonMembers,
    } = this.state;

    const showList = !actionLoading;
    const nonMembersEmpty = nonMembers.length === 0;

    return (
       <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title="Chat Members" onPressBack={this.onPressBack} />
        <LoaderList loading={actionLoading} />

        {showList ? (
          <>
            <ScrollView style={styles.container}>
              <AppText textWeight="500" style={styles.header}>Members</AppText>
              {members.map((item) => {
                const isAdmin = item.admin === 1;
                const hereNowUser = `user.${item.userId}`;
                const isOnline = hereNow.includes(hereNowUser) ? true : false;
                const imageAvailable = isOnline ? images.statusAvailable : images.statusUnavailable;

                return (
                  <View style={styles.rowContainer} key={item.userId.toString()}>
                    <View style={styles.rowContainerB}>
                      <Image style={styles.imageIndicator} source={imageAvailable} resizeMode="cover" />
                      <AppText textWeight="500" style={styles.nameText}>{item.firstName} {item.lastName} </AppText>
                      {isAdmin ? (
                        <AppText textWeight="400" style={styles.subText}>(admin)</AppText>
                      ) : null}
                    </View>
                    <View>
                      {!isAdmin ? (
                        <TouchableHighlight
                          onPress={() => this.onPressRemove(item)}
                          underlayColor="transparent"
                          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
                          <Image
                            source={images.cancel}
                            style={styles.iconCancel}
                          />
                        </TouchableHighlight>
                      ) : null}
                    </View>
                  </View>
                );
              })}
              <AppText textWeight="500" style={[styles.header, styles.headerNonMember]}>Non-Members</AppText>
              {nonMembers.map((item) => {
                const isChecked = this.isChecked(item.chatRoomParticipantId);
                const isAdmin = item.admin === 1;
                const hereNowUser = `user.${item.userId}`;
                const isOnline = hereNow.includes(hereNowUser) ? true : false;
                const imageAvailable = isOnline ? images.statusAvailable : images.statusUnavailable;

                return (
                  <TouchableWithoutFeedback
                    onPress={() => this.onPressCheckmark(item)}>
                    <View style={styles.checkmarkContainer}>
                      <CheckmarkToggle
                        checked={isChecked}
                        onPress={() => this.onPressCheckmark(item)}
                      />
                      <View style={styles.rowContainerB}>
                        <Image style={[styles.imageIndicator, styles.imageIndicatorNonMember]} source={imageAvailable} resizeMode="cover" />
                        <AppText textWeight="400" style={styles.textCheckmark}>{item.firstName} {item.lastName} </AppText>
                        {isAdmin ? (
                          <AppText textWeight="300" style={styles.subText}>(admin)</AppText>
                        ) : null}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
              {nonMembersEmpty ? (
                <View style={styles.nonMembersEmptyContainer}>
                  <AppText textWeight="400" style={styles.nonMembersEmptyText}>None</AppText>
                </View>
              ) : null}
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerInner}>
                <ButtonLoading
                  actuallyDisable={nonMembersEmpty}
                  containerDisabledStyle={styles.buttonDisabled}
                  onPress={this.onPressNext}
                  isLoading={isLoadingButton}
                  containerStyle={styles.button}>
                  <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>ADD NON-MEMBER TO CHAT</AppText>
                </ButtonLoading>
              </View>
            </View>
          </>
        ) : null}
      </SafeAreaView>
    );
  }
  static contextType = PubSubContext;
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...PubNubActions,
    },
    dispatch,
  ),
});

const mapStateToProps = (state) => ({
  user: state.auth,
  hereNow: state.pubnub.hereNow,
  settings: state.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatSelectUsers);
