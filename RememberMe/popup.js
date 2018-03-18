onload = function() {
    const id = document.getElementById("id");
    const password = document.getElementById("password");
    const text = document.getElementById("text");
    const button = this.document.getElementById("button");
    const httpreq = new XMLHttpRequest();
    const formdata = new FormData();

    const getData = function() {
        if (httpreq.readyState === 4) {
            if (httpreq.status === 200) {
                text.innerText = httpreq.response;
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