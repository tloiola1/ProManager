const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  findAll: function(req, res) {
    console.log("Property Controller FindAll.");
    console.log(req.body);
    db.Property
      .find(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("Property Controller FindById.");
    console.log(req.params._id);
    db.Property
      .find({_id: req.params._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByForeignKey: function(req, res) {
    console.log("Property Controller FindByForeignKey.");
    console.log(req.params._id);
    db.Property
      .find({foreignkey: req.params._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("Property Controller Create.");
    console.log(req.body);
    db.Property
      .create(req.body)
      .then(dbModel =>{console.log("Create Res"); console.log(res); res.json(dbModel);})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Property
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
