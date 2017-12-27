const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const PropertySchema = new Schema({
  //_ID is the id of the user whom manages/added a property
  _id:{
    type: String,
    required: true,
    unique: true
  },
  // `Name` is required and of type String  
  name: {
    type: String,
    required: true
  },
  // `Address` is required and of type String
  address: {
    type: String,
    required: true
  },
  //
  city:{
      type: String,
      require: true
  },
  //
  state:{
      type: String,
      require: true
  },
  zipcode:{
      type: Number,
      require: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Property = mongoose.model("Property", PropertySchema);

// Export the Property model
module.exports = Property;
