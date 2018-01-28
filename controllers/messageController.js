const db = require("../models");
// Defining methods for the propertyController
module.exports = {
  create: function(req, res) {
    console.log("Message Controller Create");
    console.log(req.body._id);
    console.log(req.body.message);
    db.Property
      // .create(req.body)
      .findOneAndUpdate({_id: req.body._id}, {$push: {message: req.body.message}}, {safe: true, upsert: true, new: true})
      .then(property => res.json(property))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log(req.params);
    console.log(req.body.messageId);
    const textId = req.body.messageId;
    db.Property
      .findOneAndUpdate({_id: req.params._id})//, {message: {$elemMatch: {_id : req.body.messageId}}}
      .then((property) => {
        console.log(`Messages`);
        for(let i = 0; i < property.message.length; i++){
          if(property.message[i]._id === textId){
            console.log("GREAT!!");
            console.log(property.message[i]);
            return;
          }
        }
        res.json(property);
      })
      .catch(err => res.status(422).json(err));
  } 
};