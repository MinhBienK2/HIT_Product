const mongoose = require("mongoose")
const { Schema } = mongoose

const commentSchema = new Schema({
   content: String,
   parentCmt: { type: Schema.Types.ObjectId, ref: "Comments", default: null },
   postID: { type: Schema.Types.ObjectId, ref: "Posts", default: null }
}, {
   timestamps: true,
});

const Comment = mongoose.model("Comments", postSchema)

module.exports = Comment

