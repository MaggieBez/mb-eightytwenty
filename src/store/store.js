import { combineReducers } from 'redux';
import { emailReducer, passwordReducer, registerUserReducer, signinUserReducer } from './reducers.js';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({reducer: combineReducers({
    userEmail: emailReducer,
    userPassword: passwordReducer,
    registeredUser: registerUserReducer,
    signedInUser: signinUserReducer
})});

store.subscribe(() => {
    console.log('current state', store.getState());
});