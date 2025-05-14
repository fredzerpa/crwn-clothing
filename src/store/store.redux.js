import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer.redux';

const middleWares = [logger];

export const store = createStore(rootReducer, undefined, compose(applyMiddleware(...middleWares)));
