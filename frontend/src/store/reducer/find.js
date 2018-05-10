import constant from '../constants.js';
import state from '../state.js';

export const find = (state=state.find, action) => {
    switch(action.type) {
        case constant.FIND_POPUP:
            let isFind = true;
            return isFind;
        case constant.FIND_CANCEL:
            let isFind = false;
            return isFind;
        default:
            return state;
    }
}