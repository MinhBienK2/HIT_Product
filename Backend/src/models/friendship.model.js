const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Users",
        },
        friendId: {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
        },
        status: {
            type: String,
            enum: ["confirm", "isFriend"],
            // default: "confirm",
        },
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

friendshipSchema.pre(/^find/, async function (next) {
    this.populate({
        path: "userId",
        select: ["name", "avatar"],
    }).populate({
        path: "friendId",
        select: ["name", "avatar"],
    });
});

const Friendship = mongoose.model("Friendships", friendshipSchema);

module.exports = Friendship;

// const mongoose = require("mongoose");

// const friendshipSchema = new mongoose.Schema(
//    {
//       userId: {
//          type: mongoose.Schema.ObjectId,
//          required: true,
//          unique: [true, "user-friend does exists !"],
//          ref: "Users",
//       },
//       friends: [
//          {
//             friendId: {
//                type: mongoose.Schema.ObjectId,
//                // unique: [true, "friend does exists !"],
//                ref: "Users",
//             },
//             createdAt: {
//                type: Date,
//                default: Date.now(),
//             },
//          },
//       ],
//       status: {
//          type: String,
//          enum: ["private", "public"],
//          default: "public",
//       },
//       createdAt: {
//          type: Date,
//          default: Date.now(),
//       },
//       updatedAt: {
//          type: Date,
//          default: Date.now(),
//       },
//    },
//    {
//       timestamps: false,
//    }
// );

// friendshipSchema.pre(/^find/, async function (next) {
//    this.populate({
//       path: "userId",
//       select: ["name"],
//    }).populate({
//       path: "friends",
//       populate: {
//          path: "friendId",
//          select: ["name", "avatar"],
//       },
//    });
// });

// const Friendship = mongoose.model("Friendships", friendshipSchema);

// module.exports = Friendship;
