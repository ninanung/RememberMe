import constant from '../constant.js';

export default {
    [constant.LOGIN]: (state, payload) => {
        chrome.storage.sync.set({ "id": payload.id }, function() {
            console.log("id is " + payload.id);
        });
        chrome.storage.sync.set({ "islogin": payload.islogin }, function() {
            console.log("login is " + payload.islogin);
        });
    },
    [constant.LOGOUT]: (state) => {
        chrome.storage.sync.clear()
    },
    [constant.LOGINPOPUP]: (state) => {
        state.Login = true;
    },
    [constant.SIGNINPOPUP]: (state) => {
        state.Signin = true;
    },
    [constant.LOGINCANCEL]: (state) => {
        state.Login = false;
    },
    [constant.SIGNINCANCEL]: (state) => {
        state.Signin = false;
    }
}