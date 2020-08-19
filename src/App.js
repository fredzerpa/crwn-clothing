// React
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// CSS
import './App.css';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

// Components
import Header from './components/header/Header.component';
import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/ShopPage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage.component';

// Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
  
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);