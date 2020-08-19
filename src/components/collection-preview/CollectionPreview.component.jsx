import React from 'react';
import './CollectionPreview.styles.scss';
import CollectionItem from '../collection-item/CollectionItem.component';

const CollectionPreview = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items
        .filter((item, i) => i < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item}/>
        ))}
    </div>
  </div>
);

export default CollectionPreview;
