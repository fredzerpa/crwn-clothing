// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';

// Reselect
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

// Components
import WithSpinner from '../../components/with-spinner/WithSpinner.component';
import CollectionPage from './CollectionPage.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;