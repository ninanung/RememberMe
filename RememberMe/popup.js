onload = function() {
    //각 엘리먼트를 전부 미리 받아오는 부분
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

    //로그인관련 서버의 응답을 받는 부분
    const getLoginData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                const jsondata = JSON.parse(httpreq.response);
                idtext.innerText = jsondata.id;
                passwordtext.innerText = jsondata.password
                chrome.storage.sync.set({ "rememberid": jsondata.id }, function() {
                    console.log("id is " + id);
                });
                chrome.storage.sync.set({ "rememberpassword": jsondata.password }, function() {
                    console.log("password is " + password);
                });
            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    //계정생성관련 서버의 응답을 받는 부분
    const getSigninData = function() {

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
        const httpreq = new XMLHttpRequest();
        const formdata = new FormData();
        formdata.append("id", loginid.value);
        formdata.append("password", loginpassword.value);
        httpreq.onreadystatechange = getLoginData;
        httpreq.open("POST", "http://localhost:3000/api/login/", true);
        httpreq.send(formdata);
    }
    signinsubmit.onclick = function() {
        const httpreq = new XMLHttpRequest();
        const formdata = new FormData();
        if(signinpassword.value !== signinpasswordrepeat.value) {
            signinmessage.innerText = "비밀번호와 확인이 서로 다릅니다. 비밀번호를 확인하세요."
        }
        if(signinemail.value !== signinemailrepeat.value) {
            signinmessage.innerText = "이메일과 확인이 서로 다릅니다. "
        }
        formdata.append("id", signinid.value);
        formdata.append("password", signinpassword.value);
        formdata.append("email", signinemail.value);
        httpreq.onreadystatechange = getLoginData;
        httpreq.open("POST", "http://localhost:3000/api/signin/", true);
        httpreq.send(formdata);
    }
}