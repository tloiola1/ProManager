const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  create: function(req, res) {
    console.log("Task Controller Create");
    console.log(req.body);
    db.Property
      .findOneAndUpdate({_id: req.body._id}, {$push: {todos: req.body.todos}}, {safe: true, upsert: true, new : true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Task Controller Delete");
    console.log(req.body);//
    db.Property
      .find({_id: req.body.propId}, {todos: {$elemMatch: {_id : req.body.taskId}}}, {$set: {todos:{task: null}}})//,{todos: {$elemMatch: {_id: req.body.taskId}}}
      .then((dbModel) => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } 
};