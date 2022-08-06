const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { sendMail } = require("./sendMail.service");
const paginate = require("../utils/paginate.util");
const { User, Friendship, Message } = require("../models");

const getAllFriendshipOfUser = CatchAsync(async (req, res, next) => {
    const listFriend = await Friendship.find({
        userId: req.user.id,
        status: "isFriend",
    });
    console.log(listFriend);
    res.status(200).json({
        status: "success",
        listFriend: listFriend,
    });
});

const getAllListConfirmFriendRequest = CatchAsync(async (req, res, next) => {
    const listFriend = await Friendship.find({
        // userId: req.user.id,
        friendId: req.user.id,
        status: "confirm",
    });
    res.status(200).json({
        status: "success",
        lisConfirmFriend: listFriend,
    });
});

const createFriendship = CatchAsync(async (req, res, next) => {
    const checkExistsOrNotExists = await Friendship.findOne({
        userId: req.user.id,
        friendId: req.params.friendId,
    });
    if (checkExistsOrNotExists) {
        return next(new ApiError("has Exists friend ! ", 400));
    }
    const friendship = await Friendship.create({
        userId: req.user.id,
        friendId: req.params.friendId,
        status: "confirm",
    });
    if (!friendship) {
        return next(new ApiError("create friendship error !", 400));
    }
    res.status(201).json({
        status: "success",
        message: "Send new friend request success !",
    });
});

const confirmNewFriendRequest = CatchAsync(async (req, res, next) => {
    const updateFriendship = await Friendship.findOneAndUpdate(
        {
            friendId: req.user.id,
            userId: req.params.friendId,
        },
        {
            status: "isFriend",
            createdAt: Date.now(),
        }
    );
    const friendship = await Friendship.create({
        userId: req.user.id,
        friendId: req.params.friendId,
        status: "isFriend",
    });
    res.status(200).json({
        status: "success",
        message: "update success !",
    });
});

const deleteFriend = CatchAsync(async (req, res, next) => {
    const deleteFriendOfUser = await Friendship.findOneAndDelete({
        friendId: req.params.friendId,
        userId: req.user.id,
    });
    const deleteFriendOfUser2 = await Friendship.findOneAndDelete({
        friendId: req.user.id,
        userId: req.params.friendId,
    });
    res.status(200).json({
        status: "success",
        message: "delete success",
    });
});

module.exports = {
    getAllFriendshipOfUser,
    getAllListConfirmFriendRequest,
    createFriendship,
    confirmNewFriendRequest,
    deleteFriend,
};
