const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const reactionRoute = require("./reaction.route");
const authRoute = require("./auth.route");
const { route } = require("./user.route");

const defaultRoutes = [
    {
        path: "/",
        route: authRoute,
    },
    {
        path: "/api/v1/users",
        route: userRoute,
    },
    {
        path: "/api/v1/posts",
        route: postRoute,
    },
    {
        path: "/api/v1/comments",
        route: commentRoute,
    },
    {
        path: "/api/v1/reactions",
        route: reactionRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
