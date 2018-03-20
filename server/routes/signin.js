const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const router = express.Router();
const User = require("../models/user.js");

//이메일 발송 모듈 설정
let transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
        user: "ninanung0503@gmail.com",
        pass: "1004nmnm"
    }
}));

router.post("/", function(req, res, next) {
    console.log("id=" + req.body.id + " / password=" + req.body.password + " / email=" + req.body.email);
    const id = req.body.id;
    const password = req.body.password;
    const email = req.body.email;
    let info = {
        error: "false",
        words: ""
    }
    User.find({ $or: [ { "id": id }, { "email": email } ] }, function(err, user) {
        if(err) {
            info.error = "true";
            info.words = "알수없는 오류발생";
            return res.send(info);
        }
        if(user.length > 0) {
            info.error = "true";
            info.words = "같은 아이디 혹은 이메일이 이미 존재합니다.";
            return res.send(info);
        }
        let newUser = new User({
            id: id,
            password: password,
            email: email,
        });
        newUser.save(function(err) {    
            if(err) {
                info.error = "true";
                info.words = "알수없는 오류발생.";
                console.log(err);
                return res.send(info);
            }
            //이메일 발송부분
            let emailOption = {
                from: "RememberMe <ninanung0503@gmail.com>",
                to: email,
                subject: "Hi, " + id + "! This is RememberMe. Thank you for join us!",
                html:
                    "<h1>Your Login protecter, RememberMe!</h1>" +
                    "<br/><h2>Thank you for sign in.</h2>" +
                    "<br/><h2>Now you can freely use this app in chrome.</h2>"
            }
            transporter.sendMail(emailOption, (error, inf) => {
                if(error) {
                    info.error = "true";
                    info.words = "이메일 발송오류, 주소를 확인하세요.";
                    return res.send(info);
                }
            });
            console.log(info);
            return res.send(info);
        });
    });
});

module.exports = router;