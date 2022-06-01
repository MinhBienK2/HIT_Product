const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
