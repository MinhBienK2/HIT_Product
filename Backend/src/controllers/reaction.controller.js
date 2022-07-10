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
    if (!data) {
        next(new ApiError('Reation not found', 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

const getReactionOfCmt = CatchAsync(async (req, res, next) => {
    const data = await Reaction.find({ forCmt: req.params.id });
    if (!data) {
        next(new ApiError('Reation not found', 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

module.exports = { 
    getAllReactions,
    getReaction,
    getReactionOfPost,
    getReactionOfCmt,
    createReaction,
    updateReaction,
    deleteReaction 
};
