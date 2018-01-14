const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TenantsSchema object
// This is similar to a Sequelize model
const ProsSchema = new Schema({
  //This _id is associated with the property manager _id where the user resids
  _id: {
    type: String,
    required: true
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
  phone: {
      type: String,
      require: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Pros = mongoose.model("Pros", ProsSchema);

// Export the TenantsSchema model
module.exports = Pros;
