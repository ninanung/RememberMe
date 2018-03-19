import constant from '../constant.js';

export default {
    [constant.LOGIN]: (store, payload) => {
        store.commit(constant.LOGIN, payload);
    },
    [constant.LOGOUT]: (store) => {
        store.commit(constant.LOGOUT);
    },
    [constant.LOGINPOPUP]: (store) => {
        store.commit(constant.LOGINPOPUP);
    },
    [constant.SIGNINPOPUP]: (store) => {
        store.commit(constant.SIGNINPOPUP);
    },
    [constant.LOGINCANCEL]: (store) => {
        store.commit(constant.LOGINCANCEL);
    },
    [constant.SIGNINCANCEL]: (store) => {
        store.commit(constant.SIGNINCANCEL);
    }
}