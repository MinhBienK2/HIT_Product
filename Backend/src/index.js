const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/connectDB");
const logger = require("./config/logger");
const autoSendBirthday = require("./helpers/autoSendBirthday.helper");
const { set } = require("mongoose");
const socketServer = require("./utils/socker.io");

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

new socketServer().connectSocket(io);

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

// const httpStatus = require("http-status");
//console.log(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
