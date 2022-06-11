const mongoose = require("mongoose")
const { Schema } = mongoose
const ApiError = require("../utils/ApiError");


const commentSchema = new Schema({
   content: String,
   parentCmt: { type: Schema.Types.ObjectId, ref: "Comments", default: null },
<<<<<<< HEAD
   postID: { type: Schema.Types.ObjectId, ref: "Posts", default: null, required: true},
   author: { type: Schema.Types.ObjectId, ref: "Users", default: null},
=======
   postID: { type: Schema.Types.ObjectId, ref: "Posts", default: null, required: true}
>>>>>>> 3d6e78c86bf099acbc381a879ae13bf3b0de0dce
}, 
{
   timestamps: true,
});

<<<<<<< HEAD

=======
>>>>>>> 3d6e78c86bf099acbc381a879ae13bf3b0de0dce
const Comment = mongoose.model("Comments", commentSchema)

module.exports = Comment

