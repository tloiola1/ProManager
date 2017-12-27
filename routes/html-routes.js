// Dependencies
// =============================================================
// var path = require("path");
// Routes
// =============================================================
module.exports = (app) => {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  app.get("/", (req, res) => {
    res.render('home');
  });
  app.get("/manager", (req, res) => {
    res.render('manager');
  });
  app.get("/renters", (req, res) => {
    res.render('renters');
  });
  app.get("/contact", (req, res) => {
    res.render('contact');
  });
};