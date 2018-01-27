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
  price:        { type: String, require: true },
  foreignkey:   { type: String, require: true },
  resId:        { type: Schema.ObjectId, auto: true },
  resident: {
      firstName: { type: String, default: null },
      lastName: { type: String, default: null },
      email: { type: String, default: null },
      phone: { type: String, default: null }
  },
  todos: [
    {
    task: {type: String, default: ""},
    _id: { type: Schema.ObjectId, auto: true }
    }
  ],
  img: { type: String }
});

// This creates our model from the above schema, using mongoose's model method
const Property = mongoose.model("Property", PropertySchema);

// Export the Property model
module.exports = Property;
