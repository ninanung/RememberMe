const alpha = [
"a","b","c","d","e","f","g","h","i","j",'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',"z",
'1','2','3','4','5','6','7','8','9','0',
'`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',"\\",'|',";",":","\'",'\"',',','<','.','>','/','?',
];
const crypt = ['bh2','4hs','91s','bnx','j8s','puq','i09','bnz','xm2','4b2','952','xnt','al1','cba','iop','1bv','56m','7r3','s09','234','sa1','2v8','s98','rtx','lkj','h23','781','cbh','09w','1w6','htm','10s','20e','zv7','7m1','ny9'];

export default {
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
                  res.splice(i+count, 0, ".");
                count++;
            }
        }
        res = res.toString().replace(/,/gi, "").split(".");
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