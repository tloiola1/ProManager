const db = require("../models");

// Defining methods for the userController
module.exports = {
  findOne: function(req, res) {
    console.log("User Controller FindOne");
    console.log(req.body);
    db.User
      .find(req.body)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("User Controller Create");
    console.log(req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("User Controller Update");
    console.log(req.params._id);
    console.log(req.body);
    db.User
      .findOneAndUpdate({ _id: req.params._id }, req.body )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
//   remove: function(req, res) {
//     db.User
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};
