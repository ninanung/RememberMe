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

const httpreq = new XMLHttpRequest();

const getUrlData = function() {
    if (httpreq.readyState === 4) {
        if (httpreq.status === 200) {
            const jsondata = JSON.parse(httpreq.response);
            if(jsondata.error == "true") {
                chrome.storage.sync.set({ "words": jsondata.words }, function() {
                    console.log(jsondata.words);
                });
                return ;
            }
            chrome.storage.sync.set({ "RememberID": jsondata.id }, function() {
                console.log("get id");
            });
            chrome.storage.sync.set({ "RememberPassword": jsondata.password }, function() {
                console.log("get password");
            });
            chrome.storage.sync.set({ "words": "해당 페이지에 계정이 존재합니다." }, function() {
                console.log("해당 페이지에 계정이 존재합니다.");
            });
            location.reload();
        } else {
            chrome.storage.sync.set({ "words": "서버 통신에러 발생." }, function() {
                console.log("서버 통신에러 발생");
            });
        }
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
        chrome.storage.sync.remove(["RememberID", "RememberPassword"], function() {});
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
            url: url,
            id: id
        }
        httpreq.onreadystatechange = getUrlData;
        httpreq.open("POST", "http://localhost:3000/api/getaccount/", true);
        httpreq.onload = function(data) {
            console.log('loaded', this.responseText);
        };
        httpreq.setRequestHeader('Content-Type', 'application/json');
        httpreq.send(JSON.stringify(data));
    }
}