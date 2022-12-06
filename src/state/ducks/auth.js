const initialState = {
  error: '',
  isUserSignedIn: false,
  userId: null,
  firstName: '',
  lastName: '',
  emailAddress: '',
  signedInPhoto: '',
  role: '',
  subRole: '',
  accountHolder: 0,
  userPatient: {
    profilePhoto: ''
  },
  userCaregiver: {
    profilePhoto: ''
  },
  postalCode: '',
  travelDistance: '',
  accessToken: '',
  creditExpired: 0,
  creditCaregiversAvailable: 0,
  creditPersonCare: '0.00',
  creditMeals: '0.00',
  creditEquipment: '0.00',
  creditTransportationAvailable: 0,
  flagDocumentsUpdate: 0,
  flagHomeRentalUpdate: 0
};

// ACTION TYPES

const SIGNOUT = 'SIGNOUT';
const REMOVE_PHOTO = 'REMOVE_PHOTO';
const SET_USER_SIGNED_IN = 'SET_USER_SIGNED_IN';
const SET_PATIENT_PHOTO = 'SET_PATIENT_PHOTO';
const SET_CAREGIVER_PHOTO = 'SET_CAREGIVER_PHOTO';
const UPDATE_EMAIL_ADDRESS = 'UPDATE_EMAIL_ADDRESS';
const SET_CREDIT_CAREGIVERS_AVAILABLE = 'SET_CREDIT_CAREGIVERS_AVAILABLE';
const SET_CREDIT_TRANSPORTATION_AVAILABLE = 'SET_CREDIT_TRANSPORTATION_AVAILABLE';
const USE_CREDIT_MEALS = 'USE_CREDIT_MEALS';
const USE_CREDIT_EQUIPMENT = 'USE_CREDIT_EQUIPMENT';
const SET_CAREGIVER_SERVICE_RANGE = 'SET_CAREGIVER_SERVICE_RANGE';
const FLAG_DOCUMENTS_UPDATE = 'FLAG_DOCUMENTS_UPDATE';
const CLEAR_DOCUMENTS_UPDATE = 'CLEAR_DOCUMENTS_UPDATE';
const FLAG_HOME_RENTAL_UPDATE = 'FLAG_HOME_RENTAL_UPDATE';
const CLEAR_HOME_RENTAL_UPDATE = 'CLEAR_HOME_RENTAL_UPDATE';

// ACTION CREATOR

export function flagDocumentsUpdate() {
  return {
    type: FLAG_DOCUMENTS_UPDATE
  };
}

export function clearDocumentsUpdate() {
  return {
    type: CLEAR_DOCUMENTS_UPDATE
  };
}

export function flagHomeRentalUpdate() {
  return {
    type: FLAG_HOME_RENTAL_UPDATE
  };
}

export function clearHomeRentalUpdate() {
  return {
    type: CLEAR_HOME_RENTAL_UPDATE
  };
}

export function setServiceRange(result) {
  return {
    type: SET_CAREGIVER_SERVICE_RANGE,
    payload: result
  };
}
export function setCreditTransportationAvailable(result) {
  return {
    type: SET_CREDIT_TRANSPORTATION_AVAILABLE,
    payload: result
  };
}

export function useCreditEquipment(result) {
  return {
    type: USE_CREDIT_EQUIPMENT,
    payload: result
  };
}

export function useCreditMeals(result) {
  return {
    type: USE_CREDIT_MEALS,
    payload: result
  };
}

export function setCreditCaregiversAvailable(result) {
  return {
    type: SET_CREDIT_CAREGIVERS_AVAILABLE,
    payload: result
  };
}

export function updateEmailAddress(result) {
  return {
    type: UPDATE_EMAIL_ADDRESS,
    payload: result
  };
}

export function signIn(data) {
  return {
    type: SET_USER_SIGNED_IN,
    payload: data
  };
}

export function setPatientPhoto(data) {
  return {
    type: SET_PATIENT_PHOTO,
    payload: data
  };
}

export function setCaregiverPhoto(data) {
  return {
    type: SET_CAREGIVER_PHOTO,
    payload: data
  };
}

export function removeProfilePhoto() {
  return {
    type: REMOVE_PHOTO
  };
}

export function signOut() {
  return {
    type: SIGNOUT
  };
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {

    case FLAG_DOCUMENTS_UPDATE:
      return {
        ...state,
        flagDocumentsUpdate: 1
      };
    break;

    case CLEAR_DOCUMENTS_UPDATE:
      return {
        ...state,
        flagDocumentsUpdate: 0
      };
    break;

    case FLAG_HOME_RENTAL_UPDATE:
      return {
        ...state,
        flagHomeRentalUpdate: 1
      };
    break;

    case CLEAR_HOME_RENTAL_UPDATE:
      return {
        ...state,
        flagHomeRentalUpdate: 0
      };
    break;

    case USE_CREDIT_EQUIPMENT: 
      let balanceEquipment = parseFloat(state.creditEquipment);
      if (parseFloat(action.payload) > balanceEquipment) {
        balanceEquipment = 0.00;
      } else {
        balanceEquipment = parseFloat(balanceEquipment) - parseFloat(action.payload);
      }

      return {
        ...state,
        creditEquipment: balanceEquipment.toFixed(2)
      };
    break;

    case USE_CREDIT_MEALS: 
      let balance = parseFloat(state.creditMeals);
      if (parseFloat(action.payload) > balance) {
        balance = 0.00;
      } else {
        balance = parseFloat(balance) - parseFloat(action.payload);
      }

      return {
        ...state,
        creditMeals: balance.toFixed(2)
      };
    break;

    case SET_CREDIT_TRANSPORTATION_AVAILABLE:
      return {
        ...state,
        creditTransportationAvailable: action.payload
      };
    break;

    case SET_CREDIT_CAREGIVERS_AVAILABLE:
      return {
        ...state,
        creditCaregiversAvailable: action.payload
      };
    break;

    case UPDATE_EMAIL_ADDRESS:
      return {
        ...state,
        emailAddress: action.payload
      };
    break;

    case REMOVE_PHOTO:
      return {
        ...state,
        userPatient: {
          ...state.userPatient,
          profilePhoto: ''
        },
        userCaregiver: {
          ...state.userCaregiver,
          profilePhoto: ''
        },
        signedInPhoto: ''
      };
    break;

    case SIGNOUT:
      return {
        ...initialState
      };
    break;

    case SET_USER_SIGNED_IN:
      return {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        emailAddress: action.payload.emailAddress,
        isUserSignedIn: action.payload.isUserSignedIn,
        role: action.payload.role,
        subRole: action.payload.subRole,
        postalCode: action.payload.postalCode,
        travelDistance: action.payload.travelDistance,
        accountHolder: action.payload.accountHolder,
        creditExpired: action.payload.creditExpired,
        creditCaregiversAvailable: action.payload.creditCaregiversAvailable,
        creditPersonCare: action.payload.creditPersonCare,
        creditMeals: action.payload.creditMeals,
        creditEquipment: action.payload.creditEquipment,
        creditTransportationAvailable: action.payload.creditTransportationAvailable,
        accessToken: action.payload.accessToken
      };
    break;

    case SET_PATIENT_PHOTO:
      return {
        ...state,
        userPatient: {
          ...state.userPatient,
          profilePhoto: action.payload
        },
        signedInPhoto: action.payload
      };
    break;

    case SET_CAREGIVER_PHOTO:
      return {
        ...state,
        userCaregiver: {
          ...state.userCaregiver,
          profilePhoto: action.payload
        },
        signedInPhoto: action.payload
      };
    break;

    case SET_CAREGIVER_SERVICE_RANGE:
      return {
        ...state,
        postalCode: action.payload.postalCode,
        travelDistance: action.payload.distance
      };
    break;

    default:
      return state;
  }

  return state;
}
