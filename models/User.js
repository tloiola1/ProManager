var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `Name` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `Address` is required and of type String
  email: {
    type: String,
    required: true
  },
  //
  phone: {
    type: String,
    require: true
  },
  //
  password: {
      type: String,
      require: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the UserSchema model
module.exports = User;
