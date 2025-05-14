import CART_ACTION_TYPES from "./cart.types";

const INITIAL_STATE = {
  isOpen: false,
  items: [],
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        items: payload,
      }
    default:
      return state;
  }
}
