const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("account added");
    const url = req.body.url;
    const id = req.body.id;
    const insertid = req.body.insertid;
    const insertpassword = req.body.insertpassword;
    let info = {
        error: "false",
        words: "",
    }
    let isThere = false;
    User.findOne({ id: crypt.decryption(id) }, function(err, user) {
        if(err) {
            info.error = "true";
            info.words = "알수없는 오류발생.";
            return res.send(info);
        }
        if(!user) {
            info.error = "true";
            info.words = "회원가입 하셨나요? 회원가입 해주세요.";
            return res.send(info);
        }
        for(let i = 0; i < user.urls.length; i ++) {
            if(user.urls[i].url == url) {
                isThere = true;
                user.urls[i].urlid = insertid;
                user.urls[i].urlpassword = insertpassword;
            }
        }
        if(!isThere) {
            user.urls.push({
                url: url,
                urlid: insertid,
                urlpassword: insertpassword
            })
        }
        user.save(function(err){
            if(err) {
                info.error = "true";
                info.words = "데이터베이스 오류가 발생했습니다. 다시 시도해 주세요";
            }
        })
        return res.send(info);
    })
});

module.exports = router;