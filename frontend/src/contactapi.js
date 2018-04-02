import axios from 'axios';

export default {
    login: function(id, password) {
        return axios.post('localhost:3000/api/login', { id: id, password: password });
    },
    signup: function(id, password, email) {
        return axios.post('localhost:3000/api/signin', { id: id, password: password, email: email});
    }
}