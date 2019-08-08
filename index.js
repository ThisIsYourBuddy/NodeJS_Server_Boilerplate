var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var config = require('./config');
  

// Configuring Middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public/'));
app.use(cors());

// Models required for web.
var model = require('./web/models')(config, MongoClient, ObjectId);
// Routes for web.
require('./web/routes')(app, model);

app.listen(config.webserver.port, function(){
    console.log("Server started at port: "+config.webserver.port);
})