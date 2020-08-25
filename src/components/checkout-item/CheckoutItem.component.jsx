// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { clearItem, addItem, removeItem } from '../../redux/cart/cart.actions';

// CSS
import {CheckoutItemContainer, ImageContainer, TextContainer, QuantityContainer, ArrowContainer, RemoveButtonContainer} from './CheckoutItem.styles.jsx';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='item' />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <ArrowContainer quantity={quantity} onClick={() => removeItem(cartItem)}>&#10094;</ArrowContainer>
        <span>{quantity}</span>
        <ArrowContainer onClick={() => addItem(cartItem)}>&#10095;</ArrowContainer>
      </QuantityContainer>
      <TextContainer>${price}</TextContainer>
      <RemoveButtonContainer>
        <span onClick={() => clearItem(cartItem)}>
          &#10005;
        </span>
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
