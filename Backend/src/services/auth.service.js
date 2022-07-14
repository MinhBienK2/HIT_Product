const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET_IN, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

const responseToken = (user, status, req, res) => {
   const token = createToken(user.id);
   res.cookie("jwt", token, {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      //   secure: false,
   });
   res.status(status).json({
      status: "success",
      token,
      data: user,
   });
};

module.exports = {
   createToken,
   responseToken,
};
