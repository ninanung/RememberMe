import constants from '../constants.js';
import reduxstate from '../state.js';

export const signup = (state=reduxstate.signup, action) => {
    switch(action.type) {
        case constants.SIGNUP_POPUP: 
            let issignup = true;
            return issignup;
        case constants.SIGNUP_CANCEL:
            issignup = false;
            return issignup;
        default:
            return state;
    }
}