//Dependencies
// =============================================================
const request = require('request');
const db = require("../models");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");

//Exporting module app
module.exports = function(app){
  
// Route for getting all Articles from the db
  app.get("/signin", (req, res) => {
    // console.log(`Api-Routes SignIn`);
    console.log(req.query.name, req.query.password);
    const email = req.query.email;
    const password = req.query.password;

    db.User
      .find({email: email})
      .then(function(dbUser) {
        // console.log(`Response from dbUser SignIn`);
        // console.log(dbUser);
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
//tarciso@hotmail.com
// Route for post new user to the db
  app.post("/signup", (req, res) => {
    // console.log(`Api-Routes SignUp`);
    // console.log(req)
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const title = req.body.title;
    
    db.User
      .create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone,
        title: title
      })
      .then((dbUser) => {
        // console.log(`Response from dbUser SignUp`);
        // console.log(dbUser);
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/manager", function(req, res) {
    // Grab every document in the Articles collection
    db.Property
      .find({})
      .then(function(dbProperty) {
        // If we were able to successfully find Articles, send them back to the client
        res.render("manager", {property: dbProperty});
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/addproperty", (req, res) => {
    // console.log(`Api-Routes AddProperty`);
    console.log(req)
    const _id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    
    db.Property
      .create({
        _id,
        name,
        address,
        city,
        state,
        zipcode
      })
      .then((dbProperty) => {
        console.log(`Response from dbProperty AddProperty`);
        console.log(dbProperty);
        // res.redirect("/manager");
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

};
//   name: 'Salao IstuArte',
//   address: 'Rua Miguel Angelo 14',
//   city: 'Ipatinga',
//   state: 'MG',
//   zipcode: 35162348 