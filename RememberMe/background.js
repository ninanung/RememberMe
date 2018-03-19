

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST") {
            console.log(details.requestBody.formData);
            console.log("background");
        }
    }, {urls: ["<all_urls>"]}, ["requestBody"]
);

chrome.tabs.onUpdated.addListener(
    function(tab) {

    }
);