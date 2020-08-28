// React
import React from 'react';

// CSS
import { SpinnerContainer, SpinnerOverlay } from './WithSpinner.styles';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};


export default WithSpinner;