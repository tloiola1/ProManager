const db = require("../models");

// Defining methods for the propertyController
module.exports = {
  
  findById: function(req, res) {
    console.log("Update Controller FindById.");
    console.log(req.params._id);
    db.Property
      .find({_id: req.params._id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Update Controller update"); 
    console.log(req.body);
    db.Property
      .findOneAndUpdate({ _id: req.body._id }, 
        {$set: {
            propertyname: req.body.propertyname,
            address:  req.body.address,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            img: req.body.img
        }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}; 
