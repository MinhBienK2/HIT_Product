const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const reactionRoute = require("./reaction.route");
const authRoute = require("./auth.route");
const friendshipRoute = require("./friendship.route");
const messageRoute = require("./message.route");
const notificationRoute = require("./notification.route");
const storyRoute = require("./story.route");
const storyViewerRoute = require("./storyViewer.route");
const callVideoRoute = require("./callVideo.route");
const watchRoute = require("./watch.route");
const stateRoute = require("./state.route");

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
        path: "/api/v1/friends",
        route: friendshipRoute,
    },
    {
        path: "/api/v1/messages",
        route: messageRoute,
    },
    {
        path: "/api/v1/notifications",
        route: notificationRoute,
    },
    {
        path: "/api/v1/stories",
        route: storyRoute,
    },
    {
        path: "/api/v1/stories-viewer",
        route: storyViewerRoute,
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
    {
        path: "/api/v1/call-video",
        route: callVideoRoute,
    },
    {
        path: "/api/v1/watch",
        route: watchRoute,
    },
    {
        path: "/api/v1/state",
        route: stateRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
