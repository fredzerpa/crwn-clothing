// React
import React from 'react';

// Redux
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

// Components
import CollectionItem from '../../components/collection-item/CollectionItem.component';

// CSS
import {
  CollectionPageContainer,
  TitleContainer,
  ItemsContainer,
} from './CollectionPage.styles.jsx';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer className='collection-page'>
      <TitleContainer className='title'>{title}</TitleContainer>
      <ItemsContainer className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
