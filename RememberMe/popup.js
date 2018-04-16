//화면이 열리면 실행되는 함수입니다.
window.onload = function() {
    //각 엘리먼트를 전부 미리 받아오는 부분
    let httpreq = new XMLHttpRequest();

    const loginpage = document.getElementById("loginPage");
    const signinpage = document.getElementById("signinPage");
    const logincancel = document.getElementById("logincancel");
    const signincancel = document.getElementById("signincancel");
    const loginsubmit = document.getElementById("loginsubmit");
    const signinsubmit = document.getElementById("signinsubmit");
    const loginid = document.getElementById("loginid");
    const loginpassword = document.getElementById("loginpassword");
    const signinid = document.getElementById("signinid");
    const signinpassword = document.getElementById("signinpassword");
    const signinpasswordrepeat = document.getElementById("signinpasswordrepeat");
    const signinemail = document.getElementById("signinemail");
    const signinemailrepeat = document.getElementById("signinemailrepeat");
    const loginmessage = document.getElementById("loginmessage");
    const signinmessage = document.getElementById("signinmessage");
    const loginbutton = document.getElementById("loginbutton");
    const logoutbutton = document.getElementById("logoutbutton");
    const insert = this.document.getElementById("insert");
    const text = this.document.getElementById("text");

    const test = document.getElementById("test");

    chrome.storage.sync.get(["id", "email"], function(result) {
        if(result.id || result.email) {
            test.innerText = "id: " + result.id + ", email: " + result.email; 
            hi.innerText = result.id + "님, 안녕하세요!";
            loginbutton.style.display = "none";
            logoutbutton.style.display = "inline";
            insert.style.display = "inline";
            text.style.display = "none"
        }
        else {
            logoutbutton.style.display = "none";
            loginbutton.style.display = "inline";
            insert.style.display = "none";
            text.style.display = "inline"
        }
    });

    //로그아웃 관련 버튼설정
    logoutbutton.onclick = function() {
        chrome.storage.sync.remove(["id", "email"], function() {});
        return location.reload();
    }

    //로그인관련 서버의 응답을 받는 부분
    const getLoginData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                const jsondata = JSON.parse(httpreq.response);
                if(jsondata.error == "true") {
                    return loginmessage.innerText = jsondata.words;
                }
                chrome.storage.sync.set({ "id": jsondata.id }, function() {
                    console.log("id is " + jsondata.id);
                });
                chrome.storage.sync.set({ "email": jsondata.email }, function() {
                    console.log("email is " + jsondata.email);
                });
                location.reload();
            } else {
                return loginmessage.innerText = "서버와 통신중 문제가 발생했습니다. 다시 시도해 주세요."
            }
        }
    }

    //계정생성관련 서버의 응답을 받는 부분
    const getSigninData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                const jsondata = JSON.parse(httpreq.response);
                if(jsondata.error == "true") {
                    return signinmessage.innerText = jsondata.words;
                }
                test.innerText = "회원가입 완료, 로그인 해주세요!";
                location.reload();
            } else {
                return signinmessage.innerText = "서버와 통신중 문제가 발생했습니다. 다시 시도해 주세요."
            }
        }        
    }

    //로그인과 계정생성페이지를 보여주고 감추는 기능
    logincancel.onclick = function() {
        document.getElementById("login").style.display = "none";
    }

    signincancel.onclick = function() {
        document.getElementById("signin").style.display = "none";
    }

    loginpage.onclick = function() {
        document.getElementById("login").style.display = "inline";
    }

    signinpage.onclick = function() {
        document.getElementById("signin").style.display = "inline";
    }

    //xmlhttprequest를 이용해서 서버와 통신하는 부분. 로그인과 계정생성 정보를 보내고 응답을 받는 부분
    loginsubmit.onclick = function() {
        if(loginid.valus == "" || loginpassword.value == "") {
            return loginmessage.innerText = "정보를 모두 입력해 주세요.";
        }
        const data = {
            id: loginid.value,
            password: loginpassword.value
        }
        httpreq.onreadystatechange = getLoginData;
        httpreq.open("POST", "http://localhost:3000/api/login/", true);
        httpreq.onload = function(data) {
            console.log('loaded', this.responseText);
        };
        httpreq.setRequestHeader('Content-Type', 'application/json');
        httpreq.send(JSON.stringify(data));
    }

    signinsubmit.onclick = function() {
        if(!signinid.value || !signinpassword.value || !signinpasswordrepeat.value || !signinemail.value || !signinemailrepeat.value) {
            return signinmessage.innerText = "정보를 모두 입력해 주세요.";
        }
        if(signinpassword.value !== signinpasswordrepeat.value) {
            return signinmessage.innerText = "비밀번호와 확인이 서로 다릅니다. 비밀번호를 확인하세요."
        }
        if(signinemail.value !== signinemailrepeat.value) {
            return signinmessage.innerText = "이메일과 확인이 서로 다릅니다. "
        }
        const data = {
            id: signinid.value,
            password: signinpassword.value,
            email: signinemail.value
        }
        httpreq.onreadystatechange = getSigninData;
        httpreq.open("POST", "http://localhost:3000/api/signup/", true);
        httpreq.onload = function(data) {
            console.log('loaded', this.responseText);
        };
        httpreq.setRequestHeader('Content-Type', 'application/json');
        httpreq.send(JSON.stringify(data));
    }
}