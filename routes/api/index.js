const router = require("express").Router();
const propertyRoutes = require("./properties");
const userRoutes = require("./users");
const imgRoutes = require("./img");
const messageRoutes = require("./message");
const proRoutes = require("./pros");
const resRoutes = require("./res");
const updateRoutes = require("./update");


// Property routes
router.use("/properties", propertyRoutes);
router.use("/users",userRoutes);
router.use("/message",messageRoutes);
router.use("/pros",proRoutes);
router.use("/res",resRoutes);
router.use("/update",updateRoutes);
router.use("/img",imgRoutes); 

module.exports = router; 