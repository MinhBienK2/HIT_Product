const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { Notification } = require("../models");

const getStatuOfMessage = CatchAsync(async (req, res, next) => {
    const notification = await Notification.findOne({
        messageId: req.params.messageId,
        friendId: req.params.friendId,
        // statusRead: false,
    });
    // console.log(notification);
    res.status(200).json({
        status: "success",
        data: notification,
    });
});

const createNotification = CatchAsync(async (req, res, next) => {
    const check = await Notification.findOne({
        messageId: req.params.messageId,
        friendId: req.params.friendId,
    });
    if (check) return next(new ApiError("notificaltion has exists !", 400));
    const notification = await Notification.create({
        messageId: req.params.messageId,
        friendId: req.params.friendId,
    });
    res.status(200).json({
        status: "success",
        data: notification,
    });
});

const modifyStatusOfMessageIsRead = CatchAsync(async (req, res, next) => {
    const notification = await Notification.findOne({
        messageId: req.params.messageId,
        friendId: req.params.friendId,
    });
    notification.statusRead = true;
    notification.countMessageSended = 0;
    await notification.save();
    // console.log(notification);
    res.status(200).json({
        status: "success",
        data: notification,
    });
});
const modifyStatusOfMessageIsUnread = CatchAsync(async (req, res, next) => {
    // console.log(req.params.friendId.split('"'));
    const notification = await Notification.findOne({
        messageId: req.params.messageId,
        // friendId: req.params.friendId.split('"')[1],
        friendId: req.params.friendId,
    });

    // console.log(notification);
    notification.statusRead = false;
    notification.countMessageSended = notification.countMessageSended + 1;
    await notification.save();
    res.status(200).json({
        status: "success",
    });
});

const deleteNotification = CatchAsync(async (req, res, next) => {
    const notification = await Notification.findOneAndDelete({
        messageId: req.params.messageId,
        friendId: req.params.friendId,
    });
    if (!notification)
        return next(new ApiError("not delete notification !", 400));
    res.status(200).json({
        status: "success",
        data: notification,
    });
});

module.exports = {
    getStatuOfMessage,
    createNotification,
    modifyStatusOfMessageIsRead,
    modifyStatusOfMessageIsUnread,
    deleteNotification,
};
