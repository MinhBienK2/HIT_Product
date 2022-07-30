const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Post } = require("../models");
const { featureCRUDService } = require("../services");
const { watchService } = require("../services");

// CRUD Post
const getAllVideoWithUser = watchService.getAllVideoWithUser;

module.exports = {
    getAllVideoWithUser,
};