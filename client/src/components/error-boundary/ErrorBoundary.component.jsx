import React, {Component} from 'react';
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageTitle, ErrorImageText} from './ErrorBoundary.styles';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  render() {
    return this.state.hasError ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl={`https://i.imgur.com/qIufhof.png`}/>
        <ErrorImageTitle>Caution! This Page is Cordoned Off</ErrorImageTitle>
        <ErrorImageText>The earthquake was not good to the bike lane on your way to work. A large gap in the pavement (too big to be called a pothole) had swallowed three oblivious bikers whole. So the city had put up two pylons and yellow caution tape. Pretty frustrating for you given your propensity to do 360 jumps over the gap.</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
