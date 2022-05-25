if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config();
}
import express from "express";
import bodyParser from "body-parser";

const ApiError = require("./utils/ApiError");
const handleError = require("./middlewares/error.middleware");
const morgan = require("./config/morgan");
const routes = require("./routes/v1");

const app = express();
//morgan
app.use(morgan.successHandle);
app.use(morgan.errorHandle);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// v1 api routes
app.use("/api/v1", routes);

// handle not foud
app.all("*", (req, res, next) => {
    next(
        new ApiError(`Can not find ${req.originalUrl} on this server ! `, 404)
    );
});
//handle error
app.use(handleError);

module.exports = app;
