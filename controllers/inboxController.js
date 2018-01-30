const db = require("../models");
// Defining methods for the propertyController
module.exports = {
  create: function(req, res) {
    console.log("Message Controller Create");
    console.log(req.body._id);
    console.log(req.body.message);
    db.User
      // .create(req.body)
      .findOneAndUpdate({_id: req.body._id}, {$push: {message: req.body.message}}, {safe: true, upsert: true, new: true})
      .then(property => res.json(property))
      .catch(err => res.status(422).json(err));
  },
//   update: function(req, res) {
//     console.log("Message Controller Update");
//     console.log(req);
//     db.Property
//       .find()//{_id: req.body._id}, {$push: {message: req.body.message}}, {safe: true, upsert: true, new: true}
//       .then(property => res.json(property))
//       .catch(err => res.status(422).json(err));
//   },
  remove: function(req, res) {
    // console.log(req.params);
    const textId = req.body.messageId;
    db.User
      .update({_id: req.params._id}, {$pull: { message: {_id: textId }}})//, {message: {$elemMatch: {_id : req.body.messageId}}}
      .then((property) => {                      
        res.json(property);
      })
      .catch(err => res.status(422).json(err));
  } 
}; 