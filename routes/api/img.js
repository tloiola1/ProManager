const router = require("express").Router();
const imgController = require("../../controllers/imgController");

router.route("/") 
  .post(imgController.upload);

module.exports = router; 