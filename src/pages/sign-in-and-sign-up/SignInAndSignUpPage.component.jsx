// React
import React from 'react';

// CSS
import { SignInAndUpContainer } from './SignInAndSignUpPage.styles.jsx';

// Components
import SignIn from '../../components/sign-in/SignIn.component';
import SignUp from '../../components/sign-up/SignUp.component';

const SignInAndSignUpPage = () => (
  <SignInAndUpContainer>
    <SignIn />
    <SignUp />
  </SignInAndUpContainer>
);

export default SignInAndSignUpPage;
