import { createContext, useMemo, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = item => setCartItems(addCartItem(cartItems, item));
  const removeItemFromCart = item => setCartItems(removeCartItem(cartItems, item));
  const clearItemFromCart = item => setCartItems(clearCartItem(cartItems, item));

  const itemsCount = useMemo(() => cartItems.reduce(
    (count, item) => count + item.quantity
    , 0), [cartItems]);

  const cartTotal = useMemo(() => cartItems.reduce(
    (total, item) => total + (item.price * item.quantity)
    , 0), [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
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