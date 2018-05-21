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

let httpreq = new XMLHttpRequest();

var form = document.querySelectorAll("form");
var password = document.querySelectorAll("input[type=password]");
var inputs = document.querySelectorAll("input");

var inputIdScript = document.createElement('script');
var inputPasswordScript = document.createElement('script');
var saveButton = document.createElement("button");
var menuButton = document.createElement("button");
var idButton = document.createElement("button");
var passwordButton = document.createElement("button");

var ID = "";
var Password = "";
var count;

const getInsertData = function() {
    if (httpreq.readyState === 4) {
        //if (httpreq.status === 200) {
            const jsondata = JSON.parse(httpreq.response);
            if(jsondata.error == "true") {
                chrome.storage.sync.set({ "words": jsondata.words }, function() {
                    console.log(jsondata.words);
                });
            }
            location.reload();
            return alert("계정등록이 완료되었습니다.")
        //} else {
        //    return alert("서버와 통신중 문제가 발생했습니다. 다시 시도해 주세요.")
        //}
    }
}

chrome.storage.sync.get(["RememberID", "RememberPassword"], function(result) {
    ID = result.RememberID;
    Password = result.RememberPassword;
    for(var i = 0; i < form.length; i++) {
        if(form[i].querySelector("input[type=password]") !== null) {
            count = i;
        }
    }
    if(result.RememberID) {
        for(var i = 0; i < form.length; i++) {
            if(form[i].querySelector("input[type=password]") !== null) {
                if(form[i].querySelector("input[type=text]") !== null) {
                    form[i].querySelector("input[type=text]").value = ID;
                }
                if(form[i].querySelector("input[type=email]") !== null) {
                    form[i].querySelector("input[type=email]").value = ID;
                }
                count = i;
            }
        }
        if(password.length > 1) {
            for(var i = 0; i < password.length; i++) {
                password[i].value = Password;
            }
        }
        else if(password.length == 1) {
            password[0].value = Password;
        }
        var actualIdCode = "\n" + "function elementclickid() {" + "\n" +
        "document.activeElement.value = '"+ ID + "'" + "\n" +
        "}" + "\n"
        inputIdScript.textContent = actualIdCode;      
        (document.body||document.documentElement).appendChild(inputIdScript);
    
        var actualPasswordCode = "\n" + "function elementclickpassword() {" + "\n" +
        "document.activeElement.value = '"+ Password + "'" + "\n" +
        "}" + "\n"
        inputPasswordScript.textContent = actualPasswordCode;      
        (document.body||document.documentElement).appendChild(inputPasswordScript);
    }
    form[count].appendChild(saveButton);
});

function styleToButton(bwidth, bheight, bposition, bleft, bright, bfontSize, bbackground, bcolor, bzIndex, bbutton) {
    bbutton.style.width = bwidth;
    bbutton.style.height = bheight;
    bbutton.style.position = bposition;
    if(bleft) {
        bbutton.style.left = bleft;
    }
    else {
        bbutton.style.right = bright;
    }
    bbutton.style.fontSize = bfontSize;
    bbutton.style.background = bbackground;
    bbutton.style.color = bcolor;
    bbutton.style.zIndex = bzIndex;
}

saveButton.appendChild(document.createTextNode("RememberMe에 저장하고 로그인!"));
styleToButton("100px", "100px", "absolute", false, "10px", "10px", "#F4E425", "#3161BB", "100000000", saveButton);
saveButton.style.top = "10px";
saveButton.style.display = "none";
saveButton.style.textIndent = "0"
saveButton.setAttribute("id", "remembermeMenuButton");
//api로 저장하는 부분을 작성
saveButton.addEventListener("click", function() {
    const id = form[count].querySelector("input[type=text]").value;
    const password = form[count].querySelector("input[type=password]").value;
    if(confirm("id: " + id + ", password: " + password + "\n정보가 맞으신가요?")) {
        chrome.storage.sync.get(["id", "url"], function(result) {
            if(!result.id) {
                return alert("이 버튼을 사용하시려면 로그인 해주세요.");
            }
            const data = {
                url: cryption.encryption(result.url),
                id: cryption.encryption(result.id),
                insertid: cryption.encryption(id),
                insertpassword: cryption.encryption(password)
            }
            httpreq.onreadystatechange = getInsertData;
            httpreq.open("POST", "https://remembermeweb.herokuapp.com/api/insert/", true);
            httpreq.onload = function(data) {
                console.log('loaded', this.responseText);
            };
            httpreq.setRequestHeader('Content-Type', 'application/json');
            httpreq.send(JSON.stringify(data));
        });
    }
})

idButton.appendChild(document.createTextNode("ID넣기"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", idButton);
idButton.style.bottom = "70px";
idButton.style.display = "none";
idButton.style.textIndent = "0"
idButton.setAttribute("id", "remembermeIdButton");
//id넣는 부분
idButton.addEventListener("click", function() {
    var input = document.querySelectorAll("input");
    for(var i = 0; i < input.length; i++) {
        input[i].setAttribute("onclick", "elementclickid()");
    }
})

passwordButton.appendChild(document.createTextNode("Password넣기"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", passwordButton);
passwordButton.style.bottom = "40px";
passwordButton.style.display = "none";
passwordButton.style.textIndent = "0"
passwordButton.setAttribute("id", "remembermePasswordButton");
//password넣는 부분
passwordButton.addEventListener("click", function() {
    var input = document.querySelectorAll("input");
    for(var i = 0; i < input.length; i++) {
        input[i].setAttribute("onclick", "elementclickpassword()");
    }
})

menuButton.appendChild(document.createTextNode("RememberMe메뉴"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", menuButton);
menuButton.style.bottom = "10px";
menuButton.style.textIndent = "0"
//메뉴를 열고닫는 부분
menuButton.addEventListener("click", function() {
    var remembermebutton = document.getElementById("remembermeMenuButton");
    var remembermeidbutton = document.getElementById("remembermeIdButton");
    var remembermepasswordbutton = document.getElementById("remembermePasswordButton");

    if(remembermeidbutton.style.display == "none") {
        if(remembermebutton) {
            remembermebutton.style.display = "block";
        }
        remembermeidbutton.style.display = "block";
        remembermepasswordbutton.style.display = "block";
    }
    else {
        if(remembermebutton) {
            remembermebutton.style.display = "none";
        }
        remembermeidbutton.style.display = "none";
        remembermepasswordbutton.style.display = "none";
    }
});

chrome.storage.sync.get(["id", "email"], function(result) {
    if(!result.id || !result.email) {
        return ;
    }
    else {
        document.body.appendChild(menuButton);
        document.body.appendChild(idButton);
        document.body.appendChild(passwordButton);
    }
});