//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// const db = require("./models");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// const MONGODB_URI = process.env.MONGODB_URI || ;
mongoose.connect( 
  process.env.MONGODB_URI || "mongodb://localhost/promanager_db", 
{
  useMongoClient: true
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
   

//git remote set-url heroku https://git.heroku.com/pro-manager.git
