import PubNub from 'pubnub';
import { createContext } from 'react';
import { Platform } from 'react-native';
import pubnubConfig from './pubnub.config';
import { ROOM_PREFIX } from '@utils/ChatManager';
import _ from 'lodash';
import { pushEnvironment } from '@lib/Settings';

import ChatApi from '@api/chatApi';

class PubSub {
  constructor() {
    this.pubnub = new PubNub({
      publishKey: pubnubConfig.publishKey,
      subscribeKey: pubnubConfig.subscribeKey,
      logVerbosity: false,
      presenceTimeout: 60,
      ssl: true
    });
  }

  closeConnections() {
    this.pubnub.unsubscribeAll();
  }

  setUUID(name) {
    this.pubnub.setUUID(name);
  }

  getUUID() {
    return this.pubnub.getUUID();
  }

  unsubscribeFromChannel = channel => {
    this.pubnub.unsubscribe({
      channels: [channel]
    });
  };

  hereNow = data => {
    return new Promise((resolve, reject) => {
      this.pubnub.hereNow({ channels: data.channels, includeUUIDs: true }, (status, response) => {
        resolve({ statusCode: status.statusCode, response });
      });
    });
  };

  sendSignal = data => {
    return new Promise((resolve, reject) => {
      this.pubnub.signal({ channel: data.channel, message: data.message }, (status, response) => {
        resolve({ statusCode: status.statusCode, response });
      });
    });
  };

  async getHereNow(subscribedArr) {
    return new Promise(async (resolve, reject) => {
      const getHereNow = await this.hereNow({ channels: subscribedArr });

      console.debug('getHereNow', getHereNow);

      if (getHereNow.statusCode === 200 && getHereNow.response.totalChannels > 0) {
        resolve({ foundChannels: true, hereNow: getHereNow.response.channels });
      } else {
        resolve({ foundChannels: false });
      }
    });
  }

  /*

* NEW

*/

  async getMessageCounts(data) {
    const { channels, timetokens } = data;

    return new Promise(async (resolve, reject) => {
      this.pubnub
        .messageCounts({
          channels: channels,
          channelTimetokens: timetokens
        })
        .then(response => {
          resolve({ response });
        })
        .catch(error => {});
    });
  }

  subscribe = (spaceId, presence) => {
    this.pubnub.subscribe({
      channels: spaceId,
      withPresence: presence
    });
    console.debug('subscribe', spaceId);
  };

  getRoomSubscriptions = async user => {
    return new Promise(async (resolve, reject) => {
      await ChatApi.getRooms({ userId: user.userId })
        .promise.then(async result => {
          const data = result.data;
          console.debug('getRoomSubscriptions', data);
          resolve({ statusCode: data.statusText, data });
        })
        .catch(error => {
          console.log('getRooms error', error);
        });
    });
  };

  async addPushChannels(subscribedArr, userPushCredential) {
    return new Promise(async (resolve, reject) => {
      let pushGateway;
      if (Platform.OS == 'ios') {
        pushGateway = 'apns2';
      } else {
        pushGateway = 'gcm';
      }

      this.pubnub.push.addChannels(
        {
          channels: subscribedArr,
          device: userPushCredential,
          pushGateway: pushGateway,
          environment: pushEnvironment, // Required for APNs2
          topic: 'org.boomhealth.app' // Required for APNs2
        },
        status => {
          if (status.error) {
            console.log('Operation failed addChannels: ', status);
          } else {
            console.log('Operation done addChannels!');
          }
        }
      );

      this.pubnub.push.listChannels(
        {
          device: userPushCredential,
          pushGateway: pushGateway,
          environment: pushEnvironment, // Required for APNs2
          topic: 'org.boomhealth.app' // Required for APNs2
        },
        function (status, response) {
          console.log('listChannels status', status);
          console.log('listChannels response', response);
          resolve({ channels: response });
        }
      );
    });
  }

  async removePushChannels(subscribedArr, userPushCredential) {
    return new Promise(async (resolve, reject) => {
      console.log('removePushChannels subscribedArr', subscribedArr);
      console.log('removePushChannels', userPushCredential);

      let pushGateway;
      if (Platform.OS == 'ios') {
        pushGateway = 'apns2';
      } else {
        pushGateway = 'gcm';
      }

      this.pubnub.push.removeChannels(
        {
          channels: subscribedArr,
          device: userPushCredential,
          pushGateway: pushGateway,
          environment: pushEnvironment,
          topic: 'org.boomhealth.app'
        },
        function (status) {
          if (status.error) {
            console.log('operation failed w/ error:', status);
          } else {
            console.log('operation done!');
          }
        }
      );
    });
  }

  async subscribeToChannels(chats, settings) {
    return new Promise(async (resolve, reject) => {
      if (chats?.length >= 1) {
        const subscribedArr = [];
        for (var ch of chats) {
          subscribedArr.push(ch.roomName);
        }
        this.subscribe(subscribedArr, true);
        this.subscribe(['signalChannel'], false);

        resolve({ foundChannels: true, channels: subscribedArr });
      } else {
        this.subscribe(['signalChannel'], false);
        resolve({ foundChannels: false });
      }
    });
  }

  async lastMessages(channelsIds) {
    return new Promise(async (resolve, reject) => {
      let response = await this.pubnub.fetchMessages({ channels: channelsIds, count: 1 });
      let channels = response.channels;
      let results = {};

      Object.keys(channels).forEach(key => {
        let channel = channels[key];
        if (channel && channel.length > 0) {
          let result = channel[0];
          let message = result.message;
          results[key] = message;
        }
      });

      if (!_.isEmpty(channels)) {
        resolve({ foundMessages: true, messages: results });
      } else {
        resolve({ foundMessages: false });
      }
    });
  }

  async getChats(user) {
    return new Promise(async (resolve, reject) => {
      await ChatApi.getChats({ var: 'empty' })
        .promise.then(async result => {
          const data = result.data;
          resolve({ foundChats: true, chats: [] });
        })
        .catch(error => {
          console.log('getChats error', error);
          resolve({ foundChats: false });
        });
    });
  }
}

// https://www.pubnub.com/docs/web-javascript/api-reference-misc
// Timetoken

export const PubSubContext = createContext();

export default PubSub;
