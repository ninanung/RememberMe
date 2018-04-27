const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const cryption = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("someone login");
    const id = req.body.id;
    let string = "abcdefghijklmnopqrstuvwxyz"
    console.log(string);
    string = cryption.encryption(string);
    console.log(string);
    string = cryption.decryption(string);
    console.log(string);
    let info = {
        error: "false",
        words: "",
        id: "",
        email: ""
    }
    User.findOne({ id: id }, function(err, user) {
        if(err) {
            info.error = "true";
            info.words = "알수없는 오류발생.";
            return res.send(info);
        }
        if(!user) {
            info.error = "true";
            info.words = "ID나 패스워드를 확인하세요.";
            return res.send(info);
        }
        if(!user.checkPassword(req.body.password)) {
            info.error = "true";
            info.words = "ID나 패스워드를 확인하세요.";
            return res.send(info);
        }
        info.id = id;
        info.email = user.email;
        return res.send(info);
    })
});

module.exports = router;