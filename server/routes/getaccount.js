const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("getting one account");
    const url = req.body.url;
    const id = crypt.decryption(req.body.id);
    let info = {
        error: "false",
        words: "",
        id: "",
        password: ""
    }
    User.findOne({ id: id }, function(err, user) {
        if(err) {
            info.error = "true";
            info.words = "알수없는 오류발생.";
            return res.send(info);
        }
        if(!user) {
            info.error = "true";
            info.words = "계정이 없습니다. 회원가입 후 시도해주세요.";
            return res.send(info);
        }
        for(let i = 0; i < user.urls.length; i++) {
            if(user.urls[i].url == url) {
                info.id = user.urls[i].urlid;
                info.password = user.urls[i].urlpassword;
            }
        }
        if(!info.id) {
            info.error = "true";
            info.words = "해당 페이지에는 저장된 계정이 없습니다."
        }
        return res.send(info);
    })
});

module.exports = router;