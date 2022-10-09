const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { State, User } = require("../models");
const { featureCRUDService } = require("../services");
const { watchService } = require("../services");

// CRUD Post
const updateStateIsActive = CatchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);
    if (!user) {
        return next(new ApiError("user not exists !"), 401);
    }
    await State.findByIdAndUpdate(user.activeState, {
        state: true,
    });
    res.status(200).json({
        status: "success",
    });
});

const updateStateIsNotActive = CatchAsync(async (req, res, next) => {
    const user = await User.findById(req.body.userID);
    if (!user) {
        return next(new ApiError("user not exists !"), 401);
    }
    await State.findByIdAndUpdate(user.activeState, {
        state: false,
    });
    res.status(200).json({
        status: "success",
    });
});

module.exports = { updateStateIsActive, updateStateIsNotActive };
