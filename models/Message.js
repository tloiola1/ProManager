const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const MessageSchema = new Schema({
  
  message:{
      propertyId: { type: String, require: true },
      message: {type: String, require: true }
    }
})
// This creates our model from the above schema, using mongoose's model method
const Message = mongoose.model("Message", MessageSchema);

// Export the Property model
module.exports = Message;

// todos: [
//     {
//     task: {type: String, default: ""},
//     _id: { type: Schema.ObjectId, auto: true }
//     }
//   ],