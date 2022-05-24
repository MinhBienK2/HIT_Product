const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");

router.get("/", userController.test);

module.exports = router;
