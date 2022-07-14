const { notificationService } = require("../services");

// CRUD User
const getStatuOfMessage = notificationService.getStatuOfMessage;
const modifyStatusOfMessageIsRead =
   notificationService.modifyStatusOfMessageIsRead;
const modifyStatusOfMessageIsUnread =
   notificationService.modifyStatusOfMessageIsUnread;
const createNotification = notificationService.createNotification;
const deleteNotification = notificationService.deleteNotification;

module.exports = {
   getStatuOfMessage,
   createNotification,
   modifyStatusOfMessageIsRead,
   modifyStatusOfMessageIsUnread,
   deleteNotification,
};
