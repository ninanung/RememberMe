const alpha = [
    "a","b","c","d","e","f","g","h","i","j",'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',"z",
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    '`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',"\\",'|',";",":","\'",'\"',',','<','.','>','/','?',
];
const crypt = [
    '1qm','34e','91s','bnx','j8s','puq','i09','bnz','xm2','4b2','952','xnt','al1','cba','iop','1bv','56m','7r3','s09','234','sa1','2v8','s98','rtx','lkj','h23',
    '!QM','#$E','(!S','BNX','J*S','PUQ','I)(','BNZ','XM@','$B@','(%@','XNT','AL!','CBA','IOP','!BV','%^M','&R#','S)(','@#$','SA!','@V*','S(*','RTX','LKJ','H@#',
    'w2n','br5','09w','1w6','htm','10s','20e','zv7','7m1','ny9',
    "f8w","4dk","efv","40d","1ks","5gm","zc8","00e","2g2","kg2","tx6","jsj","wv3","48u","2t8","678","bhc","pta","gt2","eta","5v6","yt7","1dg","3u7","48e","k0j","seo","fn7","mg4","2sd","3r4","rp7",
];

const cryption = {
    encryption: function(string) {
        let res = string.replace(/ /gi, "").split("").toString().replace(/,/gi, "").split("");
        for(let i = 0; i < res.length; i++) {
            for(let k = 0; k < alpha.length; k++) {
                if(res[i] === alpha[k]) {
                    res.splice(i, 1, crypt[k]);
                    k = alpha.length + 1;
                }
            }
        }
        const str = res.toString().replace(/,/gi, "");
        return str;
    },
    decryption: function(string) {
        let count = 0;
        let res = string.split("");
        for(let i = 0; i < res.length; i++) {
            if(i !== 0 && i%3 === 0) {
                res.splice(i+count, 0, "/");
                count++;
            }
        }
        res = res.toString().replace(/,/gi, "").split("/");
        for(let j = 0; j < res.length; j++) {
            for(let k = 0; k < alpha.length; k++) {
                if(res[j] === crypt[k]) {
                    res.splice(j, 1, alpha[k]);
                    k = alpha.length + 1;
                }
            }
        }
        const str = res.toString().replace(/,/gi, "");
        return str;
    }
}

const check = {
    checkWhiteSpace: function(string) {
        const white = /\s/;
        if(white.test(string)) {
            return true;
        }
        else {
            return false;
        }
    },
    checkBlockSomeSpecioal: function(string) {
        const special = /[,\/]/;
        if(special.test(string)) {
            return true;
        }
        else {
            return false;
        }
    },
    checkKorean: function(string) {
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if(korean.test(string)) {
            return true;
        }
        else {
            return false;
        }
    },
    checkUpperDigit: function(string) {
        const upper = /[A-Z]/;
        if(upper.test(string)) {
            return true;
        }
        else {
            return false;
        }
    },
    checkSpecial: function(string) {
        const special = /[!@#$%^&*()\-_=+\\\/\[\]{};:\'",.<>\/?|`~]/;
        if(special.test(string)) {
            return true;
        }
        else {
            return false;
        }
    }
}

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

    chrome.storage.sync.get(["words", "id", "RememberID", "RememberPassword"], function(result) {
        if(result.id) {
            if(result.words) {
                insertmessage.innerText = result.words + "\nID: " + result.RememberID + ", PW: " + result.RememberPassword;
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
                chrome.storage.sync.set({ "id": cryption.decryption(jsondata.id) }, function() {
                    console.log("id is " + jsondata.id);
                });
                chrome.storage.sync.set({ "email": cryption.decryption(jsondata.email) }, function() {
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
                url: cryption.encryption(result.url),
                id: cryption.encryption(result.id),
                insertid: cryption.encryption(insertid.value),
                insertpassword: cryption.encryption(insertpassword.value)
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
            id: cryption.encryption(loginid.value),
            password: cryption.encryption(loginpassword.value)
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
        else if(signinid.value.length < 4 || signinid.value.length > 10) {
            signinid.value = null;
            return signinmessage.innerText = "아이디가 너무 짧거나 깁니다.";
        }
        else if(check.checkKorean(signinid.value) || check.checkKorean(signinpassword.value) || check.checkKorean(signinemail.value)) {
            return signinmessage.innerText = "아이디와 비밀번호, 이메일에는 한글을 사용하실 수 없습니다.";
        }
        else if(check.checkBlockSomeSpecioal(signinid.value) || check.checkBlockSomeSpecioal(signinpassword.value) || check.checkBlockSomeSpecioal(signinemail.value)) {
            return signinmessage.innerText = "특수문자 ','와 '/'는 계정생성에 사용하실 수 없습니다.";
        }
        else if(check.checkSpecial(signinid.value)) {
            return signinmessage.innerText = "아이디에는 특수문자를 사용하실 수 없습니다.";
        }
        else if(check.checkWhiteSpace(signinid.value) || check.checkWhiteSpace(signinpassword.value) || check.checkWhiteSpace(signinemail.value)) {
            return signinmessage.innerText = "아이디와 비밀번호, 이메일에는 띄어쓰기를 사용하실 수 없습니다.";
        }
        if(signinpassword.value !== signinpasswordrepeat.value) {
            return signinmessage.innerText = "비밀번호와 확인이 서로 다릅니다. 비밀번호를 확인하세요."
        }
        if(signinemail.value !== signinemailrepeat.value) {
            return signinmessage.innerText = "이메일과 확인이 서로 다릅니다. "
        }
        const data = {
            id: cryption.encryption(signinid.value),
            password: cryption.encryption(signinpassword.value),
            email: cryption.encryption(signinemail.value)
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