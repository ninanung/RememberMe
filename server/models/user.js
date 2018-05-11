const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = mongoose.Schema({
    id: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    email: { type: String, required: true },
    urls: [{
        url: { type: String, required: true },
        urlid: { type: String, required: true },
        urlpassword: { type: String, required: true }
    }]
});

user.methods.checkPassword = function(password) {
    const user = this;
    let isPassword = false;
    if(user.password === password) {
        isPassword = true;
    }
    return isPassword;
};

module.exports = mongoose.model("User", user);