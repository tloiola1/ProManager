const db = require("../models");
// Defining methods for the propertyController
module.exports = {
  create: function(req, res) {
    console.log("Message Controller Create");
    console.log(req.body);
    db.Message
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    // console.log("Message Controller Delete");
    // console.log(req.body);
    db.Message
      .findOne({_id: req.body.propId}, {todos: [{$pull: {_id : req.body.taskId}}]})
      .then((dbModel) => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } 
};