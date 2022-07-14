const express = require("express");
const router = express.Router();

const { messageController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");
const { upload } = require("../../services");

//protect all router
router.use(protect);

//CRUD
//Get All Lists Message Of User
router.route("/").get(messageController.getAllMessageListOfUser);

router.route("/friend-id/:userId").post(messageController.createMessage);

router
   .route("/get-message/:userId")
   .get(messageController.getMessageByFriendId);

router
   .route("/:messageId") // id of messages
   .get(messageController.getMessageOfList) // get message of a friend
   .post(messageController.sendContentOfMessage) //send content of message
   .delete(messageController.deleteMessage); // delete a message

router
   .route("/messageId/:messageId/contentId/:contentId")
   .delete(messageController.deleteContentMyMessage);

module.exports = router;
