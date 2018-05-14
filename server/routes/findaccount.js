const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const crypt = require("./cryption.js");
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
    let email = req.body.email;
    console.log("email sending");
    const data = {
        error: "false",
        words: ""
    }
    User.findOne({ email: email }, function(err, user) {
        if(err) {
            data.error = "true";
            data.words = "알수없는 오류발생";
            return res.send(data);
        }
        if(!user) {
            data.error = "true";
            data.words = "해당 이메을을 사용하는 계정은 존재하지 않습니다.";
            return res.send(data);
        }
        email = crypt.decryption(email);
        const id = crypt.decryption(user.id);
        const password = crypt.decryption(user.password);
        let emailOption = {
            from: "RememberMe <ninanung0503@gmail.com>",
            to: email,
            subject: "안녕하세요, " + id + "님! RememberMe계정확인 메일입니다.",
            html:
                "<h1 style='font-weight: bold; color: #997053; font-size: 40px;'>당신의 계정 지킴이, RememberMe입니다!</h1>" +
                "<br/><h2>계정 정보입니다.</h2>" +
                "<br/><h2>" + "ID : " + id + "</h2>" +
                "<br/><h2>" + "Password : " + password + "</h2>"
        }
        transporter.sendMail(emailOption, (error, inf) => {
            if(error) {
                data.error = "true";
                data.words = "이메일 발송오류, 주소를 확인하세요.";
            }
        });
        data.words = "메일이 발송되었습니다.";
        return res.send(data);
    })
});

module.exports = router;