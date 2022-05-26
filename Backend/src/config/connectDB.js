const mongoose = require("mongoose");

const logger = require("./logger");

const mogodb = process.env.MONGODB_URL.replace(
    `<username>`,
    process.env.MONGODB_USERNAME
).replace(`<password>`, process.env.MONGODB_PASSWORD);

const connectDB = () => {
    mongoose
        .connect(mogodb, {
            useNewUrlParser: true,
        })
        .then(() => {
            logger.info("Connected to database success !");
        })
        .catch((err) => {
            logger.error(err);
        });
};

module.exports = connectDB;
