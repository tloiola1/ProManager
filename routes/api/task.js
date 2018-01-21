const router = require("express").Router();
const taskController = require("../../controllers/taskController");

router.route("/") 
  .post(taskController.create); 

router.route("/:_id") 
  .delete(taskController.remove);

module.exports = router; 