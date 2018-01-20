const router = require("express").Router();
const propertyRoutes = require("./properties");
const userRoutes = require("./users");
const taskRoutes = require("./task");
const proRoutes = require("./pros");
const resRoutes = require("./res");


// Property routes
router.use("/properties", propertyRoutes);
router.use("/users",userRoutes);
router.use("/task",taskRoutes);
router.use("/pros",proRoutes);
router.use("/res",resRoutes);

module.exports = router; 