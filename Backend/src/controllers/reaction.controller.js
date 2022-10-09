const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Reaction } = require("../models");
const { featureCRUDService } = require("../services");

// CRUD Reaction
const getAllReactions = featureCRUDService.getAllModel(Reaction);
const getReaction = featureCRUDService.getModel(Reaction);
const createReaction = featureCRUDService.createModel(Reaction);
const updateReaction = featureCRUDService.updateModel(Reaction);
const deleteReaction = featureCRUDService.deleteModel(Reaction);

const getReactionOfPost = CatchAsync(async (req, res, next) => {
    const data = await Reaction.find({ forPost: req.params.id });
    // if (data.length === 0) {
    //     console.log("hello");
    //     return next(new ApiError("Reation not found", 404));
    // }
    res.status(200).json({
        status: "success",
        reactionLength: data.length,
        data,
    });
});

const getReactionOfCmt = CatchAsync(async (req, res, next) => {
    const data = await Reaction.find({ forCmt: req.params.id });
    if (!data) {
        next(new ApiError("Reation not found", 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

const deleteReactionExists = CatchAsync(async (req, res, next) => {
    const reaction = await Reaction.findOneAndDelete({
        forPost: req.params.id,
        author: req.user.id,
    });
    // console.log(reaction);
    if (!reaction) {
        return next(new ApiError("Reation not found ", 404));
    }
    res.status(200).json({
        status: "success",
    });
});

const isCheckLike = CatchAsync(async (req, res, next) => {
    const reaction = await Reaction.findOne({
        forPost: req.params.postId,
        author: req.user.id,
    });
    if (!reaction) {
        // return next(new ApiError("Reaction not found !", 404));
        return res.status(404).json({
            status: "fail",
        });
    }
    res.status(200).json({
        status: "success",
        reaction,
    });
});

module.exports = {
    getAllReactions,
    getReaction,
    getReactionOfPost,
    getReactionOfCmt,
    createReaction,
    updateReaction,
    deleteReaction,
    deleteReactionExists,
    isCheckLike,
};
