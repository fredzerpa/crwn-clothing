import React from 'react';

import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer,
} from './CartItem.styles.jsx';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer className='cart-item'>
    <ImageContainer src={imageUrl} alt='item' />
    <ItemDetailsContainer className='item-details'>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default React.memo(CartItem);
