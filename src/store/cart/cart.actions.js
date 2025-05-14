import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.types";

export const toggleCartOpen = () => createAction(
  CART_ACTION_TYPES.TOGGLE_CART_OPEN
)

export const addItemToCart = (cartItems, productToAdd) => {
  let newCartItems = [...cartItems];

  const hasItem = !!newCartItems.find(item => item.id === productToAdd.id);

  if (hasItem) {
    newCartItems = newCartItems.map(item => {
      if (item.id !== productToAdd.id) return item;
      return { ...productToAdd, quantity: item.quantity + 1 }
    })
  } else {
    newCartItems.push({ ...productToAdd, quantity: 1 });
  }

  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
  )
}

export const removeItemFromCart = (cartItems, item) => {
  console.log('cartItems', cartItems);
  const newCartItems = cartItems.reduce((cart, cartItem) => {
    if (item.id !== cartItem.id) return [...cart, cartItem];
    
    if (cartItem.quantity === 1) return cart;
    
    cartItem.quantity -= 1;
    
    return [...cart, cartItem];
  }, []);

  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
  )
}

export const clearCartItem = (cartItems, item) => {
  console.log('cartItems', cartItems);
  const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);

  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems
  )
}