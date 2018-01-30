const router = require("express").Router();
const prosController = require("../../controllers/prosController");

// Matches with "/api/createUser"
router.route("/")
    .get(prosController.findAll)
    .post(prosController.create);

router.route("/:_id")
  .get(prosController.findMyProsById)
  // .post(prosController.findById)
  .delete(prosController.remove);

module.exports = router; 