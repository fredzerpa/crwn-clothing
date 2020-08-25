// React
import React from 'react';

// CSS
import {
  CollectionPreviewContainer,
  CollectionPreviewTitle,
  PreviewContainer,
} from './CollectionPreview.styles.jsx';

// Components
import CollectionItem from '../collection-item/CollectionItem.component';

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <CollectionPreviewTitle>{title.toUpperCase()}</CollectionPreviewTitle>
    <PreviewContainer>
      {items
        .filter((item, i) => i < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default CollectionPreview;
