const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const connectHistoryApiFallback = require("connect-history-api-fallback");

const login = require("./routes/login.js");
const signup = require("./routes/signup.js");

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

http.listen(app.get("port"), function() {
    console.log("server start in " + app.get("port"));
})