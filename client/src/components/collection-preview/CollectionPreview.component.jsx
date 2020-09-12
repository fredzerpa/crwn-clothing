// React
import React from 'react';
import { withRouter } from 'react-router-dom';

// CSS
import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer,
  HeaderContainer,
} from './CollectionPreview.styles.jsx';

// Components
import CollectionItem from '../collection-item/CollectionItem.component';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <HeaderContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
    </HeaderContainer>
    <PreviewContainer>
      {items
        .filter((item, i) => i < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
