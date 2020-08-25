// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

// CSS
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  CustomButtonContainer,
  ImageContainer,
  NameContainer,
  PriceContainer
} from './CollectionItem.styles.jsx';

// Components


const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemContainer>
      <ImageContainer imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
