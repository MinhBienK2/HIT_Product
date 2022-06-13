const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Comment } = require("../models");
const { featureCRUDService } = require("../services");

// CRUD Comment
const getAllComments = featureCRUDService.getAllModel(Comment);
const getComment = featureCRUDService.getModel(Comment);
const createComment = featureCRUDService.createModel(Comment);
const updateComment = featureCRUDService.updateModel(Comment);
const deleteComment = featureCRUDService.deleteModel(Comment);

const getChildrenComment = CatchAsync(async (req, res, next) => {
    const data = await Comment.find({ parentCmt: req.params.id });
    if (!data) {
        next(new ApiError(`Comment not found`, 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

const getCommentOfPost = CatchAsync(async (req, res, next) => {
    const data = await Comment.find({ postID: req.params.id });
    if (!data) {
        next(new ApiError(`Comment not found`, 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

module.exports = { getAllComments, getComment, getChildrenComment, getCommentOfPost,
                     createComment, updateComment, deleteComment };
