const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Post } = require("../models");
const { featureCRUDService } = require("../services");

// CRUD Post
const getAllPosts = featureCRUDService.getAllModel(Post);
const getPost = featureCRUDService.getModel(Post);
const createPost = featureCRUDService.createModel(Post);
const updatePost = featureCRUDService.updateModel(Post);
const deletePost = featureCRUDService.deleteModel(Post);

// get all post of any user
const getPostOf = CatchAsync(async (req, res, next) => {
    const data = await Post.find({ author: req.params.id });
    if (!data) {
        next(new ApiError('Post not found', 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

// get all post of friend
// const getPostOfFriend

// get outstanding post
// const getOutstandingPost

// get new post
// const getNewPost

module.exports = { getAllPosts, getPost, getPostOf, createPost, updatePost, deletePost };
