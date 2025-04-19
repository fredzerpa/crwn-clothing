import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const hasItem = !!cartItems.find(item => item.id === productToAdd.id);

  if (hasItem) return cartItems.map(item => {
    if (item.id !== productToAdd.id) return item;
    return { ...productToAdd, quantity: item.quantity + 1 }
  })

  return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems, item) => {
  return cartItems.reduce((cart, cartItem) => {
    if (item.id !== cartItem.id) return [...cart, item];

    if (cartItem.quantity === 1) return cart;

    cartItem.quantity -= 1;

    return [...cart, cartItem];
  }, []);
}

const clearCartItem = (cartItems, item) => cartItems.filter(cartItem => cartItem.id !== item.id);


export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  cartTotal: 0,
  itemsCount: 0,
});

const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
  SET_CART: 'SET_CART',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  itemsCount: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }
    case CART_ACTION_TYPES.SET_CART:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartTotal, itemsCount } = state;

  const updateCartReducer = (cartItems) => {
    const cartTotal = cartItems.reduce(
      (total, item) => total + (item.price * item.quantity)
      , 0);

    const itemsCount = cartItems.reduce(
      (count, item) => count + item.quantity
      , 0);

    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART,
      { cartItems, cartTotal, itemsCount }
    ))
  }

  const toggleCartOpen = () => dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN));


  // Actions that modify the cart, by updating the cartItems and returning a new Cart State
  const addItemToCart = item => updateCartReducer(addCartItem(cartItems, item));
  const removeItemFromCart = item => updateCartReducer(removeCartItem(cartItems, item));
  const clearItemFromCart = item => updateCartReducer(clearCartItem(cartItems, item));

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCartOpen,
        addItemToCart,
        removeItemFromCart,
        cartItems,
        itemsCount,
        cartTotal,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}