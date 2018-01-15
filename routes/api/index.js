const router = require("express").Router();
const propertyRoutes = require("./properties");
const userRoutes = require("./users");
const proRoutes = require("./pros");

// Property routes
router.use("/properties", propertyRoutes);
router.use("/users",userRoutes);
router.use("/pros",proRoutes);

module.exports = router; 