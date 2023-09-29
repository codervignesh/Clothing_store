// actions.js

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const FETCH_TSHIRTS = 'FETCH_TSHIRTS';

// Action Creators
export const addToCart = (itemId) => {
  return {
    type: ADD_TO_CART,
    payload: itemId,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: itemId,
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: itemId,
  };
};

export const fetchTshirts = (tshirts) => {
  return {
    type: FETCH_TSHIRTS,
    payload: tshirts,
  };
};
