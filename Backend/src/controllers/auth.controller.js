const CatchAsync = require("../utils/CatchAsync");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const { authService } = require("../services");
const { sendMail } = require("../services/sendMail.service");
const { Friendship, Message } = require("../models");

const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path");

const signup = CatchAsync(async (req, res, next) => {
   const user = await User.create(req.body);
   if (!user) return next(new ApiError("signup not success", 401));
   //auto create list friend
   await Friendship.create({
      userId: user.id,
   });
   // auto create list message
   await Message.create({
      userId: user.id,
   });
   const text = `Webcom to GARRICK !`;
   sendMail({
      from: "GARRICK",
      to: user.email,
      subject: `Signup`,
      text: text,
   });
   authService.responseToken(user, 200, req, res);
});

const login = CatchAsync(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password)
      return next(new ApiError("not valid email or password ", 400));
   const user = await User.findOne({ email }).select("+password");
   if (!user) {
      return next(new ApiError("email or password not exists ", 400));
   }
   if (!(await user.correctPassword(password, user.password)))
      return next(new ApiError("email or password not exists ", 400));
   authService.responseToken(user, 200, req, res);
});

const logout = CatchAsync(async (req, res, next) => {
   // req.logout();
   if (req.session)
      req.session.destroy(function (err) {
         console.log(err);
      });
   res.cookie("jwt", "khongco", {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
   });
   res.status(200).json({
      status: "success",
   });
});

const forgottenPassword = CatchAsync(async (req, res, next) => {
   if (!req.body.email)
      return next(new ApiError("email empty ! please enter email", 400));
   const user = await User.findOne(req.body);
   if (!user) return next(new ApiError("Email not exists !", 400));
   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_IN, {
      expiresIn: "10m",
   });
   user.resetPasswordToken = token;
   user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
   await user.save({ validateBeforeSave: false });
   const html = await ejs.renderFile(
      path.join(__dirname, `/../views/emails/sendForgotPassword.ejs`),
      {
         name: `${user.firstName} ${user.lastName}`,
         avatar: user.avatar,
         token,
      }
   );
   try {
      await sendMail({
         from: `GARRICK`,
         to: user.email,
         subject: `confirm passport`,
         html,
      });
   } catch (err) {
      console.log(err);
   }
   res.status(200).json({
      status: "success",
   });
});

const confirmPassword = CatchAsync(async (req, res, next) => {
   const encodeToken = await jwt.verify(
      req.params.tokenId,
      process.env.JWT_SECRET_IN
   );
   if (!encodeToken)
      return next(new ApiError("token has not exists or exprire !", 400));
   const user = await User.findOne({
      _id: encodeToken.id,
      resetPasswordToken: req.params.tokenId,
      resetPasswordExpire: { $gt: Date.now() },
   });
   if (!user) return next(new ApiError("account not exists !", 400));
   user.password = req.body.password;
   user.confirmPassword = req.body.confirmPassword;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;
   await user.save();
   authService.responseToken(user, 200, req, res);
});

module.exports = {
   signup,
   login,
   logout,
   forgottenPassword,
   confirmPassword,
};
