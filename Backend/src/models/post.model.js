const mongoose = require("mongoose")
const { Schema } = mongoose

const postSchema = new Schema({
   description: {
      type: String,
   },
   photos: [String],
   videos: [String],
   shareOf: { type: Schema.Types.ObjectId, ref: "Posts", default: null },
   author: { type: Schema.Types.ObjectId, ref: "Users", default: null },
   group: { type: Schema.Types.ObjectId, default: null },
}, {
   timestamps: true,
});

const Post = mongoose.model("Posts", postSchema)

module.exports = Post

