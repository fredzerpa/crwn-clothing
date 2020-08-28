// React
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

// Components
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview.components';
import CollectionPage from '../collection/CollectionPage.component';
import WithSpinner from '../../components/with-spinner/WithSpinner.component';

// Firestore
import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    isLoading: true,
  };

  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionsPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collections => dispatch(updateCollections(collections)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
