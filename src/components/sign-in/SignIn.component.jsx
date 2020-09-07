// React
import React, { Component } from 'react';

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

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <SignInContainer className='sign-in'>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
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
              Sign in with Google
            </CustomButton>
          </ButtonsBlockContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
