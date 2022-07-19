const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Post } = require("../models");
const { featureCRUDService } = require("../services");
const { postService } = require("../services");

// CRUD Post
const getAllPosts = featureCRUDService.getAllModel(Post);
const getPost = featureCRUDService.getModel(Post);
const createPost = postService.createPost;
const updatePost = postService.updatePost;
const deletePost = featureCRUDService.deleteModel(Post);
const getPostOf = postService.getPostOf;
const getAllPostRelatedWithUser = postService.getAllPostRelatedWithUser;

// get all post of friend
// const getPostOfFriend

// get outstanding post
// const getOutstandingPost

// get new post
// const getNewPost

module.exports = {
    getAllPosts,
    getPost,
    getPostOf,
    createPost,
    updatePost,
    deletePost,
    getAllPostRelatedWithUser,
};
