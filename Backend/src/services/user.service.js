const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const paginate = require("../utils/paginate.util");
const { User, Friendship } = require("../models");

const getListUserMakeFriend = CatchAsync(async (req, res, next) => {
    let uncludeUserId = [];
    const allListUser = await User.find({});
    const allListFriendship = await Friendship.find({
        friendId: req.user.id,
        status: "isFriend",
    });
    allListFriendship.forEach((ele) => {
        if (!uncludeUserId.includes(ele.userId.id)) {
            // console.log(uncludeUserId.includes(ele.userId.id));
            uncludeUserId.push(ele.userId.id);
        }
    });
    uncludeUserId.push(req.user.id);
    // console.log(uncludeUserId);
    const userFileter = allListUser.filter((ele) => {
        return !uncludeUserId.includes(ele.id);
    });

    res.status(200).json({
        status: "success",
        listUserMakeFriend: userFileter,
    });
});

const updateUserFromLocal = CatchAsync(async (req, res, next) => {
    const user = await User.findOne({
        id: req.user.id,
    });
    res.status(200).json({
        status: "success",
        updateUserLocal: user,
    });
});

module.exports = {
    getListUserMakeFriend,
    updateUserFromLocal,
};
