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

const getAllCommentsOfPost = CatchAsync(async (req, res, next) => {
    const getParentComment = await Comment.find({
        postID: req.params.postID,
        parentCmt: null,
    });
    if (!getParentComment) {
        return next(new ApiError(`Comment not found`, 404));
    }
    const getChildrenComment = await Comment.find({
        postID: req.params.postID,
        parentCmt: {
            $ne: null,
        },
    });
    if (!getChildrenComment) {
        next(new ApiError(`Comment not found`, 404));
    }
    const createArr = getParentComment.map((parent) => {
        return { ...parent._doc, childrenCmt: [] };
    });

    const allComments = createArr.map((parent) => {
        for (let i = 0; i < getChildrenComment.length; i++) {
            if (
                JSON.stringify(parent._id) ==
                JSON.stringify(getChildrenComment[i].parentCmt._id)
            ) {
                parent.childrenCmt.push(getChildrenComment[i]);
                getChildrenComment.splice(i, 1);
                --i;
            }
        }
        return parent;
    });

    res.status(200).json({
        status: "success",
        allComments,
        lengthComment: allComments.length,
    });
});

module.exports = {
    getAllComments,
    getComment,
    getChildrenComment,
    getCommentOfPost,
    createComment,
    updateComment,
    deleteComment,
    getAllCommentsOfPost,
};
