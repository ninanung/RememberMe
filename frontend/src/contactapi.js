import axios from 'axios';

export default {
    login: function(id, password) {
        return axios.post('http://localhost:3000/api/login', { id: id, password: password });
    },
    signup: function(id, password, email) {
        return axios.post('http://localhost:3000/api/signup', { id: id, password: password, email: email });
    },
    insert: function(url, id, insertid, insertpassword) {
        return axios.post("http://localhost:3000/api/insert", { id: id, url: url, insertid: insertid, insertpassword: insertpassword });
    },
    getaccountlist: function(id) {
        return axios.post("http://localhost:3000/api/getaccountlist", { id: id });
    },
    deleteaccount: function(number, id) {
        return axios.post("http://localhost:3000/api/deleteaccount", { number: number, id: id });
    }
}