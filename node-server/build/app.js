"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var fileUpload = require("express-fileUpload");
var port = 3000;
var hostname = "127.0.0.1";
// Create a new express application instance
var app = express();
app.use(cors()).use(fileUpload());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.post("/post", function (req, res) {
    var data = req.files.file.data;
    try {
        var decodeData = data.toString('utf8');
        console.log(decodeData);
        res.status(200);
        res.send(decodeData);
    }
    catch (ex) {
        console.log(ex);
        res.status(203);
        res.send("Bad Data");
    }
});
app.listen(port, hostname, function () {
    console.log("Hosting on " + hostname + ":" + port);
});
