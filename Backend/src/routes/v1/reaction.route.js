const express = require("express");
const router = express.Router();
const reactionController = require("../../controllers/reaction.controller");

const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router
    .route("/")
    .get(restrict("admin"), reactionController.getAllReactions)
    .post(restrict("user", "admin"), reactionController.createReaction);

router
    .route("/:id")
    .get(restrict("user", "admin"), reactionController.getReaction)
    .patch(restrict("user", "admin"), reactionController.updateReaction)
    .delete(restrict("user", "admin"), reactionController.deleteReaction);

router
    .route("/of-cmt/:id")
    .get(restrict("user", "admin"), reactionController.getReactionOfCmt);

router
    .route("/of-post/:id")
    .get(restrict("user", "admin"), reactionController.getReactionOfPost) //get all status of user
    .delete(restrict("user", "admin"), reactionController.deleteReactionExists);

router
    .route("/check/:postId")
    .get(restrict("user"), reactionController.isCheckLike);

module.exports = router;
