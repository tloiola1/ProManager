const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(userController.findOne)
  .post(userController.create);

// // Matches with "/api/books/:id"
// router.route("/:id")
//   .get(propertyController.findById)
//   .put(propertyController.update)
//   .delete(propertyController.remove);

module.exports = router;