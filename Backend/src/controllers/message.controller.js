const { messageService } = require("../services");

// CRUD User
const getAllMessageListOfUser = messageService.getAllMessageListOfUser;
const getMessageOfList = messageService.getMessageOfList;
const getMessageByFriendId = messageService.getMessageByFriendId;
const createMessage = messageService.createMessage;
const sendContentOfMessage = messageService.sendContentOfMessage;
const deleteContentMyMessage = messageService.deleteContentMyMessage;
const deleteMessage = messageService.deleteMessage;

module.exports = {
   getAllMessageListOfUser,
   getMessageOfList,
   getMessageByFriendId,
   createMessage,
   sendContentOfMessage,
   deleteContentMyMessage,
   deleteMessage,
};
