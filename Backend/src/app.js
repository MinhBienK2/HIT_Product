const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const hpp = require("hpp");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const ApiError = require("./utils/ApiError");
const handleError = require("./middlewares/error.middleware");
const morgan = require("./config/morgan");
const configPP = require("./config/passport");
const routers = require("./routes/v1");

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
    windowMs: 1 * 60 * 1000, // 15 minutes
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
        origin: process.env.APP_NODE_BACKEND_URL, // khong duoc de *
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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

//config passport
configPP.configPassport(app, passport);
configPP.configFacebookStrategy(passport);

// v1 api routes
routers(app)

// handle not foud
app.all("*", (req, res, next) => {
    next(
        new ApiError(`Can not find ${req.originalUrl} on this server ! `, 404)
    );
});
//handle error
app.use(handleError);

module.exports = app;
