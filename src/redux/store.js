import { createStore } from '@reduxjs/toolkit';
import initialState from './initialState';
import rootReducer from './reducer';
import { applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);