import constants from '../constants.js';
import reduxstate from '../state.js';

export const login = (state=reduxstate.login, action) => {
    switch(action.type) {
        case constants.LOGIN_POPUP:
            let islogin = true
            return islogin;
        case constants.LOGIN_CANCEL:
            islogin = false;
            return islogin;
        default:
            return state;
    }
}