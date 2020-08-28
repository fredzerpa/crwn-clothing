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

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <CollectionPreviewTitle
      onClick={() => history.push(`${match.path}/${routeName}`)}
    >
      {title.toUpperCase()}
    </CollectionPreviewTitle>
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
