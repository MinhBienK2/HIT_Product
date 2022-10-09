const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const paginate = require("../utils/paginate.util");
const { User, Friendship, Message } = require("../models");
const { Comment } = require("../models");

const handleCreateComment = async (req, res, next) => {
    let isCreate = false;
    let data;
    if (req.body.parentCmt) {
        const check = await Comment.findById(req.body.parentCmt);
        if (!check) return next(new ApiError(`parentCmt does not exist`, 404));
        else if (check.postID != req.body.postID)
            return next(new ApiError(`parentCmt does not math`, 403));
        else isCreate = true;
    } else isCreate = true;
    if (isCreate) {
        data = await Comment.create({
            content: req.body.content,
            postID: req.body.postID,
            parentCmt: req.body.parentCmt,
            author: req.user._id,
        });
        data = await data.populate({
            path: "author",
            select: ["name", "avatar"],
        });
    }
    return data;
};

module.exports = { handleCreateComment };
