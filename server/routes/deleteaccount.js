const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("one account deleted");
    let data = {
        error: "false",
        words: ""
    }
    User.findOne({ id: crypt.decryption(req.body.id) }, function(err, user) {
        if(err) {
            data.error = "true";
            data.words = "서버에서 문제가 발생했습니다. 다시 시도해 주세요.";
            return res.send(data);
        }
        if(!user) {
            data.error = "true";
            data.words = "등록된 계정이 없습니다. 로그인 해주세요."
            return res.send(data);
        }
        user.urls.splice(req.body.number, 1);
        user.save(function(err) {
            if(err) {
                data.error = "true";
                data.words = "데이터베이스 오류"
            }
        })
        return res.send(data);
    });
});

module.exports = router;