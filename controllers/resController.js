const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  findByPropertyIdId: function(req, res) {
    console.log("Property Controller Resident");
    console.log(req.params._id);
    db.Property
      .find({ _id: req.params._id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Property Controller Resident");
    console.log(req.params._id);
    db.Property
      .findOneAndUpdate({ _id: req.params._id }, {$set: {resident: req.body.resident}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Property
      .findOneAndUpdate({ _id: req.params._id }, {$unset: {resident: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null
      }}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
