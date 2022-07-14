const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
   {
      messageId: {
         type: String,
         required: true,
      },
      friendId: {
         type: mongoose.Schema.ObjectId,
         ref: "Users",
      },
      statusRead: {
         type: Boolean,
         default: false,
      },
      countMessageSended: {
         type: Number,
         // min: 0,
         default: 1,
         // validate: {
         //    validator: function (value) {
         //       if (this.statusRead === true) return (value = 0);
         //    },
         // },
      },
   },
   {
      timestamps: false,
   }
);

const Notification = mongoose.model("Notifications", notificationSchema);

module.exports = Notification;
