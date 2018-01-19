const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  update: function(req, res) {
    console.log("Task Controller Update");
    console.log(req);
    db.Property
      .findOneAndUpdate({foreignkey: req.params.id, propertyname: req.body.propertyname}, {$set: {resident: req.body.resident}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Task Controller Delete");
    console.log(req.body);//
    db.Property
      .find({_id: req.body.propId},{todos: {$elemMatch: {_id: req.body.taskId}}})
      .then((dbModel) => {console.log(dbModel); res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }
};