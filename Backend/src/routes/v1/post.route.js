const express = require("express");
const router = express.Router();

const { postController } = require("../../controllers");

const { protect, restrict } = require("../../middlewares/auth.middleware");
const {upload} = require('../../services')

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("admin"), postController.getAllPosts)
    .post(restrict("user","admin"), upload.uploadImage, postController.createPost);

router
    .route("/:id")
    .get(restrict("user","admin"), postController.getPost)
    .patch(restrict("user","admin"), upload.uploadImage, postController.updatePost)
    .delete(restrict("user","admin"), postController.deletePost);

module.exports = router;
