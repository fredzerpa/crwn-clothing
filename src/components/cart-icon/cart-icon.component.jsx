import { useContext } from 'react';

import ShoppingIcon from '../../assets/shopping-bag.svg?react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, toggleCartOpen, itemsCount } = useContext(CartContext);

  const toggleIsCartOpen = () => toggleCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemsCount}</span>
    </div>
  );
};

export default CartIcon;
