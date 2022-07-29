const express = require("express");
const router = express.Router();

const { watchController } = require("../../controllers");

const { protect, restrict } = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer");

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("user", "admin"), watchController.getAllVideoWithUser)

module.exports = router;
