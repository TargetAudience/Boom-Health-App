import { Component } from 'react';
import { Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as PubNubActions from '@ducks/pubnub';
import { PubSubContext } from 'src/pubsub';
import ChatApi from '@api/chatApi';
import NavigationService from '@utils/NavigationService';

class PubNubRoot extends Component {
  constructor(props) {
    super(props);

    this.messageListener;
  }

  async componentDidMount() {
    var that = this;
    
    const { pubsub, pubsub: { pubnub } } = this.context;
    const { actions, auth, chats, settings } = this.props;

    if (Platform.OS === 'ios') {
      // this.registerNotificationEvents();
    }

    if (!_.isNil(auth.userId)) { 
      const pubnubId = `user.${auth.userId}`;
      pubsub.setUUID(pubnubId);
    }

    await ChatApi.getChats({ var: 'empty' })
      .promise.then(async result2 => {
        const chats = result2.data.chats;
        actions.addChats(chats);
        await pubsub.subscribeToChannels(chats, settings);
      })
    .catch(error => {
      console.log('getChats error', error);
    });

    this.messageListener = {
      status: async function(statusEvent) {
        console.log('messageListener status ---->', statusEvent);
        if (statusEvent.category === 'PNConnectedCategory') {
          that.connect(statusEvent.subscribedChannels);
        }
      },
      message: function(message) {
        // Gets called when a new message is added by myself or another other party.
        console.log('MessageListener message ---->', message);
        message['entry'] = message['message'];
        actions.addMessage(message);
        
        const last = {};
        message['message'].timetoken = message['timetoken'];
        last.message = message['message'];
        last.channel = message['channel'];
        actions.addLastMessage(last);

        const pubnubId = `user.${auth.userId}`;
        if (pubnubId !== message.publisher && NavigationService.getCurrentRoute().routeName !== 'MessagingSpace') {
          const channel = [];
          channel.push(message.channel);
          setTimeout(() => {
             that.calculateUnreadChannels(channel);
          } , 1000);
        } else {
          // If I typed the message, we need to update the latest read timestamp.
          actions.setUreadTimestamp({timetoken: message.timetoken, channel: message.channel});
        }
      },
      presence: function(data) {
        console.log('messageListener PRESENCE --->', data);
        // uuid: "user.323"
        if(data.action === 'join') {
          const memberId = data.uuid;
          const pubnubId = pubsub.getUUID();

          if (memberId !== pubnubId) {
            actions.addToHereNow(memberId);
          }
        } else if(data.action === 'timeout'|| data.action === 'leave') {
          actions.removeFromHereNow(data.uuid);
        }
      },
      signal: async function(event) {
        console.log('messageListener SIGNAL ---->', event);
        const { auth } = that.props;
        const { pubsub } = that.context;

        var message = event.message;
      }
    };
    pubnub.addListener(this.messageListener);
  }

  componentWillUnmount() {
    const { pubsub, pubsub: { pubnub } } = this.context;

    pubnub.removeListener(this.messageListener);
    pubnub.unsubscribeAll();
  }

  async connect(channels) {
    const { pubsub } = this.context;
    const { actions } = this.props;

    if (channels) {
      const lastMessages = await pubsub.lastMessages(channels);
      if (lastMessages.foundMessages) {
        actions.setLastMessages(lastMessages.messages);
      } else {
        actions.clearLastMessages();
      }

      const hereNow = await pubsub.getHereNow(channels);
      if (hereNow.foundChannels) {
        for (let [key, value] of Object.entries(hereNow.hereNow)) {
          if (value.occupants.length) {
            for (var occupant of value.occupants) {
              actions.addToHereNow(occupant.uuid);
            }
          }
        }
      } else {
        actions.clearHereNow();
      }

      this.calculateUnreadChannels(channels);
    }
  }

  async calculateUnreadChannels(channels) {
    const { pubsub } = this.context;
    const { actions, ureadTimestamps } = this.props;

    let channelsArr = [];
    let timestampArr = [];

    for (let key of channels) {
      if (key !== 'signalChannel') {
        channelsArr.push(key);
        if (ureadTimestamps[key] !== undefined) {
            let value = ureadTimestamps[key];
            timestampArr.push(value);      
        } else {
          timestampArr.push('15518041524300251'); // Something old for now.
        }
      }
    }

    const getMessageCounts = await pubsub.getMessageCounts({channels: channelsArr, timetokens: timestampArr});
    if (getMessageCounts.response && getMessageCounts.response.channels) {
      actions.addUnread(getMessageCounts.response.channels);
      /*console.log('getMessageCounts ------> ureadTimestamps', ureadTimestamps)
      console.log('getMessageCounts ------> channelsArr', channelsArr)
      console.log('getMessageCounts ------> timestampArr', timestampArr)
      console.log('getMessageCounts ------>', getMessageCounts.response.channels)*/
    }
  }

  registerNotificationEvents = () => {
  };

  render() {
    return null;
  }

  static contextType = PubSubContext;
}

const mapStateToProps = state => ({
  auth: state.auth, 
  chats: state.pubnub.chats,
  ureadTimestamps: state.pubnub.ureadTimestamps,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...PubNubActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PubNubRoot);
