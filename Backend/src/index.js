const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/connectDB");
const logger = require("./config/logger");
const autoSendBirthday = require("./helpers/autoSendBirthday.helper");
const { set } = require("mongoose");

const { notificationService } = require("./services");
const { Notification } = require("./models");

// let server;
const port = process.env.PORT || 3000;

connectDB();
autoSendBirthday();

//soket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let roomdef;
io.on("connection", (socket) => {
    socket.emit("connection", null);
    console.log("new user connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("Disconnected - " + socket.id);
    });

    socket.on("chatJoin", async (room, userId) => {
        try {
            console.log("room", room, "userId", userId);
            if (userId) {
                console.log("hello");
                const notification = await Notification.findOne({
                    messageId: room,
                    friendId: userId,
                });
                if (!notification) return;
                notification.statusRead = true;
                notification.countMessageSended = 0;
                await notification.save();
                io.broadcast.to(room).emit("updateNotificationReaded", {
                    statusRead: true,
                    countMessageSended: 0,
                });
            }
            socket.join(room);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("chatLeave", (room) => {
        try {
            socket.leave(room);
        } catch (e) {
            console.log("[error]", "leave room :", e);
        }
    });

    socket.on("chatView", (data) => {
        socket.join(data.room);
        io.in(data.room).emit("chatViewed", data);
        // io.to(data.room).emit("chatViewed", data);
    });

    socket.on("notificationView", (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit("notificationViewed", data);
    });
});

server.listen(port, () => {
    logger.info("Server is running on port " + port);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});

// const { User } = require("./models");
// User.create({
//     firstName: "pham",
//     lastName: "bien",
//     email: "pham1@gmail.com",
//     password: "Phambsdd123@",
//     confirmPassword: "Phambsdd123@",
//     phoneNumber: "89080340954a",
// });

// const httpStatus = require("http-status");
// console.log(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
