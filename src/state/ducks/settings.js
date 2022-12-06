const initialState = {
  userPushCredential: '',
  enablePushNotifications: false,
  enableEmailNotifications: false,
  enableSmsNotifications: false,
  hasShownChatPopup: 0,
  hasShownStoryWelcomePopup: 0
};

const ENABLE_PUSH_NOTIFICATIONS = 'ENABLE_PUSH_NOTIFICATIONS';
const ENABLE_EMAIL_NOTIFICATIONS = 'ENABLE_EMAIL_NOTIFICATIONS';
const ENABLE_SMS_NOTIFICATIONS = 'ENABLE_SMS_NOTIFICATIONS';
const ADD_USER_PUSH_CREDENTIAL = 'ADD_USER_PUSH_CREDENTIAL';
const SET_CHAT_POPUP_SHOWN = 'SET_CHAT_POPUP_SHOWN';
const SET_STORY_WELCOME_POPUP_SHOWN = 'SET_STORY_WELCOME_POPUP_SHOWN';

export function setChatPopupShown() {
  return {
    type: SET_CHAT_POPUP_SHOWN
  };
}

export function setStoryWelcomePopupShown() {
  return {
    type: SET_STORY_WELCOME_POPUP_SHOWN
  };
}

export function addUserPushCredential(result) {
  return {
    type: ADD_USER_PUSH_CREDENTIAL,
    payload: result
  };
}

export function enablePushNotifications(result) {
  return {
    type: ENABLE_PUSH_NOTIFICATIONS,
    payload: result
  };
}

export function enableEmailNotifications(result) {
  return {
    type: ENABLE_EMAIL_NOTIFICATIONS,
    payload: result
  };
}

export function enableSmsNotifications(result) {
  return {
    type: ENABLE_SMS_NOTIFICATIONS,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHAT_POPUP_SHOWN:
      return {
        ...state,
        hasShownChatPopup: 1
      };
    break;
  
    case SET_STORY_WELCOME_POPUP_SHOWN:
      return {
        ...state,
        hasShownStoryWelcomePopup: 1
      };
    break;
    
    case ADD_USER_PUSH_CREDENTIAL:
      if (action.payload) {
        return {
          ...state,
          userPushCredential: action.payload
        };
      }
      break;

    case ENABLE_PUSH_NOTIFICATIONS:
      return {
        ...state,
        enablePushNotifications: action.payload
      };

    case ENABLE_EMAIL_NOTIFICATIONS:
      return {
        ...state,
        enableEmailNotifications: action.payload
      };

    case ENABLE_SMS_NOTIFICATIONS:
      return {
        ...state,
        enableSmsNotifications: action.payload
      };

    default:
      return state;
  }

  return state;
}
