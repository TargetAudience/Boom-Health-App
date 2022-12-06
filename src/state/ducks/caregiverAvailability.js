const initialState = {
  defaultTimes: {
    'mon': [],
    'tue': [],
    'wed': [],
    'thu': [],
    'fri': [],
    'sat': [],
    'sun': []
  },
  specificTimes: [],
  dailyNotAvailable: []
};

const SET_DEFAULT_TIMES = 'SET_DEFAULT_TIMES';
const ADD_SPECIFIC_TIME = 'ADD_SPECIFIC_TIME';
const REMOVE_SPECIFIC_TIME = 'REMOVE_SPECIFIC_TIME';
const ADD_DAILY_AVAILABILITY = 'ADD_DAILY_AVAILABILITY';
const REMOVE_DAILY_AVAILABILITY = 'REMOVE_DAILY_AVAILABILITY';
const SET_DAILY_AVAILABILITY = 'SET_DAILY_AVAILABILITY';
const SET_SPECIFIC_TIMES = 'SET_SPECIFIC_TIMES';

export function setDefaultTimes(result) {
  return {
    type: SET_DEFAULT_TIMES,
    payload: result
  };
}

export function setSpecificTimes(result) {
  return {
    type: SET_SPECIFIC_TIMES,
    payload: result
  };
}

export function addSpecificTime(result) {
  return {
    type: ADD_SPECIFIC_TIME,
    payload: result
  };
}

export function removeSpecificTime(result) {
  return {
    type: REMOVE_SPECIFIC_TIME,
    payload: result
  };
}

export function setDailyAvailability(result) {
  return {
    type: SET_DAILY_AVAILABILITY,
    payload: result
  };
}

export function addDailyAvailability(result) {
  return {
    type: ADD_DAILY_AVAILABILITY,
    payload: result
  };
}

export function removeDailyAvailability(result) {
  return {
    type: REMOVE_DAILY_AVAILABILITY,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SPECIFIC_TIMES:
      if (action.payload) {
        return {
          ...state,
          specificTimes: action.payload
        };
      }
      break;

    case SET_DAILY_AVAILABILITY:
      if (action.payload) {
        return {
          ...state,
          dailyNotAvailable: action.payload
        };
      }
      break;

    case ADD_DAILY_AVAILABILITY:
      if (action.payload) {
        const dailyAvailabilityNew = [...state.dailyNotAvailable, action.payload];
        const uniqueDailyAvailability = [...new Set(dailyAvailabilityNew)]; 

        return {
          ...state,
          dailyNotAvailable: uniqueDailyAvailability
        };
      }
      break;

    case REMOVE_DAILY_AVAILABILITY:
      if (action.payload) {
        const filteredItems = state.dailyNotAvailable.filter(item => item !== action.payload);

        return {
          ...state,
          dailyNotAvailable: filteredItems
        };
      }
      break;

    case SET_DEFAULT_TIMES:
      if (action.payload) {

        return {
          ...state,
          defaultTimes: action.payload
        };
      }
      break;

    case ADD_SPECIFIC_TIME:
      if (action.payload) {
        const specificTimesNew = [...state.specificTimes, action.payload];

        return {
          ...state,
          specificTimes: specificTimesNew
        };
      }
      break;

    case REMOVE_SPECIFIC_TIME:
      if (action.payload) {
        const filteredItems = state.specificTimes.filter(item => item.id !== action.payload);

        return {
          ...state,
          specificTimes: filteredItems
        };
      }
      break;

    default:
      return state;
  }

  return state;
}
