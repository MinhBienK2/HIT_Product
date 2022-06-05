const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");
const authMiddleware = require("../../middlewares/auth.middleware");
const { protect, restrict } = require("../../middlewares/auth.middleware");
const {upload} = require('../../services')

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("admin"), userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(restrict("user","admin"),userController.getUser)
    .patch(restrict("user","admin"),upload.uploadImage, userController.updateUser)
    .delete(restrict("admin"), userController.deleteUser);

module.exports = router;
