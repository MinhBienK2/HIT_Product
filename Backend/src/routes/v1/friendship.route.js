const express = require("express");
const router = express.Router();

const { friendshipController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");
const { upload } = require("../../services");

//protect all router
router.use(protect);

//CRUD
router.route("/").get(friendshipController.getAllFriendshipOfUser);

router
   .route("/:friendId")
   .patch(friendshipController.addAFriendForUser)
   .delete(friendshipController.deleteAOrManyFriendshipOfUser);

module.exports = router;
