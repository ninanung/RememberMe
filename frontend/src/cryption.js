const alpha = ["a","b","c","d","e","f","g","h","i","j",'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',"z",'1','2','3','4','5','6','7','8','9','0'];
const crypt = ['l','s','y','m','k','d','r','e','j','c','x','q','b','n','t','f','z','u','g','a','o','v','h','i','w','p','2','4','0','5','9','6','8','3','7','1'];

export default {
    encryption: function(string) {
        for(let i = 0; i < 26; i++) {
            string = string.replace(alpha[i], crypt[i]);
        }
        return string;
    },
    decryption: function(string) {
        for(let i = 0; i < 26; i++) {
            string = string.replace(crypt[i], alert[i]);
        }
        return string;
    }
}