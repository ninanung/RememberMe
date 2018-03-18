const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", function(req, res, next) {
    console.log(req.body.id);
    console.log(req.body.password);
    res.send("good");
});

module.exports = router;