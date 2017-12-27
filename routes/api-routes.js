//Dependencies
// =============================================================
var request = require('request');
var db = require("../models");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");

//Exporting module app
module.exports = function(app){
  
// Route for getting all Articles from the db
app.get("/manager", function(req, res) {
  // Grab every document in the Articles collection
  db.Property
    .find({})
    .then(function(dbProperty) {
      // If we were able to successfully find Articles, send them back to the client
      return dbProperty;
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for post new user to the db
app.post("/signup", function(req, res) {
  //
  console.log(req);
//   db.User
//     .create({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.render("saved",{article: dbArticle});
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
});

// Route for saving Articles into the db
app.post("/save/:id", function(req, res) {
  var _id = req.params.id;
  // Grab every document in the Articles collection
  console.log(_id);
  db.Article
    .find({ _id })
    .then(function(data){
      db.Saved
       .create(data)
       .then(function(_data){
         console.log(_data);
         res.json(_data);
    }).then(function(){
      db.Article
        .delete({ _id })
        .then(function(result){
          console.log(result);

        }).catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });
  });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article
    .findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note
    .create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
};