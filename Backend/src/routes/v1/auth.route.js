const express = require("express");
const router = express.Router();
const passport = require("passport");

const { authController } = require("../../controllers");

router.post("/signup", authController.signup);
//login core
router.post("/login", authController.login);

//login with facebook
router.get(
   "/auth/facebook",
   passport.authenticate("facebook", {
      // authType: "reauthenticate",
      // scope: ["user_friends", "user_gender", "email"],
      scope: ["user_gender", "email"],
   })
);

router.get(
   "/auth/facebook/callback",
   passport.authenticate("facebook", { failureRedirect: "/login" }),
   function (req, res) {
      res.redirect("/");
   }
);

router.get("/logout", authController.logout);

router.post("/forgot-password", authController.forgottenPassword);
router.patch("/confirm-password/:tokenId", authController.confirmPassword);

module.exports = router;
