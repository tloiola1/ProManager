const router = require("express").Router();
const taskController = require("../../controllers/taskController");

router.route("/") 
  .post(taskController.remove);

router.route("/:id") 
  .post(taskController.update);

module.exports = router; 