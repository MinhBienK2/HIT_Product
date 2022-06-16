const CatchAsync = require("../utils/CatchAsync");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const protect = CatchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) return next(new ApiError("You are not logged in", 401));
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_IN);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser)
        return next(
            new ApiError(
                "the user belonging to this token dose no longer exist",
                401
            )
        );
    if (freshUser.changePasswordAfter(decoded.iat)) {
        return next(
            new ApiError(
                "User recently changed password, Please login again",
                401
            )
        );
    }
    req.user = freshUser;
    next();
});

const restrict = (...role) =>
    CatchAsync(async (req, res, next) => {
        // console.log(role);
        const trict = role.includes(req.user.role);
        if (!trict)
            return next(new ApiError('User does not have permission!', 400));
        next();
    });

const isLoggedIn = CatchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        console.log(req.cookies.jwt);
        const user = await User.findOne({});
    }
});

module.exports = {
    protect,
    restrict,
    isLoggedIn,
};
