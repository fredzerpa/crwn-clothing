// React
import React from 'react';
import { createStructuredSelector } from 'reselect';

// Selector
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

// Redux
import { connect } from 'react-redux';

// Components
import CheckoutItem from '../../components/checkout-item/CheckoutItem.component';

// Stripe
import StripeButton from '../../components/stripe-button/StripeButton.component';

// CSS
import './CheckoutPage.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: ${total}</div>
    <div className='test-warning'>
      *Please use the following test credit card for Payments*
      <br/>
      4242 4242 4242 4242 - Exp: Any future date - CVV: Any 3 digits
    </div>
    <StripeButton price={total} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
