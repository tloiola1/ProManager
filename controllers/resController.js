const db = require("../models");

// Defining methods for the propertyController
module.exports = {
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
      .findOneAndUpdate({ _id: req.params.id }, {$unset: {resident: {
        firstName: "Add Resident by click on Edit",
        lastName: "",
        email: "",
        phone: ""
      }}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
