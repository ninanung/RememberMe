import axios from 'axios';

const path = "http://localhost:3000";

export default {
    login: function(id, password) {
        return axios.post(path + '/api/login', { id: id, password: password });
    },
    signup: function(id, password, email) {
        return axios.post(path + '/api/signup', { id: id, password: password, email: email });
    },
    insert: function(url, id, insertid, insertpassword) {
        return axios.post(path + "/api/insert", { id: id, url: url, insertid: insertid, insertpassword: insertpassword });
    },
    getaccountlist: function(id) {
        return axios.post(path + "/api/getaccountlist", { id: id });
    },
    deleteaccount: function(number, id) {
        return axios.post(path + "/api/deleteaccount", { number: number, id: id });
    },
    find: function(email) {
        return axios.post(path + "/api/findaccount", { email: email });
    },
    profile: function(originid, id, password, email) {
        return axios.post(path + '/api/profileedit', { originid: originid, id: id, password: password, email: email });
    }
}