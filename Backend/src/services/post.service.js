const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { Post, Friendship } = require("../models");
const { streamVideo } = require("../config/ffmpeg");
const fsService = require("../services/fs.service");

const getAllPostRelatedWithUser = CatchAsync(async (req, res, next) => {
    let allPosts = [];
    let arrayListUserId = [];
    const friend = await Friendship.find({
        status: "isFriend",
        userId: req.user.id,
    });
    console.log(friend);
    if (friend.length !== 0) {
        const allPost = await Promise.all(
            friend
                .map(async (ele) => {
                    if (!arrayListUserId.includes(ele.friendId.id)) {
                        arrayListUserId.push(ele.friendId.id);
                        return await Post.find({
                            author: ele.friendId.id,
                        });
                    }
                })
                .map(async (ele2) => {
                    // console.log(ele2);
                    return await ele2;
                })
        );
        allPost.forEach((ele) => {
            // console.log(ele);
            if (ele) {
                ele.forEach((ele2) => {
                    allPosts.push(ele2);
                });
            }
        });
        const postOfMe = await Post.find({
            author: req.user.id,
        });
        // console.log("hello", postOfMe);
        postOfMe.forEach((ele) => {
            allPosts.push(ele);
        });
    } else {
        const postOfMe = await Post.find({
            author: req.user.id,
        });
        // console.log("hello", postOfMe);
        postOfMe.forEach((ele) => {
            allPosts.push(ele);
        });
    }

    if (allPosts.length === 0) {
        return res.status(404).json({
            status: "success",
            message: "not posst",
        });
    }
    //  console.log(allPosts);
    allPosts.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        else if (a.createdAt < b.createdAt) return 1;
        else return 0;
    });

    const limit = req.query.limit * 1 || 8;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;
    const filterPosts = allPosts.slice(skip, limit + skip);

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
    // console.log(req.body.photos);
    let data;
    const files = req.files.photos;
    const filenames = files
        ? files.map(
              (file) =>
                  `process.env.APP_NODE_BACKEND_URL/images/${file.fieldname}/${file.filename}`
          )
        : [];
    const fileVideos = req.files.videos;
    const filenameVideos = fileVideos
        ? fileVideos.map(
              (file) =>
                  `process.env.APP_NODE_BACKEND_URL/videos/posts/${
                      file.filename.split(".")[0]
                  }/${file.filename}`
          )
        : [];
    if (fileVideos) {
        streamVideo(fileVideos);
        setTimeout(() => {
            fileVideos.forEach((ele) => {
                fsService.deleteFile(ele.filename);
            });
        }, 10000);
    }
    data = await Post.create({
        description: req.body.description,
        shareOf: req.body.shareOf,
        author: req.user._id,
        photos: filenames,
        videos: filenameVideos,
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
