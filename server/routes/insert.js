const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", function(req, res, next) {
    console.log("url=" + req.body.url + " / id=" + req.body.id + " / password=" + req.body.password);
    const id = req.body.id;
    const password = req.body.password;
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
        if(!user.checkPassword(password)) {
            info.error = "true";
            info.words = "ID나 패스워드를 확인하세요.";
            return res.send(info);
        }
        info.id = id;
        info.email = user.email;
        console.log(info);
        return res.send(info);
    })
});

module.exports = router;