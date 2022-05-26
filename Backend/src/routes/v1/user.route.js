const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");

// router.get("/");
router.route("/").get(userController.getAllUsers);

module.exports = router;
