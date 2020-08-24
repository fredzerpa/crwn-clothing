import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HJUsPF5mQB1MlwoHTYBH5KyA63zNBZAYhkRiMRwfuzwDykJFsk9FaPdYkLhlO7EqOICO1rHVloQpPBIbuwCZlJ700fAyx0lQO';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Confirm Payment:'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton; 
