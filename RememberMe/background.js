chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST") {
            console.log(details.requestBody.formData);
            console.log("background");
        }
    }, {urls: ["<all_urls>"]}, ["requestBody"]
);

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

let url = "";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    areyou(tab.url);
}); 

const areyou = function(innerurl) {
    if(innerurl !== url) {
        url = innerurl;
        chrome.storage.sync.set({ "rememberurl": innerurl }, function() {
            console.log("url is " + innerurl);
        });
        chrome.storage.sync.get(["rememberurl"], function(result) {
            console.log("get url is " + result.rememberurl);
        });
    }
}