import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItem = item => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});

export const fetchUserCartStart = () => ({
  type: CartActionTypes.FETCH_CART_START,
});

export const fetchUserCartSuccess = cartDoc => ({
  type: CartActionTypes.FETCH_CART_SUCCESS,
  payload: cartDoc,
});

export const fetchUserCartFailure = error => ({
  type: CartActionTypes.FETCH_CART_FAILURE,
  payload: error,
});

export const updateUserCartStart = () => ({
  type: CartActionTypes.UPDATE_CART_START,
});

export const updateUserCartSuccess = () => ({
  type: CartActionTypes.UPDATE_CART_SUCCESS,
});

export const updateUserCartFailure = error => ({
  type: CartActionTypes.UPDATE_CART_FAILURE,
  payload: error,
});
