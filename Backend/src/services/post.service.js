const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { Post, Friendship } = require("../models");

const getAllPostRelatedWithUser = CatchAsync(async (req, res, next) => {
    const friend = await Friendship.findOne({
        userId: req.user.id,
    });
    if (!friend) {
        next(new ApiError(`${friend} not found`, 404));
    }
    const allPost = await Promise.all(
        friend.friends
            .map(async (ele) => {
                return await Post.find({ author: ele.friendId });
            })
            .map(async (ele) => {
                return await ele;
            })
    );
    let allPosts = [];
    allPost.forEach((ele) => {
        ele.forEach((eles) => {
            allPosts.push(eles);
        });
    });
    //  console.log(allPosts);
    allPosts.sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        else if (a.createdAt < b.createdAt) return -1;
        else return 0;
    });
    
    const limit = req.query.limit * 1 || 20;
      const page = req.query.page * 1 || 1;
      const skip = (page - 1) * limit;
      const filterPosts =allPosts.slice(skip,limit+skip)

    res.status(200).json({
        status: "success",
        listPosts: filterPosts,
    });
});

// get all post of any user
const getPostOf = CatchAsync(async (req, res, next) => {
    const data = await Post.find({ author: req.params.id });
    if (!data) {
        next(new ApiError("Post not found", 404));
    }
    res.status(200).json({
        status: "success",
        data,
    });
});

const createPost = CatchAsync(async (req, res, next) => {
    console.log(req.body.photos)
    let data;
    const files = req.files.photos;
    const filenames = files ? files.map((file) => `http://localhost:3000/images/${file.fieldname}/${file.filename}`) : "";
    data = await Post.create({
        description: req.body.description,
        shareOf: req.body.shareOf,
        author: req.user._id,
        photos: filenames,
    });
    if (!data) {
        next(new ApiError(`create fail`, 404));
    }
    res.status(200).json({
        status: "success",
        post: data,
    });
});

const updatePost = CatchAsync(async (req, res, next) => {
    let data;
    const files = req.files.photos;
    const filenames = files ? files.map((file) => file.filename) : "";
    data = await Post.findById(req.params.id);
    data.description = req.body.description;
    if (filenames) {
        data.photos = filenames;
    }
    await data.save();
    if (!data) {
        next(new ApiError(`update fail`, 404));
    }
    res.status(200).json({
        status: "success",
        post: data,
    });
});

module.exports = {
    getAllPostRelatedWithUser,
    getPostOf,
    createPost,
    updatePost,
};
