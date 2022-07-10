const mongoose = require("mongoose")
const { Schema } = mongoose

const reactionSchema = new Schema({
   status: {
      type: String,
      enum: ["like", "smile", "love", "sad", "surprised", "angry"],
      default: "like",
  },
   forPost: { type: Schema.Types.ObjectId, ref: "Posts", default: null },
   forCmt: { type: Schema.Types.ObjectId, ref: "Comments", default: null },
   author: { type: Schema.Types.ObjectId, ref: "Users", default: null },
}, {
   timestamps: true,
});

const Reaction = mongoose.model("Reations", reactionSchema)

module.exports = Reaction