import { decimalTwoPlaces } from '@utils/Globals';

const TAX_RATE = 0.13;

const initialState = {
  equipmentRent: [],
  equipmentPurchase: [],
  cartItems: [],
  cart: {
    quantity: 0,
    subtotal: 0.00
  }
};

const SET_EQUIPMENT = 'SET_EQUIPMENT';
const ADD_CART_EQUIPMENT = 'ADD_CART_EQUIPMENT';
const INCREMENT_ITEM_EQUIPMENT = 'INCREMENT_ITEM_EQUIPMENT';
const DECREMENT_ITEM_EQUIPMENT = 'DECREMENT_ITEM_EQUIPMENT';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const RECALCULATE_CART = 'RECALCULATE_CART';
const CLEAR_CART = 'CLEAR_CART';
const CHANGE_LENGTH_OF_RENTAL = 'CHANGE_LENGTH_OF_RENTAL';

export function changeLengthOfRental(result) {
  return {
    type: CHANGE_LENGTH_OF_RENTAL,
    payload: result
  };
}

export function addEquipment(result) {
  return {
    type: SET_EQUIPMENT,
    payload: result
  };
}

export function clearEquipmentCart() {
  return {
    type: CLEAR_CART
  };
}

export function recalculateCartEquipment() {
  return {
    type: RECALCULATE_CART
  };
}

export function cartRemoveItem(result) {
  return {
    type: REMOVE_CART_ITEM,
    payload: result
  };
}

export function addToCart(result) {
  return {
    type: ADD_CART_EQUIPMENT,
    payload: result
  };
}

export function cartIncrement(result) {
  return {
    type: INCREMENT_ITEM_EQUIPMENT,
    payload: result
  };
}

export function cartDecrement(result) {
  return {
    type: DECREMENT_ITEM_EQUIPMENT,
    payload: result
  };
}

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_EQUIPMENT:
      if (action.payload) {
        const { equipmentPurchase, equipmentRent } = action.payload;
        return {
          ...state,
          equipmentPurchase,
          equipmentRent
        };
      }
      break;

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        cart: {
          quantity: 0,
          subtotal: 0.00
        }
      };
      break;

    case RECALCULATE_CART: {
        const copy = [ ...state.cartItems ];

        let subtotal = 0.00;
        let quantity = 0;
        copy.forEach(function(element, index) {
          const item = copy[index];
          const sub = parseFloat(subtotal) + parseFloat(item.priceTally);
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

    case ADD_CART_EQUIPMENT:
      if (action.payload) {
        const { itemUuid, type } = action.payload;

        const itemExists = state.cartItems.findIndex(item => item.itemUuid === itemUuid && item.type === type);

        let filteredCartItems = null;
        if (state.cartItems.length !== 0 && itemExists >= 0) {
          filteredCartItems = state.cartItems.filter((item) => {
            if (item.itemUuid === itemUuid) {
              const tally = parseFloat(item.price) + parseFloat(item.priceTally);
              item.priceTally = tally.toFixed(2);
              item.quantity++;
            }
            return item;
          });
        } else {
          filteredCartItems = [...state.cartItems, action.payload];
        }

        return {
          ...state,
          cartItems: filteredCartItems
        };
      }
      break;

    case INCREMENT_ITEM_EQUIPMENT:
      if (action.payload) {
        const { itemUuid, itemType } = action.payload;

        const filteredCartItems = state.cartItems.filter((item) => {
          if (item.itemUuid === itemUuid && item.type === itemType) {
             const tally = parseFloat(item.priceTally) + parseFloat(item.price);
             item.priceTally = tally.toFixed(2);
             item.quantity++;
          }
          return item;
        });

        return {
          ...state,
          cartItems: filteredCartItems
        };
      }
      break;

    case DECREMENT_ITEM_EQUIPMENT:
      if (action.payload) {
        const { itemUuid, itemType } = action.payload;
        
        let filteredCartItems = state.cartItems.filter((item) => {
          if (item.itemUuid === itemUuid && item.type === itemType) {
             const tally = parseFloat(item.priceTally) - parseFloat(item.price);
             item.priceTally = tally.toFixed(2);
             item.quantity--;
          }
          return item;
        });

        return {
          ...state,
          cartItems: filteredCartItems
        };
      }
      break;

    case CHANGE_LENGTH_OF_RENTAL:
      if (action.payload) {
        const { item, selectedChange } = action.payload;

        let filteredCartItems = state.cartItems.filter((data) => {
          if (item.itemUuid === data.itemUuid) {
              item.price = selectedChange.price;
              item.priceTally = selectedChange.price;
              item.duration = selectedChange.duration;
              item.durationDays = selectedChange.durationDays;
          }
          return item;
        });

        return {
          ...state,
          cartItems: filteredCartItems
        };
      }
      break;

    case REMOVE_CART_ITEM:
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
