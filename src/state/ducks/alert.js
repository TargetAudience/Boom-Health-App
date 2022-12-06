const initialState = {
  message: '',
  messageModal: '',
  type: 'error', 
  rand: null
};

const SET_ALERT = 'SET_ALERT';
const CLEAR_ALERT = 'CLEAR_ALERT';
const SET_ALERT_MODAL = 'SET_ALERT_MODAL';
const CLEAR_ALERT_MODAL = 'CLEAR_ALERT_MODAL';

export function clearAlert() {
  return {
    type: CLEAR_ALERT
  };
}

export function clearAlertModal() {
  return {
    type: CLEAR_ALERT_MODAL
  };
}

export function setAlert(message = '', type = 'error') {
  return {
    type: SET_ALERT,
    payload: {
      message,
      type,
      rand: Math.random()
    }
  };
}

export function setAlertModal(message = '', type = 'error') {
  return {
    type: SET_ALERT_MODAL,
    payload: {
      message,
      type,
      rand: Math.random()
    }
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ALERT:
      return {
        ...state,
        message: '',
        messageModal: '',
        type: null,
        rand: null
      };

    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        rand: action.payload.rand
      };

    case CLEAR_ALERT_MODAL:
      return {
        ...state,
        message: '',
        messageModal: '',
        type: null,
        rand: null
      };

    case SET_ALERT_MODAL:
      return {
        ...state,
        message: '',
        messageModal: action.payload.message,
        type: action.payload.type,
        rand: action.payload.rand
      };

    default:
      return state;
  }
}
