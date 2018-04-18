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
    const insert = document.getElementById("insert");
    const text = document.getElementById("text");
    const insertmessage = document.getElementById("insertmessage");
    const insertsubmit = document.getElementById("insertsubmit");
    const insertpassword = document.getElementById("insertpassword");
    const insertid  = document.getElementById("insertid");
    const insertmodalsubmit = document.getElementById("insertmodalsubmit");
    const insertmodalcancel = document.getElementById("insertmodalcancel");
    const insertmodal = document.getElementById("insertmodal");
    const inserttext = document.getElementById("inserttext");
    const hometext = document.getElementById("hometext");

    const test = document.getElementById("test");

    chrome.storage.sync.get(["words", "id"], function(result) {
        if(result.id) {
            if(result.words) {
                insertmessage.innerText = result.words;
            }
            else {
                insertmessage.innerText = "새로고침을 한번 해주세요."
            }
        }
    });

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
        chrome.storage.sync.remove(["id", "email", "RememberID", "RememberPassword"], function() {});
        return location.reload();
    }

    //계정삽입관련 서버의 응답을 받는 부분
    const getInsertData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                const jsondata = JSON.parse(httpreq.response);
                if(jsondata.error == "true") {
                    chrome.storage.sync.set({ "words": jsondata.words }, function() {
                        console.log(jsondata.words);
                    });
                }
                location.reload();
                insertmessage.innerText = "계정등록이 완료되었습니다."
            } else {
                return insertmessage.innerText = "서버와 통신중 문제가 발생했습니다. 다시 시도해 주세요."
            }
        }
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
                location.reload();
                return hometext.innerText = "회원가입 완료, 로그인 해주세요!";
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

    insertsubmit.onclick = function() {
        if(insertid.value == "" || insertpassword.value == "") {
            return insertmessage.innerText = "계정정보를 모두 입력해 주세요."
        }
        const confirmtext = "이 페이지에 이미 등록된 계정이 있을 경우 정보를 덮어씁니다.\n" + "id: " + insertid.value + ", password: " + insertpassword.value + " 정보가 맞으신가요?"; 
        inserttext.innerText = confirmtext;
        insertmodal.style.display = "inline";
    }

    insertmodalcancel.onclick = function() {
        insertmodal.style.display = "none";
    }

    //계정삽입부분
    insertmodalsubmit.onclick = function() {
        chrome.storage.sync.get(["id", "url"], function(result) {
            const data = {
                url: result.url,
                id: result.id,
                insertid: insertid.value,
                insertpassword: insertpassword.value
            }
            httpreq.onreadystatechange = getInsertData;
            httpreq.open("POST", "http://localhost:3000/api/insert/", true);
            httpreq.onload = function(data) {
                console.log('loaded', this.responseText);
            };
            httpreq.setRequestHeader('Content-Type', 'application/json');
            httpreq.send(JSON.stringify(data));
        });
    }

    //xmlhttprequest를 이용해서 서버와 통신하는 부분. 로그인과 계정생성 정보를 보내고 응답을 받는 부분
    loginsubmit.onclick = function() {
        if(loginid.value == "" || loginpassword.value == "") {
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