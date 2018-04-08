var form = document.querySelectorAll("form");
var password = document.querySelector("input[type=password]");
for(var i = 0; i < form.length; i++) {
	if(form[i].querySelector("input[type=password]") !== null) {
        if(form[i].querySelector("input[type=text]") !== null) {
            form[i].querySelector("input[type=text]").value = "ID!";
        }
        if(form[i].querySelector("input[type=email]") !== null) {
            form[i].querySelector("input[type=email]").value = "Email!";
        }
    }
}
password.value = "Password!";