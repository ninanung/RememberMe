const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const router = express.Router();
const User = require("../models/user.js");
const crypt = require("./cryption.js");

//이메일 발송 모듈 설정
let transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
        user: "ninanung0503@gmail.com",
        pass: "1004nmnm"
    }
}));

router.post("/", function(req, res, next) {
    console.log("someone signup");
    const id = crypt.decryption(req.body.id);
    const password = req.body.password;
    const email = crypt.decryption(req.body.email);
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
            id: crypt.encryption(id),
            password: password,
            email: crypt.encryption(email),
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
                subject: "안녕하세요, " + id + "님! RememberMe를 이용해 주셔서 감사합니다!",
                html:
                    "<h1 style='font-weight: bold; color: #997053; font-size: 40px;'>당신의 계정 지킴이, RememberMe입니다!</h1>" +
                    "<br/><h2>이용 감사드립니다.</h2>" +
                    "<br/><h2>회원가입이 완료되어 크롬상에서 마음껏 이용하실 수 있습니다.</h2>" +
                    "<br/><h2>참고로 메일은 아이디나 비밀번호 분실시 정보를 전달하는 목적으로 사용됩니다.</h2>"
            }
            transporter.sendMail(emailOption, (error, inf) => {
                if(error) {
                    info.error = "true";
                    info.words = "이메일 발송오류, 주소를 확인하세요.";
                    return res.send(info);
                }
            });
            return res.send(info);
        });
    });
});

module.exports = router;