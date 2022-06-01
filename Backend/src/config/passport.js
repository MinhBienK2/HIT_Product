// const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const { User } = require("../models");

const configPassport = (app, passport) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        //If using Mongoose with MongoDB; if other you will need JS specific to that schema.
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(null, false);
        }
    });
};

const configFacebookStrategy = (passport) => {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: process.env.FACEBOOK_APP_CALLBACKURL,
                profileFields: [
                    "id",
                    "photos",
                    "email",
                    "name",
                    "gender",
                    "birthday",
                    "profileUrl",
                    "friends",
                ],
                // enableProof: true,
            },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    const data = profile._json;
                    console.log(profile._json);
                    let user = await User.findOne({ facebookId: profile.id });
                    if (user) {
                        console.log("hello");
                        return cb(null, user);
                    }
                    if (!user) {
                        user = await new User({
                            facebookId: data.id,
                            firstName: data.first_name,
                            lastName: data.last_name,
                            gender: data.gender,
                            birthday: data.birthday,
                            email: data.email,
                        });
                        // User.collection.dropIndexes({ email_1: 1 });
                        // await User.syncIndexes();
                        await user.save({
                            validateBeforeSave: false,
                        });
                        // User.collection.createIndex({
                        //     email: 1,
                        //     unique: true,
                        // });
                        return cb(null, user);
                    }
                    return cb(null, false);
                } catch (error) {
                    cb(error);
                }
            }
        )
    );
};

module.exports = {
    configPassport,
    configFacebookStrategy,
};
