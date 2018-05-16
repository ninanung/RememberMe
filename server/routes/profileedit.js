const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const router = express.Router();
const User = require("../models/user.js");
const crypt = require("./cryption.js");

router.post("/", function(req, res, next) {
    console.log("profile edit");
    const originid = req.body.originid;
    const id = req.body.id;
    const password = req.body.password;
    const email = req.body.email;
    let info = {
        error: "false",
        words: "",
        id: "",
        password: "",
        email: ""
    }
    User.findOne({ "id": originid }, function(err, user) {
        if(err) {
            info.error = "true";
            info.words = "알수없는 오류발생";
            return res.send(info);
        }
        if(!user) {
            info.error = "true";
            info.words = "해당 계정은 존재하지 않습니다. 회원가입 하셨나요?";
            return res.send(info);
        }
        user.id = id;
        user.password = password;
        user.email = email;
        user.save(function(err) {    
            if(err) {
                info.error = "true";
                info.words = "알수없는 오류발생.";
                console.log(err);
            }
        });
        info.id = id;
        info.password = password;
        info.email = email;
        return res.send(info);
    });
});

module.exports = router;