if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config();
}

import express from "express";
import bodyParser from "body-parser";
const cookieParser = require("cookie-parser");
var session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var xss = require("xss-clean");
var compression = require("compression");
var hpp = require("hpp");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const ApiError = require("./utils/ApiError");
const handleError = require("./middlewares/error.middleware");
const morgan = require("./config/morgan");
const routes = require("./routes/v1");
const configPP = require("./config/passport");
const { User } = require("./models");
const app = express();

// This disables the `contentSecurityPolicy` middleware but keeps the rest.
app.use(
    helmet({
        // contentSecurityPolicy: false,
        // crossOriginResourcePolicy: false,
    })
);

// cors link image
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// limit request from same API;
const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    windowMs: 5 * 60 * 1000, // 15 minutes
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);

app.use(hpp());
// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// app.use(cors());

// compress all responses
app.use(compression());

//morgan
app.use(morgan.successHandle);
app.use(morgan.errorHandle);

//auto send birday with mail
app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: process.env.SESSION_SECRET_IN,
        resave: true,
        saveUninitialized: true,
        // cookie: {
        //     expires: new Date(
        //         Date.now() +
        //             process.env.SESSION_EXPIRES_IN * 24 * 60 * 60 * 1000
        //     ),
        //     secure: true,
        // },
    })
);

// pass cors
app.use(
    cors({
        origin: "http://localhost:3001", // khong duoc de *
        credentials: true, // phai co de set-cookies
        // allowedHeaders: ["origin", "content-type", "accept"], // phai co
        // methods: ["post"],
        // origin: true,
        // crossOriginResourcePolicy: 'same-origin'
    })
);
//setup cookie
app.use(cookieParser());

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //false

app.use(express.static(path.join(__dirname, "/public")));

//config passport
configPP.configPassport(app, passport);
configPP.configFacebookStrategy(passport);

// v1 api routes
app.use("/", routes);

app.get("/", (req, res) => {
    res.json({
        data: req.user,
    });
});

//test upload video
const upload = require("./config/multer");
const { streamStory } = require("./config/ffmpeg");
const fs = require("fs");

app.post("/upload-videos", upload.uploadStory, (req, res, next) => {
    // console.log(req.files.videos);
    // if (req.files.videos.mimetype.startsWith("video"))
    //    streamVideo(req.files.videos);
    console.log(req.file);
    if (req.file.mimetype.startsWith("video")) streamStory(req.file);
    res.json({
        hello: "hello",
    });
});

// handle not foud
app.all("*", (req, res, next) => {
    next(
        new ApiError(`Can not find ${req.originalUrl} on this server ! `, 404)
    );
});
//handle error
app.use(handleError);

module.exports = app;
