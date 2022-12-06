const initialState = {
  appointments: [],
  flagUpdate: 0
};

const SET_APPOINTMENTS = 'SET_APPOINTMENTS';
const FLAG_MY_CALENDAR_UPDATE = 'FLAG_MY_CALENDAR_UPDATE';
const CLEAR_MY_CALENDAR_UPDATE = 'CLEAR_MY_CALENDAR_UPDATE';
const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
const ADD_FEEDBACK_SENT = 'ADD_FEEDBACK_SENT';
const CLEAR_MY_CALENDAR = 'CLEAR_MY_CALENDAR';

export function addFeedbackSent(result) {
  return {
    type: ADD_FEEDBACK_SENT,
    payload: result
  };
}

export function setAppointments(result) {
  return {
    type: SET_APPOINTMENTS,
    payload: result
  };
}

export function flagMyCalendarUpdate() {
  return {
    type: FLAG_MY_CALENDAR_UPDATE
  };
}

export function clearMyCalendarUpdate() {
  return {
    type: CLEAR_MY_CALENDAR_UPDATE
  };
}

export function clearMyCalendar() {
  return {
    type: CLEAR_MY_CALENDAR
  };
}

export function removeAppointment(result) {
  return {
    type: REMOVE_APPOINTMENT,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_APPOINTMENT:
      if (action.payload) {
        const filteredItems = state.appointments.filter(item => item.appointmentId !== action.payload);
        
        return {
          ...state,
          appointments: filteredItems
        };
      }
      break;

    case FLAG_MY_CALENDAR_UPDATE:
      return {
        ...state,
        flagUpdate: 1
      };
    break;

    case CLEAR_MY_CALENDAR:
      return {
        flagUpdate: 0,
        appointments: []
      };
    break;

    case CLEAR_MY_CALENDAR_UPDATE:
      return {
        ...state,
        flagUpdate: 0
      };
    break;

    case SET_APPOINTMENTS:
      if (action.payload) {
        return {
          ...state,
          appointments: action.payload
        };
      }
      break;

    case ADD_FEEDBACK_SENT:
      if (action.payload) {

        const filteredItems = state.appointments.map(content => content.appointmentId === action.payload.appointmentId ? {...content, appointmentFeedbackId: action.payload.appointmentFeedbackId} : content);

        return {
          ...state, 
          appointments: filteredItems
        };
      }
      break;

    default:
      return state;
  }

  return state;
}
