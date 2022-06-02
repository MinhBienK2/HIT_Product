const app = require("./app");
const connectDB = require("./config/connectDB");
const logger = require("./config/logger");
const autoSendBirthday = require("./helpers/autoSendBirthday.helper");

let server;
const port = process.env.PORT || 3000;

connectDB();
autoSendBirthday();

app.listen(port, () => {
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
