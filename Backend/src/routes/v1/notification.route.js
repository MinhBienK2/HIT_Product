const express = require("express");
const { get } = require("mongoose");
const router = express.Router();

const { notificationController } = require("../../controllers");
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router
   .route("/message-id/:messageId/friend-id/:friendId")
   .get(notificationController.getStatuOfMessage)
   .post(notificationController.createNotification)
   .delete(notificationController.deleteNotification);

// modify status
router
   .route("/read/message-id/:messageId/friend-id/:friendId")
   .patch(notificationController.modifyStatusOfMessageIsRead);

router
   .route("/unread/message-id/:messageId/friend-id/:friendId")
   .patch(notificationController.modifyStatusOfMessageIsUnread);

module.exports = router;
