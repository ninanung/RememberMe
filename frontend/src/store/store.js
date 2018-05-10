import state from './state.js';
import { login } from './reducer/login.js';
import { signup } from './reducer/signup.js';
import { find } from './reducer/find.js';
import { createStore, combineReducers } from 'redux';

const store = createStore(
    combineReducers({ login, signup, find }),
    state
)

export default store;