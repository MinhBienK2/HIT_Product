const express = require("express");
const router = express.Router();

const upload = require("../../config/multer");

const { stateController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router.route("/active").patch(stateController.updateStateIsActive);
router.route("/not-active").patch(stateController.updateStateIsNotActive);

module.exports = router;
