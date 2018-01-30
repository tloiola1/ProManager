const router = require("express").Router();
const messageController = require("../../controllers/messageController");

router.route("/") 
  .post(messageController.create);
  // .put(messageController.update); 

router.route("/:_id") 
  .post(messageController.remove);

module.exports = router; 