const mongoose = require("mongoose")
const { Schema } = mongoose
const ApiError = require("../utils/ApiError");


const commentSchema = new Schema({
   content: String,
   parentCmt: { type: Schema.Types.ObjectId, ref: "Comments", default: null },
   postID: { type: Schema.Types.ObjectId, ref: "Posts", default: null, required: true},
   author: { type: Schema.Types.ObjectId, ref: "Users", default: null},
}, 
{
   timestamps: true,
});

const Comment = mongoose.model("Comments", commentSchema)

module.exports = Comment

