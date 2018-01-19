const router = require("express").Router();
const propertyController = require("../../controllers/propertyController");

///api/properties
router.route("/")
  .get(propertyController.findAll)
  .post(propertyController.create);

router.route("/:id")
  .get(propertyController.findById)
  .delete(propertyController.remove);

module.exports = router;