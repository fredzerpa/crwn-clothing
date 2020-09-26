// React
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// CSS
import { GlobalStyle } from './global.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

// Redux-Saga
import { checkUserSession } from './redux/user/user.actions';

// Components
import Header from './components/header/Header.component';
import Spinner from './components/spinner/Spinner.component';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.component';

// Components Lazy Loaded
const HomePage = lazy(() => import('./pages/homepage/HomePage.component'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/SignInAndSignUpPage.component')
);
const CheckoutPage = lazy(() =>
  import('./pages/checkout/CheckoutPage.component')
);

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
