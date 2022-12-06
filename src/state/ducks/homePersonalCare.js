import { decimalTwoPlaces } from '@utils/Globals';

const TAX_RATE = 0.13;

const initialState = {
  catalog: [],
  cartItems: [],
  cart: {
    quantity: 0,
    subtotal: 0.00
  },
  personalCareDays: []
};

const SET_HOMECARE = 'SET_HOMECARE';
const ADD_CART_PERSONAL_CARE = 'ADD_CART_PERSONAL_CARE';
const REMOVE_CART_ITEM_PERSONAL_CARE = 'REMOVE_CART_ITEM_PERSONAL_CARE';
const RECALCULATE_CART_PERSONAL_CARE = 'RECALCULATE_CART_PERSONAL_CARE';
const CLEAR_CART_PERSONAL_CARE = 'CLEAR_CART_PERSONAL_CARE';
const SET_PERSONAL_CARE_DAYS = 'SET_PERSONAL_CARE_DAYS';

export function setPersonalCareDays(result) {
  return {
    type: SET_PERSONAL_CARE_DAYS,
    payload: result
  };
}

export function addHomeCare(result) {
  return {
    type: SET_HOMECARE,
    payload: result
  };
}

export function clearPersonalCareCart() {
  return {
    type: CLEAR_CART_PERSONAL_CARE
  };
}

export function recalculateCart() {
  return {
    type: RECALCULATE_CART_PERSONAL_CARE
  };
}

export function cartRemoveItem(result) {
  return {
    type: REMOVE_CART_ITEM_PERSONAL_CARE,
    payload: result
  };
}

export function addToCart(result) {
  return {
    type: ADD_CART_PERSONAL_CARE,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERSONAL_CARE_DAYS:
      if (action.payload) {
        return {
          ...state,
          personalCareDays: action.payload
        };
      }
      break;

    case SET_HOMECARE:
      if (action.payload) {
        return {
          ...state,
          catalog: action.payload
        };
      }
      break;

    case CLEAR_CART_PERSONAL_CARE:
      return {
        ...state,
        cartItems: [],
        cart: {
          quantity: 0,
          subtotal: 0.00
        }
      };
      break;

    case RECALCULATE_CART_PERSONAL_CARE: {
        const copy = [ ...state.cartItems ];

        let subtotal = 0.00;
        let quantity = 0;
        copy.forEach(function(element, index) {
          const item = copy[index];
          const sub = parseFloat(subtotal) + parseFloat(item.price);
          quantity = quantity + Number(item.quantity);
          subtotal = sub.toFixed(2);
        });

        return {
          ...state,
          cart: {
            quantity: quantity,
            subtotal: subtotal,
          }
        };
      }
      break;

    case ADD_CART_PERSONAL_CARE:
      if (action.payload) {
        const cartItemsNew = [...state.cartItems, action.payload];

        return {
          ...state,
          cartItems: cartItemsNew
        };
      }
      break;

    case REMOVE_CART_ITEM_PERSONAL_CARE:
      if (action.payload) {
        const filteredCartItems = state.cartItems.filter(item => item.itemUuid !== action.payload);

        return {
          ...state,
          cartItems: filteredCartItems
        };
      }
      break;
    
    default:
      return state;
  }

  return state;
}
