const { notificationService } = require("../services");
const { Notification } = require("../models");
const { State, User } = require("../models");

class socketServer {
    connectSocket(io) {
        try {
            io.on("connection", (socket) => {
                socket.emit("connection", null);
                console.log("new user connected: ", socket.id);

                socket.on("disconnect", (userId) => {
                    // console.log(userId, "helo");
                    console.log("Disconnected - " + socket.id);
                    socket.emit("disjoinRoomMyId", "huy");
                });
                socket.on("hello", (data) => {
                    console.log(data);
                });

                socket.on("joinRoomByMyId", (userId) => {
                    socket.join(userId);
                });

                socket.on("chatJoin", async (room, userId) => {
                    if (userId) {
                        const notification = await Notification.findOne({
                            messageId: room,
                            friendId: userId,
                        });
                        if (!notification) return;
                        notification.statusRead = true;
                        notification.countMessageSended = 0;
                        await notification.save();
                        socket.broadcast
                            .to(room)
                            .emit("updateNotificationRead", {
                                statusRead: true,
                                countMessageSended: 0,
                            });
                    }
                    socket.join(room);
                });

                socket.on("chatLeave", (room) => {
                    socket.leave(room);
                });

                socket.on("chatView", (data) => {
                    console.log(data)
                    socket.join(data.room);
                    io.in(data.room).emit("chatViewed", data);
                    // io.to(data.room).emit("chatViewed", data);
                    socket.leave(data.room);
                });

                socket.on("notificationView", (data) => {
                    socket.join(data.room);
                    socket.broadcast
                        .to(data.room)
                        .emit("notificationViewed", data);
                });

                socket.on("callVideo", (data) => {
                    socket.join(data.friendId);
                    socket.broadcast.to(data.friendId).emit("videoCalled", {
                        ...data,
                        isVideoCall: true,
                    });
                });

                socket.on("sendPeerIdToFriend", (data) => {
                    socket.broadcast
                        .to(data.room)
                        .emit("sendPeerIdToReceiver", data.peerId);
                });

                socket.on("sendComment", (data) => {
                    // console.log(data);
                    io.emit("sendedComment", data.data);
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = socketServer;
