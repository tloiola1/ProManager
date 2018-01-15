const router = require("express").Router();
const prosController = require("../../controllers/prosController");

// Matches with "/api/createUser"
router.route("/")
    .get(prosController.findAll)
    .post(prosController.create);

// router.route("/:id")
//   .get(prosController.findById);
//   .post(prosController.createById);

module.exports = router; 