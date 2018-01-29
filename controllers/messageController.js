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
    // console.log(req.params);
    const textId = req.body.messageId;
    db.Property
      .update({_id: req.params._id}, {$pull: { message: {_id: textId }}})//, {message: {$elemMatch: {_id : req.body.messageId}}}
      .then((property) => {
        
        // console.log("Before");
        // console.log(property.message[0]._id)
        // console.log("Middle");        
        // console.log(textId);
        // console.log("After");                
        // for(let i = 0; i < property.message.length; i++){

        //   if(property.message[i]._id === textId){
        //     console.log("GREAT!!");
        //     console.log(property.message[i]._id);
        //   }
        // }
        // console.log("Beyond");                        
        res.json(property);
      })
      .catch(err => res.status(422).json(err));
  } 
};