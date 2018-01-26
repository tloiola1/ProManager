const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router.route("/")
  .get(userController.findOne) 
  .post(userController.create);

// Matches with "/api/books/:id"
router.route("/:_id")
  .get(userController.findMyProsById)
  .post(userController.update);
//   .put(propertyController.update)
//   .delete(propertyController.remove);

module.exports = router;