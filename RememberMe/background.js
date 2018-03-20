chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST") {
            console.log(details.requestBody.formData);
            console.log("background");
        }
    }, {urls: ["<all_urls>"]}, ["requestBody"]
);

chrome.tabs.onUpdated.addListener(
    function() {
        const urltext = document.getElementById("urltext");
        chrome.tabs.getSelected(null,function(tab) {
            urltext.innerText = tab.url;
            chrome.storage.sync.set({ "rememberurl": tab.url }, function() {
                console.log("url is " + tab.url);
            });
        });
    }
);