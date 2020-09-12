import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HJUsPF5mQB1MlwoHTYBH5KyA63zNBZAYhkRiMRwfuzwDykJFsk9FaPdYkLhlO7EqOICO1rHVloQpPBIbuwCZlJ700fAyx0lQO';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(resp => {
        console.log('This is the Response: ', resp);
        alert('Payment Successful!');
      })
      .catch(err => {
        console.log('Payment Error: ', JSON.parse(err));
        alert(
          'Error making the payment. \nPlease make sure you use the provided credit card.'
        );
      });
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
