// React
import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';

// CSS
import {
  SignInContainer,
  SignInTitle,
  ButtonsBlockContainer,
} from './SignIn.styles.jsx';

// Components
import FormInput from '../form-input/FormInput.component';
import CustomButton from '../custom-button/CustomButton.component';

// Redux-Sagas
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions.js';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    await emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer className='sign-in'>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <ButtonsBlockContainer>
          <CustomButton type='submit'>SIGN IN</CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            GOOGLE SIGN IN
          </CustomButton>
        </ButtonsBlockContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
