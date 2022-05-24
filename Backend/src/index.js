const app = require("./app");
const connectDB = require("./config/connectDB");

let server;
const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log("Server is running on port " + port);
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

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
        server.close();
    }
});
