const initialState = {
  owner: {
    street: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    alternateContactName: '',
    alternateContactNumber: ''
  },
  patient: {},
  servicesAvailable: [],
  tempInvites: [],
  needs: {},
  familyMembers: [],
  familyInvited: [],
  cardData: [],
  familyMyself: {
    admin: 0,
    chats: 0,
    groupPurchases: 0,
    blocked: 0
  },
  customAddresses: [],
};

const SET_PROFILE_OWNER = 'SET_PROFILE_OWNER';
const SET_PROFILE_PATIENT = 'SET_PROFILE_PATIENT';
const SET_SERVICES_AVAILABLE = 'SET_SERVICES_AVAILABLE';
const ADD_TEMP_INVITE = 'ADD_TEMP_INVITE';
const REMOVE_TEMP_INVITE = 'REMOVE_TEMP_INVITE';
const CLEAR_TEMP_INVITES = 'CLEAR_TEMP_INVITES';
const SET_PROFILE_NEEDS = 'SET_PROFILE_NEEDS';
const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER';
const UPDATE_FAMILY_MEMBER = 'UPDATE_FAMILY_MEMBER';
const UPDATE_FAMILY_MEMBER_INVITED = 'UPDATE_FAMILY_MEMBER_INVITED';
const ADD_FAMILY_INVITED = 'ADD_FAMILY_INVITED';
const ADD_FAMILIES_INVITED = 'ADD_FAMILIES_INVITED';
const ADD_FAMILIES_REGISTERED = 'ADD_FAMILIES_REGISTERED';
const BLOCK_FAMILY_MEMBER = 'BLOCK_FAMILY_MEMBER';
const REMOVE_FAMILY_INVITE = 'REMOVE_FAMILY_INVITE';
const ADD_CARD_DATA = 'ADD_CARD_DATA';
const ADD_CARDS_DATA = 'ADD_CARDS_DATA';
const REMOVE_CARD = 'REMOVE_CARD';
const SET_DEFAULT_CARD = 'SET_DEFAULT_CARD';
const UPDATE_MY_FAMILY_PERMISSIONS = 'UPDATE_MY_FAMILY_PERMISSIONS';
const SET_CUSTOM_ADDRESSES = 'SET_CUSTOM_ADDRESSES';
const ADD_CUSTOM_ADDRESS = 'ADD_CUSTOM_ADDRESS';
const REMOVE_CUSTOM_ADDRESS = 'REMOVE_CUSTOM_ADDRESS';
const CLEAR_ALL_PROFILE = 'CLEAR_ALL_PROFILE';

export function clearProfile() {
  return {
    type: CLEAR_ALL_PROFILE
  };
}

export function removeCustomAddress(result) {
  return {
    type: REMOVE_CUSTOM_ADDRESS,
    payload: result
  };
}

export function addCustomAddress(result) {
  return {
    type: ADD_CUSTOM_ADDRESS,
    payload: result
  };
}

export function storeCustomAddresses(result) {
  return {
    type: SET_CUSTOM_ADDRESSES,
    payload: result
  };
}

export function updateMyFamilyPermissions(result) {
  return {
    type: UPDATE_MY_FAMILY_PERMISSIONS,
    payload: result
  };
}

export function addCard(result) {
  return {
    type: ADD_CARD_DATA,
    payload: result
  };
}

export function addCards(result) {
  return {
    type: ADD_CARDS_DATA,
    payload: result
  };
}

export function removeCard(result) {
  return {
    type: REMOVE_CARD,
    payload: result
  };
}

export function setDefaultCard(result) {
  return {
    type: SET_DEFAULT_CARD,
    payload: result
  };
}

export function blockFamilyMember(result) {
  return {
    type: BLOCK_FAMILY_MEMBER,
    payload: result
  };
}

export function removeFamilyInvited(result) {
  return {
    type: REMOVE_FAMILY_INVITE,
    payload: result
  };
}

export function addFamiliesInvited(result) {
  return {
    type: ADD_FAMILIES_INVITED,
    payload: result
  };
}

export function addFamiliesRegistered(result) {
  return {
    type: ADD_FAMILIES_REGISTERED,
    payload: result
  };
}

export function addFamilyInvited(result) {
  return {
    type: ADD_FAMILY_INVITED,
    payload: result
  };
}

export function updateFamilyMember(result) {
  return {
    type: UPDATE_FAMILY_MEMBER,
    payload: result
  };
}

export function updateFamilyMemberInvited(result) {
  return {
    type: UPDATE_FAMILY_MEMBER_INVITED,
    payload: result
  };
}

export function addFamilyMember(result) {
  return {
    type: ADD_FAMILY_MEMBER,
    payload: result
  };
}

export function clearTempInvites() {
  return {
    type: CLEAR_TEMP_INVITES
  };
}

export function addTempInvite(result) {
  return {
    type: ADD_TEMP_INVITE,
    payload: result
  };
}

export function removeTempInvite(result) {
  return {
    type: REMOVE_TEMP_INVITE,
    payload: result
  };
}

export function setServicesAvailable(result) {
  return {
    type: SET_SERVICES_AVAILABLE,
    payload: result
  };
}

export function setProfileOwner(result) {
  return {
    type: SET_PROFILE_OWNER,
    payload: result
  };
}

export function setProfilePatient(result) {
  return {
    type: SET_PROFILE_PATIENT,
    payload: result
  };
}

export function setProfileNeeds(result) {
  return {
    type: SET_PROFILE_NEEDS,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {

    case CLEAR_ALL_PROFILE:
      return initialState;
      break;

    case REMOVE_CUSTOM_ADDRESS:
      {
        const addressesUpdated = state.customAddresses.filter(
          item => item.addressId !== action.payload
        );

        return {
          ...state,
          customAddresses: addressesUpdated
        };
      }
      break;

    case SET_CUSTOM_ADDRESSES:
      return {
        ...state,
        customAddresses: action.payload
      };
      break;

    case UPDATE_MY_FAMILY_PERMISSIONS:
      return {
        ...state,
        familyMyself: {
          admin: action.payload.admin,
          chats: action.payload.chats,
          groupPurchases: action.payload.groupPurchases,
          blocked: action.payload.blocked
        }
      };
      break;

    case ADD_CUSTOM_ADDRESS:
      return {
        ...state,
        customAddresses: [...state.customAddresses, action.payload]
      }
      break;

    case ADD_CARD_DATA:
      return {
        ...state,
        cardData: [...state.cardData, action.payload ]
      }
      break;

    case ADD_CARDS_DATA:
      return {
        ...state,
        cardData: action.payload
      }
      break;

    case REMOVE_CARD:
      {
        const cardsUpdated = state.cardData.filter(
          item => item.cardUuid !== action.payload
        );

        if (cardsUpdated.length === 1) {
          cardsUpdated[0].isDefault = 1;
        }

        return {
          ...state,
          cardData: cardsUpdated
        };
      }
      break;

    case SET_DEFAULT_CARD:
      {
        const cardsUpdated = [...state.cardData];
        let index = 0;
        for (const ch of cardsUpdated) {
          if (ch.cardUuid === action.payload) {
            cardsUpdated[index].isDefault = 1;
          } else {
            cardsUpdated[index].isDefault = 0;
          }
          ++index;
        }

        return {
          ...state,
          cardData: cardsUpdated
        };
      }
      break;

    case BLOCK_FAMILY_MEMBER:
      {
        const familyMembersUpdated = state.familyMembers.filter(
          item => item.userId !== action.payload
        );

        return {
          ...state,
          familyMembers: familyMembersUpdated
        };
      }
      break;

    case REMOVE_FAMILY_INVITE:
      {
        const familyInvitedUpdated = state.familyInvited.filter(
          item => item.inviteId !== action.payload
        );

        return {
          ...state,
          familyInvited: familyInvitedUpdated
        };
      }
      break;

    case ADD_FAMILIES_INVITED:
      {
        const familiesInvites = action.payload.filter(
          item => item.completedRegistration === 0
        );

        return {
          ...state,
          familyInvited: familiesInvites
        };
      }
      break;

    case ADD_FAMILIES_REGISTERED:
      {
        const families = action.payload.filter(
          item => item.completedRegistration === 1
        );

        return {
          ...state,
          familyMembers: families
        };
      }
      break;

    case UPDATE_FAMILY_MEMBER:
      if (action.payload) {
        const familyMembers = state.familyMembers.filter(
          item => item.userId !== action.payload.userId
        );

        return {
          ...state,
          familyMembers: [...familyMembers, action.payload]
        };
      }
      break;

    case UPDATE_FAMILY_MEMBER_INVITED:
      if (action.payload) {
        const familyInvited = state.familyInvited.filter(
          item => item.inviteId !== action.payload.inviteId
        );

        return {
          ...state,
          familyInvited: [...familyInvited, action.payload]
        };
      }
      break;

    case ADD_FAMILY_INVITED:
      {
        return {
          ...state,
          familyInvited: [...state.familyInvited, action.payload]
        };
      }
      break;

    case ADD_FAMILY_MEMBER:
      {
        return {
          ...state,
          familyMembers: [...state.familyMembers, action.payload]
        };
      }
      break;

    case CLEAR_TEMP_INVITES:
      {
        return {
          ...state,
          tempInvites: []
        };
      }
      break;

    case ADD_TEMP_INVITE:
      {
        return {
          ...state,
          tempInvites: [...state.tempInvites, action.payload]
        };
      }
      break;

    case REMOVE_TEMP_INVITE:
      {
        const tempInvitesUpdated = state.tempInvites.filter(
          item => item.personId !== action.payload
        );

        return {
          ...state,
          tempInvites: tempInvitesUpdated
        };
      }
      break;

    case SET_PROFILE_OWNER:
      {
        return {
          ...state,
          owner: {
            ...state.owner,
            street: action.payload.street,
            city: action.payload.city,
            province: action.payload.province,
            postalCode: action.payload.postalCode,
            phoneNumber: action.payload.phoneNumber,
            additionalPhoneNumber: action.payload.additionalPhoneNumber,
            alternateContactName: action.payload.alternateContactName,
            alternateContactNumber: action.payload.alternateContactNumber
          }
        };
      }
      break;

    case SET_PROFILE_PATIENT:
      {
        return {
          ...state,
          patient: {
            ...state.patient,
            patientsPostalCode: action.payload.patientsPostalCode,
            patientsProvince: action.payload.patientsProvince,
            patientsCity: action.payload.patientsCity,
            patientsStreet: action.payload.patientsStreet,
            patientsFirstName: action.payload.patientsFirstName,
            patientsLastName: action.payload.patientsLastName,
            patientsPhoneNumber: action.payload.patientsPhoneNumber,
            patientsAdditionalPhoneNumber:
              action.payload.patientsAdditionalPhoneNumber
          }
        };
      }
      break;

    case SET_PROFILE_NEEDS:
      {
        return {
          ...state,
          needs: {
            ...state.needs,
            patientAge: Number(action.payload.patientAge),
            healthConditions: action.payload.healthConditions,
            needs: action.payload.needs
          }
        };
      }
      break;

    case SET_SERVICES_AVAILABLE:
      {
        return {
          ...state,
          servicesAvailable: action.payload
        };
      }
      break;

    default:
      return state;
  }
  return state;
}
