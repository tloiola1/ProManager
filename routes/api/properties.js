const router = require("express").Router();
const propertyController = require("../../controllers/propertyController");

///api/properties
router.route("/")
  .get(propertyController.findAll)
  .post(propertyController.create);

router.route("/:_id")
  .get(propertyController.findByForeignKey)
  .delete(propertyController.remove);

router.route("/:user/:_id")
  .get(propertyController.findById);

module.exports = router;