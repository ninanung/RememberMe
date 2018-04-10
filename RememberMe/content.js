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

chrome.storage.sync.get(["RememberID", "RememberPassword"], function(result) {
    ID = "SomeID"//result.RememberID;
    Password = "SomePassword"//result.RememberPassword;
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
saveButton.setAttribute("id", "remembermeMenuButton");
//api로 저장하는 부분을 작성
saveButton.addEventListener("click", function() {
    confirm(form[count].querySelector("input[type=text]").value);
    confirm(form[count].querySelector("input[type=password]").value);
    chrome.storage.sync.get(["rememberurl"], function(result) {
        alert("get url is " + result.rememberurl);
    });
})

idButton.appendChild(document.createTextNode("ID넣기"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", idButton);
idButton.style.bottom = "70px";
idButton.setAttribute("id", "remembermeIdButton");
//id넣는 부분
idButton.addEventListener("click", function() {
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute("onclick", "elementclickid()");
    }
})

passwordButton.appendChild(document.createTextNode("Password넣기"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", passwordButton);
passwordButton.style.bottom = "40px";
passwordButton.setAttribute("id", "remembermePasswordButton");
//password넣는 부분
passwordButton.addEventListener("click", function() {
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute("onclick", "elementclickpassword()");
    }
})

menuButton.appendChild(document.createTextNode("RememberMe메뉴"));
styleToButton("100px", "30px", "fixed", "10px", false, "10px", "#F4E425", "#3161BB", "10000", menuButton);
menuButton.style.bottom = "10px";
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