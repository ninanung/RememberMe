const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const connectHistoryApiFallback = require("connect-history-api-fallback");

const login = require("./routes/login.js");
const signup = require("./routes/signup.js");
const insert = require("./routes/insert.js");
const getaccount = require('./routes/getaccount.js');
const getaccountlist = require('./routes/getaccountlist.js');
const deleteaccount = require("./routes/deleteaccount.js");

const app = express();
const http = require("http").Server(app);
mongoose.connect("mongodb://localhost:27017/test");

app.use(connectHistoryApiFallback());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/insert', insert);
app.use('/api/getaccount', getaccount);
app.use('/api/getaccountlist', getaccountlist);
app.use('/api/deleteaccount', deleteaccount);

http.listen(app.get("port"), function() {
    console.log("server start in " + app.get("port"));
})