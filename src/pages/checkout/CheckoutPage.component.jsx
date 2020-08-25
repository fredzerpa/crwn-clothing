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

// Stripe
import StripeButton from '../../components/stripe-button/StripeButton.component';

// Components
import CheckoutItem from '../../components/checkout-item/CheckoutItem.component';

// CSS
import {
  CheckOutPageContainer,
  CheckOutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  TestWarningContainer,
} from './CheckoutPage.styles.jsx';

const HEADER_BLOCKS_TITLES = [
  'Product',
  'Description',
  'Quantity',
  'Price',
  'Remove',
];

const CheckoutPage = ({ cartItems, total }) => (
  <CheckOutPageContainer>
    <CheckOutHeaderContainer>
      {HEADER_BLOCKS_TITLES.map(title => (
        <HeaderBlockContainer>
          <span>{title}</span>
        </HeaderBlockContainer>
      ))}
    </CheckOutHeaderContainer>

    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <TotalContainer>TOTAL: ${total}</TotalContainer>

    <TestWarningContainer>
      *Please use the following test credit card for Payments*
      <br />
      4242 4242 4242 4242 - Exp: Any future date - CVV: Any 3 digits
    </TestWarningContainer>

    <StripeButton price={total} />
  </CheckOutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
