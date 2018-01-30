const router = require("express").Router();
const resController = require("../../controllers/resController");

router.route("/:_id")
  .get(resController.findByPropertyIdId)
  .post(resController.update)
  .delete(resController.remove);

module.exports = router; 