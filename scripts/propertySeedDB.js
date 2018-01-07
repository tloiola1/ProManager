const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/promanager_db",
  {
    useMongoClient: true
  }
);

const propertySeed = [
  {
    name: "The Dream",
    address: "3304 Saddlegate COurt",
    city: "Buford",
    state: "Georgia",
    zipcode: 30519
  }
];

db.Property
  .remove({})
  .then(() => db.Property.collection.insertMany(propertySeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
