const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { StoryViewer } = require("../models");

// lay tat ca viewer cua story
const getAllViewerOfStory = CatchAsync(async (req, res, next) => {
    const storyViewer = await StoryViewer.find({
        storyId: req.params.storyId,
    });
    if (!storyViewer)
        return next(new ApiError("viewer of story has not exists !", 400));
    res.status(200).json({
        status: "success",
        storyViewer,
    });
});

const createStoryViewer = CatchAsync(async (req, res, next) => {
    const checkStoryView = await StoryViewer.findOne({
        storyId: req.params.storyId,
        userIdOfStoryOwner: req.params.ownStoryId,
        userId: req.user.id,
    });
    // console.log(checkStoryView);
    if (checkStoryView)
        return next(new ApiError("storyView has exists !", 400));
    const storyViewer = await StoryViewer.create({
        storyId: req.params.storyId,
        userIdOfStoryOwner: req.params.ownStoryId,
        userId: req.user.id,
    });
    if (!storyViewer) return next(new ApiError("Story not exists !", 400));
    res.status(200).json({
        status: "success",
        storyViewer,
    });
});

const updateStatusStoryViewer = CatchAsync(async (req, res, next) => {
    const storyViewer = await StoryViewer.findByIdAndUpdate(
        {
            _id: req.params.storyViewerId,
        },
        {
            $push: {
                emotions: req.params.emotion,
            },
        }
    );
    // console.log(storyViewer);
    res.status(200).json({
        status: "success",
    });
});

module.exports = {
    getAllViewerOfStory,
    createStoryViewer,
    updateStatusStoryViewer,
};
