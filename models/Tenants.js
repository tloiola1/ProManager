var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new TenantsSchema object
// This is similar to a Sequelize model
var TenantsSchema = new Schema({
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
  email: {
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
var Tenants = mongoose.model("Tenants", TenantsSchema);

// Export the TenantsSchema model
module.exports = Tenants;
