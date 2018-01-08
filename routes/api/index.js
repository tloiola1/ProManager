const router = require("express").Router();
const propertyRoutes = require("./properties");
const userRoutes = require("./users");

// Property routes
router.use("/properties", propertyRoutes);
router.use("/users",userRoutes);

module.exports = router;