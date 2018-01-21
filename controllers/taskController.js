const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  create: function(req, res) {
    console.log("Task Controller Create Update");
    console.log(req.body);
    db.Property
      .findOne({_id: req.body._id}, (err, task )=>{ task.todos.push(req.body.todos); task.save()})//, propertyname: req.body.propertyname}, {$set: {resident: req.body.resident}
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Task Controller Delete");
    console.log(req.body);//
    db.Property
      .find({todos: {_id: req.params._id}})//,{todos: {$elemMatch: {_id: req.body.taskId}}}
      .then((dbModel) => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  } 
};