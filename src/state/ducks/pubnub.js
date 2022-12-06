import PubNub from 'pubnub';
import _ from 'lodash';

const initialState = {
  pubnub: null,
  messages: [],
  chats: [],
  channels: [],
  loading: false,
  hereNow: [],
  lastMessages: {},
  unreads: {},
  unreadsTotal: 0,
  ureadTimestamps: {}
};

// ACTION TYPES

const SET_PUBNUB = 'SET_PUBNUB';
const SET_CHANNELS = 'SET_CHANNELS';
const SET_MESSAGES = 'SET_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_CHAT = 'ADD_CHAT';
const ADD_CHATS = 'ADD_CHATS';
const REMOVE_CHAT = 'REMOVE_CHAT';
const CLEAR_CHATS = 'CLEAR_CHATS';
const SET_LOADING = 'SET_LOADING';
const ADD_HERENOW = 'ADD_HERENOW';
const REMOVE_HERENOW = 'REMOVE_HERENOW';
const CLEAR_HERENOW = 'CLEAR_HERENOW';
const SET_LASTMESSAGES = 'SET_LASTMESSAGES';
const ADD_LASTMESSAGE = 'ADD_LASTMESSAGE';
const CLEAR_LASTMESSAGES = 'CLEAR_LASTMESSAGES';
const ADD_UNREAD = 'ADD_UNREAD';
const CLEAR_UNREAD = 'CLEAR_UNREAD';
const CLEAR_PUBNUB = 'CLEAR_PUBNUB';
const LEAVE_CHAT = 'LEAVE_CHAT';
const SET_UNREAD_TIMESTAMP = 'SET_UNREAD_TIMESTAMP';

// ACTION CREATOR

export function setUreadTimestamp(data) {
  return {
    type: SET_UNREAD_TIMESTAMP,
    payload: data
  };
}

export function leaveChat(data) {
  return {
    type: LEAVE_CHAT,
    payload: data
  };
}

export function setChannels(data) {
  return {
    type: SET_CHANNELS,
    payload: data
  };
}

export function clearPubNub() {
  return {
    type: CLEAR_PUBNUB
  };
}

export function addUnread(data) {
  return {
    type: ADD_UNREAD,
    payload: data
  };
}

export function clearUnread(data) {
  return {
    type: CLEAR_UNREAD,
    payload: data
  };
}

export function setLastMessages(data) {
  return {
    type: SET_LASTMESSAGES,
    payload: data
  };
}

export function addLastMessage(data) {
  return {
    type: ADD_LASTMESSAGE,
    payload: data
  };
}

export function clearLastMessages() {
  return {
    type: CLEAR_LASTMESSAGES
  };
}

export function clearHereNow() {
  return {
    type: CLEAR_HERENOW
  };
}

export function addToHereNow(data) {
  return {
    type: ADD_HERENOW,
    payload: data
  };
}

export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data
  };
}

export function setPubNub(data) {
  return {
    type: SET_PUBNUB,
    payload: data
  };
}

export function setMessages(data) {
  return {
    type: SET_MESSAGES,
    payload: data
  };
}

export function addMessage(data) {
  return {
    type: ADD_MESSAGE,
    payload: data
  };
}

export function addChat(data) {
  return {
    type: ADD_CHAT,
    payload: data
  };
}

export function addChats(data) {
  return {
    type: ADD_CHATS,
    payload: data
  };
}

export function removeChat(data) {
  return {
    type: REMOVE_CHAT,
    payload: data
  };
}

export function clearChat() {
  return {
    type: CLEAR_CHATS
  };
}

export function removeFromHereNow(data) {
  return {
    type: REMOVE_HERENOW,
    payload: data
  };
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_UNREAD_TIMESTAMP: {
      if (action.payload) {
        const { ureadTimestamps } = state;
        const { timetoken, channel } = action.payload;

        ureadTimestamps[channel] = timetoken;

        return {
          ...state,
          ureadTimestamps
        }
      }
      break;
    }

    case LEAVE_CHAT: {
      const { chatRoomId } = action.payload;

      const filtered = state.chats.filter(item => item.chatRoomId !== chatRoomId);

      return {
        ...state,
        chats: filtered
      };
    }

    case SET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };

    case CLEAR_PUBNUB: {
      return {
        ...state,
        pubnub: null,
        messages: [],
        chats: [],
        channels: [],
        loading: false,
        hereNow: [],
        lastMessages: {},
        unreads: {},
        unreadsTotal: 0 
      }
    }

    case ADD_UNREAD: {
      if (action.payload) {
        const channels = action.payload;
        let count = 0;

        for (let key in channels) {
          if (key !== 'signalChannel') {
            let value = channels[key];
            count =+ value;
          }
        }

        return {
          ...state,
          unreads: action.payload,
          unreadsTotal: count
        }
      }
      break;
    }

    case CLEAR_UNREAD: {
      const { unreads } = state;

      unreads[action.payload] = 0;

      let count = 0;
      for (let key in unreads) {
        if (key !== 'signalChannel') {
          let value = unreads[key];
          count =+ value;
        }
      }

      return {
        ...state,
        unreads,
        unreadsTotal: count
      };
    }

    case SET_LASTMESSAGES: {
      if (action.payload) {
        return {
          ...state,
          lastMessages: action.payload
        };
      }
      break;
    }

    case ADD_LASTMESSAGE: {
      if (action.payload) {
        const { message, channel } = action.payload;
        const { lastMessages } = state;
        lastMessages[channel] = message;

        return {
          ...state,
          lastMessages,
          rand: Math.random()
        }
      }
      break;
    }

    case CLEAR_LASTMESSAGES: {
      return {
        ...state,
        lastMessages: []
      };
    }

    case REMOVE_HERENOW: {
      const filteredHereNow = state.hereNow.filter(item => item !== action.payload);

      return {
        ...state,
        hereNow: filteredHereNow
      };
    }

    case ADD_HERENOW: {
      const exists = state.hereNow.some((item) => item === action.payload);

      if (!exists) {
        const addedChats = [action.payload, ...state.hereNow];
        return {
          ...state,
          hereNow: addedChats
        };
      } else {
        return {
          ...state
        };
      }
    }

    case CLEAR_HERENOW: {
      return {
        ...state,
        hereNow: []
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }

    case ADD_CHAT: {
      const exists = state.chats.some((item) => item === action.payload);

      if (!exists) {
        const addedChats = [action.payload, ...state.chats];
        return {
          ...state,
          chats: addedChats
        };
      } else {
        return {
          ...state
        };
      }
    }

    case ADD_CHATS: {
      if (action.payload) {        
        const subscribedArr = [];
        for (var ch of action.payload) {
          subscribedArr.push(ch.roomName);
        }

        return {
          ...state,
          channels: subscribedArr,
          chats: action.payload
        };
      }
    }

    case CLEAR_CHATS: {
      return {
        ...state,
        chats: []
      };
    }

    case REMOVE_CHAT: {
      let count = 0;
      let found = null;
      let lookForKey = null;
      for (var ch of state.chats) {
        lookForKey = ch.find(k => k.id == action.payload);
        if (lookForKey) {
          found = count;
        }
        count = count + 1;
      }

      const filteredItems = state.chats.slice(0, found).concat(state.chats.slice(found + 1, state.chats.length))

      return {
        ...state,
        chats: filteredItems
      };
    }

    case SET_PUBNUB:
      return {
        ...state,
        pubnub: action.payload
      };

    case SET_MESSAGES: {
      if (action.payload) {
        const { messagesNew, channel } = action.payload;
        const { messages } = state;

        messages[channel] = messagesNew;

        return {
          ...state,
          messages
        };
      }
      break;
    }

    case ADD_MESSAGE: {
      if (action.payload) {
        const { message, channel } = action.payload;
        const { messages } = state;

        const messageThread = messages[channel] || [];
        messages[channel] = [ ...messageThread, action.payload ];

        return {
          ...state,
          messages,
          rand: Math.random()
        }
      }
      break;
    }

    default:
      return state;
  }
}
