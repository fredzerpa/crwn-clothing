import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button/button.component';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selectors';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleCheckoutButton = () => navigate('/checkout');
  
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))
        }
      </div>
      <Button onClick={handleCheckoutButton}>GO TO CHECKOUT</Button>
    </div>
  )
};

export default CartDropdown;
