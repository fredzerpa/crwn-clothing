import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.items
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isOpen
);