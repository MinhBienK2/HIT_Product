const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please add a firstName"],
        },
        lastName: {
            type: String,
            required: [true, "Please add a lastName"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
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
        changePasswordAt: {
            type: Date,
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
        friendships: [mongoose.Schema.Types.ObjectId],
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });

const User = mongoose.model("Users", userSchema);

module.exports = User;