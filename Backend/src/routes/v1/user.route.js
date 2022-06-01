const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers");
const authMiddleware = require("../../middlewares/auth.middleware");
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("admin"), userController.getAllUsers)
    .post(restrict("admin"), userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(restrict("admin"), userController.updateUser)
    .delete(restrict("admin"), userController.deleteUser);

module.exports = router;
