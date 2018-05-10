import constants from './constants.js';

export const loginPopup = () => {
    return {
        type: constants.LOGIN_POPUP
    }
}

export const loginCancel = () => {
    return {
        type: constants.LOGIN_CANCEL
    }
}

export const signupPopup = () => {
    return {
        type: constants.SIGNUP_POPUP
    }
}

export const signupCancel = () => {
    return {
        type: constants.SIGNUP_CANCEL
    }
}

export const findPopup = () => {
    return {
        type: constants.FIND_POPUP
    }
}

export const findCancel = () => {
    return {
        type: constants.FIND_CANCEL
    }
}