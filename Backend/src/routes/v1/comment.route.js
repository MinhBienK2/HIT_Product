const express = require("express");
const router = express.Router();

const { commentController } = require("../../controllers");

const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("admin"), commentController.getAllComments)
    .post(restrict("user", "admin"), commentController.createComment);

router
    .route("/:id")
    .get(restrict("user", "admin"), commentController.getComment)
    .patch(restrict("user", "admin"), commentController.updateComment)
    .delete(restrict("user", "admin"), commentController.deleteComment);

router
    .route("/child/:id")
    .get(restrict("user", "admin"), commentController.getChildrenComment);

router
    .route("/of-post/:id")
    .get(restrict("user", "admin"), commentController.getCommentOfPost);

router
    .route("/get-Comment/:postID")
    .get(restrict("user"), commentController.getAllCommentsOfPost);

module.exports = router;
