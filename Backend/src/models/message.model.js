const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
   {
      // id of user manager list message
      userId: {
         type: mongoose.Schema.ObjectId,
         ref: "Users",
      },
      messages: [
         {
            messageId: {
               type: String,
            },
            members: [
               {
                  memberId: {
                     type: mongoose.Schema.ObjectId,
                     ref: "Users",
                  },
                  timeJoin: {
                     type: Date,
                     default: Date.now(),
                  },
               },
            ],
            contents: [
               {
                  senderId: {
                     // sẽ là chính mình Gửi
                     type: mongoose.Schema.ObjectId,
                     ref: "Users",
                  },
                  content: {
                     type: String,
                  },
                  createdAtcontent: {
                     type: Date,
                     default: Date.now(),
                  },
               },
            ],
            createdAtMessage: {
               type: Date,
               default: Date.now(),
            },
         },
      ],
      createdAt: {
         type: Date,
         default: Date.now(),
      },
      updatedAt: {
         type: Date,
         default: Date.now(),
      },
   },
   {
      timestamps: false,
   }
);

// populate
messageSchema.pre(/^find/, function (next) {
   this.populate({
      path: "userId",
      select: ["name", "avatar"],
   })
      .populate({
         path: "messages",
         populate: {
            path: "members",
            populate: {
               path: "memberId",
               select: ["name", "avatar"],
            },
         },
      })
      .populate({
         path: "messages",
         populate: {
            path: "contents",
            populate: {
               path: "senderId",
               select: ["name", "avatar"],
            },
         },
      });
   next();
});

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
