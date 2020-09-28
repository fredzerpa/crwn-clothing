import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import {
  clearCart,
  fetchUserCartStart,
  fetchUserCartFailure,
  fetchUserCartSuccess,
  updateUserCartFailure,
  updateUserCartStart,
  updateUserCartSuccess,
} from './cart.actions';
import UserActionTypes from '../user/user.types';
import { getUserCartRef } from '../../firebase/firebase.utils';
import CartActionTypes from './cart.types';
import { selectCurrentUser } from '../user/user.selectors';
import { selectCartItems } from './cart.selectors';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* fetchUserCartAfterSignedIn({ payload: user }) {
  yield put(fetchUserCartStart());
  try {
    const userCartRef = yield call(getUserCartRef, user.id);
    const userCartSnapshot = yield userCartRef.get();
    yield put(fetchUserCartSuccess({ ...userCartSnapshot.data() }));
  } catch (error) {
    yield put(fetchUserCartFailure(error));
  }
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchUserCartAfterSignedIn);
}

export function* updateCartOnFirebase() {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    yield put(updateUserCartStart());
    try {
      const cartRef = yield call(getUserCartRef, currentUser.id);
      const currentCartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems: currentCartItems, updatedAt: new Date() });
      yield put(updateUserCartSuccess());
    } catch (error) {
      yield put(updateUserCartFailure(error));
    }
  }
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM,
      CartActionTypes.CLEAR_CART,
    ],
    updateCartOnFirebase
  );
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onSignInSuccess), call(onCartChange)]);
}
