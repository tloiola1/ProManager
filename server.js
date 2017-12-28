//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
//Set handlebars
var expHbs = require('express-handlebars');
app.engine('handlebars', expHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

// var MONGODB_URI = process.env.MONGODB_URI || ;
mongoose.Promise = Promise;
mongoose.connect( "mongodb://localhost/promanager_db", {//MONGODB_URI
  useMongoClient: true
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
   