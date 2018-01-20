const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  update: function(req, res) {
    console.log("Property Controller Resident");
    console.log(req);
    db.Property
      .findOneAndUpdate({foreignkey: req.params.id, propertyname: req.body.propertyname}, {$set: {resident: req.body.resident}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Property
      .findOneAndUpdate({ resId: req.params.id }, {$set: {resident: {
        firstName: null,
        lastName: "",
        email: "",
        phone: ""
      }}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
