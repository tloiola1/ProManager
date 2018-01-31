const db = require("../models");

// Defining methods for the userController
module.exports = {
  findOne: function(req, res) {
    console.log("User Controller FindOne");
    console.log(req.body);
    db.User
      .find(req.body)
      .then(User => res.json(User))
      .catch(err => res.status(422).json(err));
  }

};
