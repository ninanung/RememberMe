//chrome.webRequest.onBeforeRequest.addListener(
//    function(details) {
//        if(details.method == "POST") {
//            console.log(details.requestBody.formData);
//            console.log("background");
//        }
//    }, {urls: ["<all_urls>"]}, ["requestBody"]
//);

//chrome.tabs.onUpdated.addListener(
//    function() {
//        chrome.tabs.getSelected(null, function(tab) {
//            console.log("2")
//            chrome.storage.sync.set({ "rememberurl": tab.url }, function() {
//                console.log("url is " + tab.url);
//            });
//            console.log("3")
//            chrome.storage.sync.get(["rememberurl"], function(result) {
//                console.log("get url is" + result.rememberurl);
//            });
//            console.log("4")
//        });
//        console.log("5")
//    }
//);
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

const httpreq = new XMLHttpRequest();

const getUrlData = function() {
    if (httpreq.readyState === 4) {
        //if (httpreq.status === 200) {
            const jsondata = JSON.parse(httpreq.response);
            if(jsondata.error == "false") {
                chrome.storage.sync.set({ "RememberID": cryption.decryption(jsondata.id) }, function() {
                    console.log("get id");
                });
                chrome.storage.sync.set({ "RememberPassword": cryption.decryption(jsondata.password) }, function() {
                    console.log("get password");
                });
                chrome.storage.sync.set({ "words": "계정이 존재합니다." }, function() {
                    console.log("해당 페이지에 계정이 존재합니다.");
                });
                location.reload();
            }
            else {
                chrome.storage.sync.remove(["RememberID", "RememberPassword"], function() {});
                chrome.storage.sync.set({ "words": "해당 페이지에 계정이 존재하지 않습니다." }, function() {
                    console.log("해당 페이지에 계정이 존재하지 않습니다.");
                });
                return ;
            }
        //} else {
        //    chrome.storage.sync.set({ "words": "서버 통신에러 발생." }, function() {
        //        console.log("서버 통신에러 발생");
        //    });
        //}
    }
}

function getUrlDomain(string) {
    const str = string;
    const res = str.split("/");
    if(res[0] == "https:" || res[0] == "http:") {
        res.splice(0, 2);
        res.splice(1, 100);
    }
    else {
    	res.splice(1, 100);
    }
    const laststring = res[0].split(".");
    if(laststring.length > 2) {
    	laststring.splice(0, 1);
    }
    return laststring[0];
}

let url = "";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(["id"], function(result) {
        if(result.id) {
            areyou(tab.url, result.id);
        }
    })
}); 

const areyou = function(innerurl, id) {
    if(innerurl !== url) {
        url = getUrlDomain(innerurl);
        chrome.storage.sync.set({ "url": url }, function() {
            console.log("url set");
        });
        const data = {
            url: cryption.encryption(url),
            id: cryption.encryption(id)
        }
        httpreq.onreadystatechange = getUrlData;
        httpreq.open("POST", "https://remembermeweb.herokuapp.com/api/getaccount/", true);
        httpreq.onload = function(data) {
            console.log('loaded', this.responseText);
        };
        httpreq.setRequestHeader('Content-Type', 'application/json');
        httpreq.send(JSON.stringify(data));
    }
}