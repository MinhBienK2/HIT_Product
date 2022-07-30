const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        description: {
            type: String,
        },
        photos: [String],
        videos: [String],
        shareOf: {
            type: mongoose.Schema.ObjectId,
            ref: "Posts",
            default: null,
        },
        author: { type: mongoose.Schema.ObjectId, ref: "Users", default: null },
        group: { type: mongoose.Schema.ObjectId, default: null },
    },
    {
        timestamps: true,
    }
);

postSchema.pre(/^find/, function (next) {
    this.populate({
        path: "author",
        select: ["name", "avatar"],
    });
    next();
});

postSchema.pre(/^aggregate/, function (next) {
    console.log(this);
    this.populate({
        path: "author",
        select: ["name", "avatar"],
    });
    next();
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
