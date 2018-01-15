const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const PropertySchema = new Schema({
  propertyname: { type: String, required: true },
  type:         { type: String, required: true},
  address:{
    address1:   { type: String, required: true },
    city:       { type: String, require: true },
    state:      { type: String, require: true },
    zipcode:    { type: String, require: true }
  },
  description:  { type: String, require: true },
  available:    { type: String, require: true },
  foreignkey:   { type: String, require: true }
});

// This creates our model from the above schema, using mongoose's model method
const Property = mongoose.model("Property", PropertySchema);

// Export the Property model
module.exports = Property;
