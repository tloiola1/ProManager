const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TenantsSchema object
// This is similar to a Sequelize model
const ProsSchema = new Schema({
  name:       { type: String, required: true },
  address:    { type: String, required: true },
  phone:      { type: String, require: true },
  foreignkey: { type: String, require: true },
});

// This creates our model from the above schema, using mongoose's model method
const Pros = mongoose.model("Pros", ProsSchema);

// Export the TenantsSchema model
module.exports = Pros;
