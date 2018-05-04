const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    const id = crypt.decryption(req.body.id);
    console.log("getting account list");
    let data = {
        error: "false",
        words: "",
        list: []
    }
    User.findOne({ id: id }, function(err, user) {
        if(err) {
            data.error = "true";
            data.words = "서버에서 문제가 발생했습니다.";
            return res.send(data);
        }
        if(!user) {
            data.error = "true";
            data.words = "등록되지 않은 사용자 입니다.";
            return res.send(data);
        }
        data.list = user.urls;
        res.send(data);
    });
})

module.exports = router;