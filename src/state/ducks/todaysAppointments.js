const initialState = {
  appointments: [],
  flagUpdate: 0
};

const SET_APPOINTMENTS_TODAY = 'SET_APPOINTMENTS_TODAY';
const FLAG_TODAYS_APPOINTMENTS_UPDATE = 'FLAG_TODAYS_APPOINTMENTS_UPDATE';
const CLEAR_TODAYS_APPOINTMENTS_UPDATE = 'CLEAR_TODAYS_APPOINTMENTS_UPDATE';
const REMOVE_TODAYS_APPOINTMENT = 'REMOVE_TODAYS_APPOINTMENT';
const REMOVE_ALL_APPOINTMENTS = 'REMOVE_ALL_APPOINTMENTS';

export function setAppointmentsToday(result) {
  return {
    type: SET_APPOINTMENTS_TODAY,
    payload: result
  };
}

export function flagTodaysAppointmentsUpdate() {
  return {
    type: FLAG_TODAYS_APPOINTMENTS_UPDATE
  };
}

export function clearTodaysAppointmentsUpdate() {
  return {
    type: CLEAR_TODAYS_APPOINTMENTS_UPDATE
  };
}

export function removeTodaysAppointment(result) {
  return {
    type: REMOVE_TODAYS_APPOINTMENT,
    payload: result
  };
}

export function clearTodaysAppointments() {
  return {
    type: REMOVE_ALL_APPOINTMENTS
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_TODAYS_APPOINTMENT:
      if (action.payload) {
        const filteredItems = state.appointments.filter(item => item.appointmentId !== action.payload);
        
        return {
          ...state,
          appointments: filteredItems
        };
      }
      break;

    case FLAG_TODAYS_APPOINTMENTS_UPDATE:
      return {
        ...state,
        flagUpdate: 1
      };
    break;

    case REMOVE_ALL_APPOINTMENTS:
      return {
        appointments: [],
        flagUpdate: 0
      };
    break;
    
    case CLEAR_TODAYS_APPOINTMENTS_UPDATE:
      return {
        ...state,
        flagUpdate: 0
      };
    break;

    case SET_APPOINTMENTS_TODAY:
      if (action.payload) {
        return {
          ...state,
          appointments: action.payload
        };
      }
      break;

    default:
      return state;
  }

  return state;
}
