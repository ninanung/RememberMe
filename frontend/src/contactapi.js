import axios from 'axios';

export default {
    login: function(id, password) {
        return axios.post('http://localhost:3000/api/login', { id: id, password: password });
    },
    signup: function(id, password, email) {
        return axios.post('http://localhost:3000/api/signup', { id: id, password: password, email: email});
    }
}