const mongoose = require("mongoose");
const { Schema } = mongoose;
const ApiError = require("../utils/ApiError");

const commentSchema = new Schema(
    {
        content: String,
        parentCmt: {
            type: Schema.ObjectId,
            ref: "Comments",
            default: null,
        },
        postID: {
            type: Schema.ObjectId,
            ref: "Posts",
            required: true,
        },
        author: { type: Schema.ObjectId, ref: "Users", required: true },
    },
    {
        timestamps: true,
    }
);

commentSchema.pre(/^find/, function (next) {
    this.populate({ path: "parentCmt" }).populate({
        path: "author",
        select: ["name", "avatar"],
    });
    next();
});

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
