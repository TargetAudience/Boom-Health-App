const initialState = {
  selectedPickup: 'patient',
  selectedDropOff: 'patient',
  selectedPickupPreview: '',
  selectedDropOffPreview: ''
};

const SET_SELECTED_PICKUP = 'SET_SELECTED_PICKUP';
const SET_SELECTED_DROPOFF = 'SET_SELECTED_DROPOFF';
const CLEAR_ALL_TRANSPORTATION = 'CLEAR_ALL';

export function setSelectedPickup(result) {
  return {
    type: SET_SELECTED_PICKUP,
    payload: result
  };
}

export function setSelectedDropOff(result) {
  return {
    type: SET_SELECTED_DROPOFF,
    payload: result
  };
}

export function clearAllTransportation() {
  return {
    type: CLEAR_ALL_TRANSPORTATION
  };
}

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SELECTED_PICKUP:
      if (action.payload) {
        return {
          ...state,
          selectedPickup: action.payload.value,
          selectedPickupPreview: action.payload.preview
        };
      }
      break;

    case SET_SELECTED_DROPOFF:
      if (action.payload) {
        return {
          ...state,
          selectedDropOff: action.payload.value,
          selectedDropOffPreview: action.payload.preview
        };
      }
      break;

    case CLEAR_ALL_TRANSPORTATION:
      return {
        selectedPickup: 'patient',
        selectedDropOff: 'patient',
        selectedPickupPreview: '',
        selectedDropOffPreview: ''
      };
      break;

    
    default:
      return state;
  }

  return state;
}
