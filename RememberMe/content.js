var form = document.querySelectorAll("form");
var password = document.querySelectorAll("input[type=password]");
var ID = "";
var Password = "";
var count;
chrome.storage.sync.get(["RememberID", "RememberPassword"], function(result) {
    ID = result.RememberID;
    Password = result.RememberPassword;
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
    else {
        password[0].value = Password;
    }
    document.body.appendChild(btn2);
    form[count].appendChild(btn);
});

var btn2 = document.createElement("button");
btn2.appendChild(document.createTextNode("RememberMe 버튼 숨기기"));
btn2.style.width = "100px";
btn2.style.height = "50px";
btn2.style.position = "fixed";
btn2.style.left = "10px";
btn2.style.bottom = "10px";
btn2.style.fontSize = "10px";
btn2.style.zIndex = "100000";
btn2.style.background = "#F4E425";
btn2.style.color = "#3161BB"
btn2.addEventListener("click", function() {
    var remembermebutton = document.getElementById("remembermebutton");
    if(remembermebutton.style.display == "none") {
        remembermebutton.style.display = "inline";
    }
    else {
        remembermebutton.style.display = "none";
    }
});

var btn = document.createElement("button");
btn.appendChild(document.createTextNode("RememberMe에 저장하고 로그인!"));
btn.style.width = "100px";
btn.style.height = "100px";
btn.style.position = "absolute";
btn.style.right = "10px";
btn.style.top = "10px";
btn.style.zIndex = "100000";
btn.style.display = "inline";
btn.style.background = "#F4E425";
btn.style.color = "#3161BB"
btn.setAttribute("id", "remembermebutton");
btn.addEventListener("click", function() {
    confirm(form[count].querySelector("input[type=text]").value);
    confirm(form[count].querySelector("input[type=password]").value);
    chrome.storage.sync.get(["rememberurl"], function(result) {
        alert("get url is " + result.rememberurl);
    });
})