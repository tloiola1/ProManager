const router = require("express").Router();
const updateController = require("../../controllers/updateController");

router.route("/")
  .post(updateController.update);

router.route("/:_id")
  .get(updateController.findById)

module.exports = router;