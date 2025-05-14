import { useDispatch, useSelector } from 'react-redux';

import ShoppingIcon from '../../assets/shopping-bag.svg?react';
import './cart-icon.styles.scss';

import { selectCartItemsCount } from '../../store/cart/cart.selectors';
import { toggleCartOpen } from '../../store/cart/cart.actions';

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemsCount = useSelector(selectCartItemsCount);

  const toggleIsCartOpen = () => dispatch(toggleCartOpen());

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemsCount}</span>
    </div>
  );
};

export default CartIcon;
