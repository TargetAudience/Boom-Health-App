const TAX_RATE = 0.13;

const initialState = {
  cartItemsMeals: [],
  allergiesCount: 0,
  dietaryRestrictions: {
    checkedGluten: false,
    checkedDairyCow: false,
    checkedDairySheep: false,
    checkedNuts: false,
    checkedShellfish: false,
    checkedPork: false,
    checkedLowFibre: false
  },
  weeks: [],
  cart: {
    quantityOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    delivery: 0
  }
};

const RECALCULATE_CART_MEALS = 'RECALCULATE_CART_MEALS';
const CLEAR_CART = 'CLEAR_CART';
const SET_DIETARY_RESTRICTIONS = 'SET_DIETARY_RESTRICTIONS';
const ADD_CART_MEALS = 'ADD_CART_MEALS';
const DECREMENT_CART = 'DECREMENT_CART';
const INCREMENT_CART = 'INCREMENT_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';

export function addToCartMeals(result) {
  return {
    type: ADD_CART_MEALS,
    payload: result
  };
}

export function cartIncrement(result) {
  return {
    type: INCREMENT_CART,
    payload: result
  };
}

export function cartDecrement(result) {
  return {
    type: DECREMENT_CART,
    payload: result
  };
}

export function cartRemoveItem(result) {
  return {
    type: REMOVE_ITEM,
    payload: result
  };
}

export function setDietaryRestrictions(result) {
  return {
    type: SET_DIETARY_RESTRICTIONS,
    payload: result
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART
  };
}

export function recalculateCart() {
  return {
    type: RECALCULATE_CART_MEALS
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CART_MEALS:
      if (action.payload) {
        const { cartItem, weeks } = action.payload;
        const { mealItemId, week } = cartItem;

        let myMealsArray = { ...state.cartItemsMeals };

        let filteredCartItems = null;

        if (state.cartItemsMeals[week]) {
          let myMealsWeekArray = myMealsArray[week];
          let update = false;
          let add;

          filteredCartItems = myMealsWeekArray.filter(item => {
            if (item.mealItemId === mealItemId) {
              item.priceTally += item.price;
              item.quantity++;
              update = true;
            }
            return item;
          });

          if (!update) {
            add = [...myMealsWeekArray, cartItem];
          } else {
            add = filteredCartItems;
          }
          myMealsArray[week] = add;
        } else {
          myMealsArray[week] = [cartItem];
        }

        return {
          ...state,
          weeks,
          cartItemsMeals: myMealsArray
        };
      }
      break;

    case INCREMENT_CART:
      if (action.payload) {
        const { mealItemId, week } = action.payload;

        const filteredCartItems = state.cartItemsMeals[week].filter(item => {
          if (item.mealItemId === mealItemId) {
            item.priceTally += item.price;
            item.quantity++;
          }
          return item;
        });

        let myMealsArray = { ...state.cartItemsMeals };
        myMealsArray[week] = filteredCartItems;

        return {
          ...state,
          cartItemsMeals: myMealsArray
        };
      }
      break;

    case DECREMENT_CART:
      if (action.payload) {
        const { mealItemId, week } = action.payload;

        const filteredCartItems = state.cartItemsMeals[week].filter(item => {
          if (item.mealItemId === mealItemId) {
            item.priceTally -= item.price;
            item.quantity--;
          }
          return item;
        });

        let myMealsArray = { ...state.cartItemsMeals };
        myMealsArray[week] = filteredCartItems;

        return {
          ...state,
          cartItemsMeals: myMealsArray
        };
      }
      break;

    case REMOVE_ITEM:
      if (action.payload) {
        const { mealItemId, week } = action.payload;

        const filteredCartItems = state.cartItemsMeals[week].filter(
          item => item.mealItemId !== mealItemId
        );

        let myMealsArray = { ...state.cartItemsMeals };
        myMealsArray[week] = filteredCartItems;

        if (filteredCartItems.length === 0) {
          delete myMealsArray[week];
        }

        return {
          ...state,
          cartItemsMeals: myMealsArray
        };
      }
      break;

    case SET_DIETARY_RESTRICTIONS:
      if (action.payload) {
        return {
          ...state,
          allergiesCount: action.payload.allergiesCount,
          dietaryRestrictions: action.payload.allergiesState
        };
      }
      break;

    case CLEAR_CART:
      return {
        ...state,
        cartItemsMeals: [],
        allergiesCount: 0,
        dietaryRestrictions: {
          checkedGluten: false,
          checkedDairyCow: false,
          checkedDairySheep: false,
          checkedNuts: false,
          checkedShellfish: false,
          checkedPork: false,
          checkedLowFibre: false
        },
        cart: {
          quantityOfItems: 0,
          subtotal: 0,
          delivery: 0,
          tax: 0,
          total: 0
        }
      };
      break;

    case RECALCULATE_CART_MEALS:
      {
        const copy = { ...state.cartItemsMeals };

        let subtotal = 0;
        let quantityOfItems = 0;

        for (var key in copy) {
          const day = copy[key];

          day.forEach((meals, index) => {
            quantityOfItems = quantityOfItems + Number(meals.quantity);
            subtotal = subtotal + Number(meals.priceTally);
          });
        }

        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        return {
          ...state,
          cart: {
            quantityOfItems,
            subtotal,
            tax,
            delivery: 0,
            total
          }
        };
      }
      break;

    default:
      return state;
  }

  return state;
}
