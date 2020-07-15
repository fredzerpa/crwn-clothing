import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherButtonProps }) => (
  <button
    className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''}`}
    {...otherButtonProps}
  >
    {children}
  </button>
);

export default CustomButton;
