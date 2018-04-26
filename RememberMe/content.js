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
        if (httpreq.status === 200) {
            const jsondata = JSON.parse(httpreq.response);
            if(jsondata.error == "true") {
                chrome.storage.sync.set({ "words": jsondata.words }, function() {
                    console.log(jsondata.words);
                });
            }
            location.reload();
            alert("계정등록이 완료되었습니다.")
        } else {
            return alert("서버와 통신중 문제가 발생했습니다. 다시 시도해 주세요.")
        }
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
            const data = {
                url: result.url,
                id: result.id,
                insertid: id,
                insertpassword: password
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

document.body.appendChild(menuButton);
document.body.appendChild(idButton);
document.body.appendChild(passwordButton);