import React, {Component} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import MixpanelManager from '@utils/Analytics';
import moment from 'moment';
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  InputToolbar,
  Avatar,
} from 'react-native-gifted-chat';
import SafeAreaView from 'react-native-safe-area-view';
//import { ActionSheet } from 'native-base';
import _ from 'lodash';
import {CustomHeaderBack, LoaderListMessage} from '@components/common';
import {PubSubContext} from 'src/pubsub';
import styles from './Room.styles';
import ChatPersonProfile from './ChatPersonProfile';
import {renderComposer, renderInputToolbar, renderSend} from './lib';
import * as PubNubActions from '@ducks/pubnub';
import {ROOM_PREFIX} from '@utils/ChatManager';
import {Colors} from '@constants/GlobalStyles';
import {pushEnvironment} from '@lib/Settings';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import ChatApi from '@api/chatApi';

const BUTTONS = ['Leave Chat', 'Cancel'];

const DESTRUCTIVE_INDEX = [1];
const CANCEL_INDEX = 1;

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageThread: [],
      item: null,
      channelName: '',
      roomInfo: {},
      newChatLoading: false,
    };

    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidUpdate(prevProps) {
    const {messages, actions} = this.props;
    const {item, messageThread, channelName} = this.state;

    const channelMessages = prevProps.messages[channelName] || [];

    if (
      !_.isNil(messageThread) &&
      messageThread.length !== channelMessages.length
    ) {
      this.loadMessages();
    }
  }

  async componentDidMount() {
    const {pubsub} = this.context;
    const {
      auth,
      actions,
      navigation: {
        state: {
          params: {item, newChat, roomInfo},
        },
      },
    } = this.props;

    this.setState({item, roomInfo});

    // User is coming from the chat tab.
    this.fetchMessages(item.roomName);
    this.setState({channelName: item.roomName});
    actions.clearUnread(item.roomName);

    // //this.mixpanel.track('View Chat Room');
  }

  fetchMessages = spaceId => {
    const {
      pubsub,
      pubsub: {pubnub},
    } = this.context;
    const {actions} = this.props;

    pubnub.history(
      {
        channel: [spaceId],
        count: 50,
        includeTimetoken: true,
        stringifiedTimeToken: true,
      },
      (status, response) => {
        if (response) {
          const result = [];
          result[spaceId] = response.messages;

          actions.setMessages({
            messagesNew: response.messages,
            channel: spaceId,
          });

          const lastMessage = response.messages.slice(-1);
          actions.setUreadTimestamp({
            timetoken: lastMessage[0].timetoken,
            channel: spaceId,
          });
          this.loadMessages();
        } else {
          this.setState({newChatLoading: false});
        }
      },
    );
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onPressChatMembers = () => {
    const {navigation} = this.props;
    const {item} = this.state;

    navigation.navigate('ChatSelectUsers', {item});
  };

  leaveChat = async () => {
    const {pubsub} = this.context;
    const {actions} = this.props;
    const {item, channelName} = this.state;

    await ChatApi.leaveChat({chatRoomId: item.chatRoomId})
      .promise.then(async result => {
        actions.leaveChat({chatRoomId: item.chatRoomId});
        await pubsub.unsubscribeFromChannel(channelName);
        this.onPressBack();
      })
      .catch(error => {
        console.log('leaveChat error', error);
      });
  };

  onMenuPress = () => {
    /*ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        this.leaveChat();
      }
    })*/
  };

  parseUnixTime(unixTime) {
    const unixTimestamp = unixTime / 10000000;
    const gmtDate = new Date(unixTimestamp * 1000);
    return gmtDate.toLocaleString();
  }

  loadMessages() {
    const {auth, messages} = this.props;
    const {channelName} = this.state;

    const channelMessages = messages[channelName];
    let messageThread = [];

    if (!_.isNil(channelMessages)) {
      messageThread = _.orderBy(channelMessages, ['timetoken'], ['desc']).map(
        result => ({
          _id: Math.round(Math.random() * 1000000),
          text: result.entry.text,
          createdAt: result.entry ? result.entry.createdAt : '',
          user: {
            _id: result.entry.user._id,
            name: result.entry.user.name,
            avatar: '',
          },
        }),
      );
      this.setState({messageThread});
    }
    this.setState({newChatLoading: false});
  }

  onSend(messages = []) {
    const {pubsub} = this.context;
    const {auth, actions, settings} = this.props;
    const {channelName, roomInfo} = this.state;

    // console.log('settings', settings.userPushCredential);

    console.log('onSend 1', messages);

    for (let i = 0; i < messages.length; i++) {
      const send = {
        channel: channelName,
        subscribedChannel: channelName,
        actualChannel: null,
        publisher: `user.${auth.userId}`,
        message: {
          pn_apns: {
            aps: {
              alert: {
                title: 'You have a new message in',
                body: roomInfo.chatWith,
              },
              badge: 1,
              sound: 'default',
            },
            pn_push: [
              {
                push_type: 'alert',
                auth_method: 'token',
                targets: [
                  {
                    environment: pushEnvironment,
                    topic: 'org.boomhealth.app',
                  },
                ],
                version: 'v2',
              },
            ],
            excluded_devices: [settings.userPushCredential],
          },
          pn_gcm: {
            notification: {
              title: 'You have a new message in',
              body: roomInfo.chatWith,
            },
          },
          _id: Math.round(Math.random() * 1000000),
          to: channelName,
          text: messages[i].text,
          createdAt: messages[i].createdAt,
          user: {
            _id: auth.userId,
            name: `${auth.firstName} ${auth.lastName}`,
            avatar: '',
          },
        },
      };

      // console.log('send ----->', send);
      pubsub.pubnub.publish(send, function (status, response) {
        if (status.error) {
          console.log('Error', status);
        }
      });
    }
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            backgroundColor: Colors.textMain,
          },
        }}
      />
    );
  };

  renderAvatar = props => {
    return (
      <Avatar
        {...props}
        imageStyle={{left: {backgroundColor: Colors.buttonMain}}}
      />
    );
  };

  render() {
    const {auth, hereNow, profile} = this.props;
    const {item, messageThread, newChatLoading, roomInfo} = this.state;

    const showMenu = profile.familyMyself.admin === 1;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            {showMenu ? (
              <CustomHeaderBack
                title=""
                onPressBack={this.onPressBack}
                onPressCustomRight={this.onPressChatMembers}
                customRightText="Members"
              />
            ) : (
              <CustomHeaderBack title="" onPressBack={this.onPressBack} />
            )}
            <View>
              {item ? (
                <ChatPersonProfile
                  onPress={this.onMenuPress}
                  profile={profile.familyMyself}
                  data={item}
                  roomInfo={roomInfo}
                />
              ) : null}
            </View>
            <LoaderListMessage
              loading={newChatLoading}
              message={'Starting up chat'}
            />
            <View style={styles.chatContainer}>
              <GiftedChat
                messages={messageThread}
                user={{
                  _id: auth.userId,
                }}
                scrollToBottom={false}
                keyboardShouldPersistTaps="never"
                showAvatarForEveryMessage={false}
                renderBubble={this.renderBubble}
                renderAvatar={this.renderAvatar}
                showAvatarForEveryMessage={false}
                alwaysShowSend
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                renderComposer={renderComposer}
                onSend={this.onSend}
                multiline={false}
                minInputToolbarHeight={54}
              />
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  pubnub: state.pubnub,
  messages: state.pubnub.messages,
  auth: state.auth,
  hereNow: state.pubnub.hereNow,
  profile: state.profile,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...PubNubActions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
