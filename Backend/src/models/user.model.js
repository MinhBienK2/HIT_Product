const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const path = require("path");
const { sendMail } = require("../services/sendMail.service");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please add a firstName"],
        },
        lastName: {
            type: String,
            required: [true, "Please add a lastName"],
        },
        name: {
            type: String,
            default: function () {
                return `${this.firstName} ${this.lastName}`;
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
            sparse: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "Invalid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
            validate: [validator.isStrongPassword, "invalid Password"],
        },
        confirmPassword: {
            type: String,
            required: [true, "Confirm password is required"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Password and confirm password must be the same",
            },
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        activeState: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "States",
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: validator.isMobilePhone,
                message: (props) =>
                    `${props.value} is not a valid phone number!`,
            },
            // validate: [validator.isMobilePhone, "is not a valid phone number!"],
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        avatar: {
            type: String,
            default: "default.jpng",
        },
        banner: {
            type: String,
            default: "",
        },
        birthday: {
            type: Date,
        },
        relationship: {
            type: String,
        },
        statusHomeTown: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
        city: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        companyName: {
            type: String,
        },
        position: {
            type: String,
        },
        schoolName: {
            type: String,
        },
        majoy: String,
        facebookId: String,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        changePasswordAt: Date,
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: "activeState",
    });
    next();
});

// userSchema.virtual('name').get(function() {
//         return this.firstName + ' ' + this.lastName;
//     })
// .set(function(v) {
//     this.firstName = v.substr(0, v.indexOf(' '));
//     this.lastName= v.substr(v.indexOf(' ') + 1);
// });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    return this;
});

userSchema.methods.correctPassword = async function (
    password,
    comparePassword
) {
    return await bcrypt.compare(password, comparePassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.changePasswordAt) {
        const changeTimestamp = parseInt(
            this.changePasswordAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changeTimestamp;
    }
    return false;
};

userSchema.methods.autoSendBirthday = async function () {
    try {
        const html = await ejs.renderFile(
            path.join(__dirname, `/../views/emails/sendBirthday.ejs`),
            {
                name: `${this.firstName} ${this.lastName}`,
                avatar: this.avatar,
            }
        );
        if (!this.email) return;
        sendMail({
            from: `GARRICK`,
            to: this.email,
            subject: "happe birthday",
            html,
        });
    } catch (err) {
        console.log(err);
    }
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
