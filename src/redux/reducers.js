// reducers.js

import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, FETCH_TSHIRTS } from './actions';

const initialState = {
  tshirts: [], // Array to store tshirt data
  cart: {}, // Object to store cart items with item IDs as keys and quantities as values
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TSHIRTS:
      return {
        ...state,
        tshirts: action.payload,
      };

    case ADD_TO_CART:
      const itemIdToAdd = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          [itemIdToAdd]: (state.cart[itemIdToAdd] || 0) + 1, // Increment quantity or set to 1 if not in cart
        },
      };

    case REMOVE_FROM_CART:
      const itemIdToRemove = action.payload;
      const updatedCart = { ...state.cart };
      delete updatedCart[itemIdToRemove]; // Remove the item from the cart
      return {
        ...state,
        cart: updatedCart,
      };

    case INCREASE_QUANTITY:
      const itemIdToIncrease = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          [itemIdToIncrease]: (state.cart[itemIdToIncrease] || 0) + 1, // Increment quantity or set to 1 if not in cart
        },
      };

    case DECREASE_QUANTITY:
      const itemIdToDecrease = action.payload;
      const updatedCartDecrease = { ...state.cart };
      if (updatedCartDecrease[itemIdToDecrease] > 0) {
        updatedCartDecrease[itemIdToDecrease] -= 1; // Decrease quantity
      }
      return {
        ...state,
        cart: updatedCartDecrease,
      };

    default:
      return state;
  }
};

export default rootReducer;
