var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `Name` is required and of type String
  firstname: { type: String, trim: true, required: "Name is Required" },
  //
  lastname: { type: String, trim: true, required: "Last name is Required" },
  // `Address` is required and of type String
  email: { 
    type: String, 
    unique: true, 
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address!"] },
  //
  password: { 
    type: String, 
    trim: true, 
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password must be longer 5 characters."
    ]
  },
  //
  phone: { type: String, require: true },
  //
  title: { type: String, require: true }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the UserSchema model
module.exports = User;
