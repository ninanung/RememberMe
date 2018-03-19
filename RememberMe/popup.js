onload = function() {
    const id = document.getElementById("id");
    const password = document.getElementById("password");
    const idtext = document.getElementById("idtext");
    const passwordtext = document.getElementById("passwordtext");
    const button = this.document.getElementById("button");
    const httpreq = new XMLHttpRequest();
    const formdata = new FormData();

    const getData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                const jsondata = JSON.parse(httpreq.response);
                idtext.innerText = jsondata.id;
                passwordtext.innerText = jsondata.password
                chrome.storage.sync.set({ "id": jsondata.id }, function() {
                    console.log("id is " + id);
                });
                chrome.storage.sync.set({ "password": jsondata.password }, function() {
                    console.log("password is " + password);
                });
            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    button.onclick = function() {
        const axiosid = id.value;
        const axiospassowrd = password.value;
        formdata.append("id", axiosid);
        formdata.append("password", axiospassowrd);
        httpreq.onreadystatechange = getData;
        httpreq.open("POST", "http://localhost:3000/api/login/", true);
        httpreq.send(formdata);
    }
}