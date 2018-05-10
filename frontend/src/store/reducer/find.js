import constants from '../constants.js';
import reduxstate from '../state.js';

export const find = (state=reduxstate.find, action) => {
    switch(action.type) {
        case constants.FIND_POPUP:
            let isfind = true;
            return isfind;
        case constants.FIND_CANCEL:
            isfind = false;
            return isfind;
        default:
            return state;
    }
}