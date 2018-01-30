const router = require("express").Router();
const inboxController = require("../../controllers/inboxController");

router.route("/") 
  .post(inboxController.create);
  // .put(messageController.update); 

router.route("/:_id") 
  .post(inboxController.remove);

module.exports = router; 