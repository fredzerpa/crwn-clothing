export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.Id === cartItemToAdd.Id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.Id === cartItemToAdd.Id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
