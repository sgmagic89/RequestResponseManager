/* 
 * COPYRIGHT (C) 2019 Molex - All Rights Reserved
 */


 var express = require("express");
 var path = require("path"),
  //passport = require('passport'),
  multer = require('multer'),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./Aws/"))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);

    }
  }),
  upload = multer({ storage:storage });
  //basicStrategy = require('passport-http').BasicStrategy;
var bodyParser = require("body-parser");
var app = express();
var uuid4 = require("uuid/v4");
var logger = require("./Logger/logger");
var mqttHandler = require('./mqttHandler');
var azureHandler = require('./azureHandler');
var config = require('./config/system.config');
var configurationControllerClass = require('./controllers/configurationController');
var authenticationService= require('./services/Authentication/authenticationService');

//var app = express.Router();
var expressValidator = require('express-validator');
app.use(expressValidator());

var configurationController = new configurationControllerClass();

// passport.use(new basicStrategy(
//   function(username, password, done){
//     authenticationService.authenticateUser(username, password, function(authResponse){
//           if(authResponse.isSuccess){
//               return done(null, authResponse.response);
//           }else{
//               return done(null, false);
//           }
//       });
//   }
// ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


if(config.awsConnect)
{
  var client = new mqttHandler();
  client.connect();
}

if(config.azureConnect)
{
  var client = new azureHandler();
  client.connect();
}

// Routes
app.put("/send-mqtt", function(req, res) {
  if(config.onCloud)
  {
    let msgId = uuid4();
    req.body.messageID = msgId;
    client.getHttpRequestData(msgId, res);
    client.sendMessage(req.body);
  }
});

app.put("/apiconfig", configurationController.setAPIConfig);

app.get("/apiconfig", configurationController.getAPIConfig);

app.post("/aws/upload",upload.any(),function(req,res,next){
  res.send(true);
});

var server = app.listen(config.port, function () {
  logger.info("app running on port.", server.address().port);
  console.log("app running on port.", server.address().port)
});

