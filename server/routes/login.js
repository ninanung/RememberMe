const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./");
    },
    filename: function(req, file, cb) {
        let filename = randomConfirm() + file.originalname;
        cb(null, filename);
    }
});
var upload = multer({ storage: storage }).single("file");

router.post("/", upload, function(req, res, next) {
    console.log(req.body.id);
    console.log(req.body.password);
    const data = {
        id: req.body.id,
        password: req.body.password
    }
    res.send(data);
});

module.exports = router;