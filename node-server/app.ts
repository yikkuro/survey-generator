import express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileUpload");
const port = 3000;
const hostname = "127.0.0.1";

// Create a new express application instance
const app: express.Application = express();
app.use(cors()).use(fileUpload());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/post", function(req:any, res) {
  const data = req.files.file.data as Buffer;
  try{
    const decodeData = data.toString('utf8');
    console.log(decodeData);
    res.status(200);
    res.send(decodeData);
  } catch(ex) {
    console.log(ex);
    res.status(203);
    res.send("Bad Data");
  }
  
});
app.listen(port, hostname, function() {
  console.log("Hosting on " + hostname + ":" + port);
});
