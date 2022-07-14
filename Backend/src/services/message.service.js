const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { User, Friendship, Message } = require("../models");
const { update } = require("../models/friendship.model");

// lấy tất cả danh sách tin nhắn
const getAllMessageListOfUser = CatchAsync(async (req, res, next) => {
   let datas = new paginate(
      Message.find({
         userId: req.user.id,
      }),
      req.query
   );
   // paginate
   datas.search().filter().sort().select().pagination().populate();
   const data = await datas.query;
   console.log(data);
   //respone
   if (!data) {
      next(new ApiError(`${Model} not found`, 404));
   }
   res.status(200).json({
      status: "success",
      listMessage: data[0].messages,
   });
});

// lấy từng tin nhắn 1 dựa vào mesageId
const getMessageOfList = CatchAsync(async (req, res, next) => {
   const message = await Message.findOne(
      {
         userId: req.user.id,
         "messages.messageId": req.params.messageId,
      },
      {
         userId: 1,
         messages: {
            $elemMatch: {
               messageId: req.params.messageId,
            },
         },
      }
   ).lean();
   res.status(200).json({
      status: "success",
      data: message,
   });
});

// lay message by userId
const getMessageByFriendId = CatchAsync(async (req, res, next) => {
   const getListMessage = await Message.findOne({
      userId: req.user.id,
   }).lean();
   let dataMessage;
   for (let message of getListMessage.messages) {
      for (let member of message.members) {
         if (
            JSON.stringify(member.memberId._id).split('"')[1] ===
               req.params.userId &&
            !message.members[1]
         ) {
            const strMessageId = message.messageId;
            dataMessage = await Message.findOne(
               {
                  userId: req.user.id,
                  // "messages.messageId": strMessageId,
               },
               {
                  messages: {
                     $elemMatch: {
                        messageId: strMessageId,
                     },
                  },
               }
            );
            res.status(200).json({
               status: "success",
               messageWithFriend: dataMessage.messages[0],
            });
            return;
         }
      }
   }
   res.status(200).json({
      status: "fail",
   });
});

// tạo tin nhắn với 1 người liên kết
const createMessage = CatchAsync(async (req, res, next) => {
   const messageId = mongoose.Types.ObjectId();
   //check 1
   const checkExists = await Message.findOne({
      userId: req.user.id,
   }).lean();
   checkExists.messages.forEach((ele1) => {
      ele1.members.forEach((ele2) => {
         const stringjson = JSON.stringify(ele2.memberId);
         const sosanh = '"' + req.params.userId + '"';
         if (sosanh == stringjson)
            return next(new ApiError("message has exists !", 400));
      });
   });
   //check 2
   const checkExists2 = await Message.findOne({
      userId: req.params.userId,
   }).lean();
   checkExists2.messages.forEach((ele1) => {
      ele1.members.forEach((ele2) => {
         const stringjson = JSON.stringify(ele2.memberId);
         const sosanh = '"' + req.user.id + '"';
         if (sosanh == stringjson)
            return next(new ApiError("message has exists !", 400));
      });
   });
   await Message.update(
      {
         userId: req.user.id,
      },
      {
         $push: {
            messages: {
               messageId: messageId,
            },
         },
      }
   );
   await Message.update(
      {
         userId: req.user.id,
         messageId: messageId,
      },
      {
         $push: {
            "messages.$[element].members": {
               memberId: req.params.userId,
            },
         },
      },
      {
         arrayFilters: [
            {
               "element.messageId": messageId,
            },
         ],
      }
   );
   // create people 2

   await Message.update(
      {
         userId: req.params.userId,
      },
      {
         $push: {
            messages: {
               messageId: messageId,
            },
         },
      }
   );
   await Message.update(
      {
         userId: req.params.userId,
         messageId: messageId,
      },
      {
         $push: {
            "messages.$[element].members": {
               memberId: req.user.id,
            },
         },
      },
      {
         arrayFilters: [
            {
               "element.messageId": messageId,
            },
         ],
      }
   );
   res.status(201).json({
      status: "success",
      messageId: messageId,
   });
});

// gửi tin nhắn
const sendContentOfMessage = CatchAsync(async (req, res, next) => {
   // console.log(req.body.content);
   await Message.update(
      {
         userId: req.user.id,
         messageId: req.params.messageId,
      },
      {
         $push: {
            "messages.$[ele].contents": {
               senderId: req.user.id,
               content: req.body.content,
            },
         },
      },
      {
         arrayFilters: [
            {
               "ele.messageId": req.params.messageId,
            },
         ],
      }
   );

   const findUser = await Message.findOne(
      {
         userId: req.user.id,
      },
      {
         messages: {
            $elemMatch: {
               messageId: req.params.messageId,
            },
         },
      }
   ).lean();
   findUser.messages.forEach((ele) => {
      ele.members.forEach(async (ele2) => {
         // console.log(ele2.memberId);
         await Message.update(
            {
               userId: ele2.memberId,
               messageId: req.params.messageId,
            },
            {
               $push: {
                  "messages.$[ele].contents": {
                     senderId: req.user.id,
                     content: req.body.content,
                  },
               },
            },
            {
               arrayFilters: [
                  {
                     "ele.messageId": req.params.messageId,
                  },
               ],
            }
         );
      });
   });
   res.status(200).json({
      status: "success",
   });
});

//xóa nội dung tin nhắn
const deleteContentMyMessage = CatchAsync(async (req, res, next) => {
   await Message.update(
      {
         userId: req.user.id,
         messageId: req.params.messageId,
      },
      {
         $pull: {
            "messages.$[ele].contents": {
               _id: req.params.contentId,
            },
         },
      },
      {
         arrayFilters: [
            {
               "ele.messageId": req.params.messageId,
            },
         ],
      }
   );
   res.status(200).json({
      status: "success",
   });
});

//xóa tin nhắn đi
const deleteMessage = CatchAsync(async (req, res, next) => {
   await Message.update(
      {
         userId: req.user.id,
      },
      {
         $pull: {
            messages: {
               messageId: req.params.messageId,
            },
         },
      }
   );
   res.status(200).json({
      status: "success",
   });
});

module.exports = {
   getAllMessageListOfUser,
   getMessageOfList,
   getMessageByFriendId,
   createMessage,
   sendContentOfMessage,
   deleteContentMyMessage,
   deleteMessage,
};
