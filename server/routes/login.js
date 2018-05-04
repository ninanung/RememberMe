const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("someone login");
    const id = crypt.decryption(req.body.id);
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
        info.id = crypt.encryption(id);
        info.email = user.email;
        return res.send(info);
    })
});

module.exports = router;