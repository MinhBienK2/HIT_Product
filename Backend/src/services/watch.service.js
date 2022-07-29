const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { Post, Friendship } = require("../models");
const { streamVideo } = require("../config/ffmpeg");
const fsService = require("./fs.service");

const getAllVideoWithUser = CatchAsync(async (req, res, next) => {
    const friend = await Friendship.findOne({
        userId: req.user.id,
    });
    if (!friend) {
        next(new ApiError(`${friend} not found`, 404));
    }
    const allVideo = await Promise.all(
        friend.friends
            // .map(async (ele) => {
            //     return await Post.find({
            //         author: ele.friendId,
            //         videos: { $exists: true, $not: { $size: 0 } },
            //     });
            // })
            .map(async (ele) => {
                console.log(ele);
                return await Post.aggregate([
                    {
                        $match: {
                            author: ele.friendId._id,
                            videos: { $exists: true, $not: { $size: 0 } },
                        },
                    },
                    { $unwind: "$videos" },
                    {
                        $lookup: {
                            from: "users",
                            localField: "author",
                            foreignField: "_id",
                            as: "author",
                        },
                    },
                ]);
            })
            .map(async (ele) => {
                return await ele;
            })
    );

    let allVideos = [];
    allVideo.forEach((ele) => {
        ele.forEach((eles) => {
            allVideos.push(eles);
        });
    });
    //  console.log(allVideos);
    allVideos.sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        else if (a.createdAt < b.createdAt) return -1;
        else return 0;
    });

    const limit = req.query.limit * 1 || 2;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;
    const filterVideos = allVideos.slice(skip, limit + skip);

    res.status(200).json({
        status: "success",
        listVideos: filterVideos,
    });
});

module.exports = {
    getAllVideoWithUser,
};
