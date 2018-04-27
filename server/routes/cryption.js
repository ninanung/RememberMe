const alpha = ["a","b","c","d","e","f","g","h","i","j",'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',"z",'1','2','3','4','5','6','7','8','9','0'];
const crypt = ['l','s','y','m','k','d','r','e','j','c','x','q','b','n','t','f','z','u','g','a','o','v','h','i','w','p','2','4','0','5','9','6','8','3','7','1'];

module.exports = {
    encryption: function(string) {
        for(let i = 0; i < 36; i++) {
            for(let j = 0; j < string.length; j++) {
                if(string[j] === alpha[i]) {
                    string[j] = crypt[i];
                }
            }
        }
        return string;
    },
    decryption: function(string) {
        for(let i = 0; i < 36; i++) {
            for(let j = 0; j < string.length; j++) {
                if(string[j] === crypt[i]) {
                    string[j] = alpha[i];
                }
            }
        }
        return string;
    }
}

//나눴다가 다시 붙이는 방법
function myFunction() {
    var str = "ninanung";
    var res = str.split("");
    var string = res.toString();
    for(var i = 0; i < string.length; i++) {
		string = string.replace(",", "");
    }
    document.getElementById("demo").innerHTML = string;
}