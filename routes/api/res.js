const router = require("express").Router();
const resController = require("../../controllers/resController");

router.route("/:id") 
  .post(resController.update)
  .delete(resController.remove);

module.exports = router; 