chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST") {
            console.log(details.requestBody.formData);
        }
    }, {urls: ["<all_urls>"]}, ["requestBody"]
);