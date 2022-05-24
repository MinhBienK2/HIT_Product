if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config();
    console.log(process.env.NODE_ENV);
}

import express from "express";
import bodyParser from "body-parser";

// const { userRoute } = require("./routes/v1");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
