const db = require("../models/Pros");

// Defining methods for the userController
module.exports = {
  // findAll: function(req, res) {
  //   console.log("Pros Controller FindAll");
  //   console.log(req.body);
  //   db.Pros
  //     .find(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function(req, res) {
  //   console.log("Pros Controller FindById");
  //   console.log(req.params.id);
  //   db.Pros
  //     .find({foreignkey: req.params.id})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
  // create: function(req, res) {
  //   console.log("Pros Controller Create");
  //   console.log(req.body);
  //   db.Pros
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function(req, res) {
  //   console.log("Pros Controller Update");
  //   console.log(req.params._id);
  //   console.log(req.body);
  //   db.Pros
  //     .findOneAndUpdate({ _id: req.params._id }, req.body )
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
//   remove: function(req, res) {
//     db.Pros
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};