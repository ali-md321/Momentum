const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : [true,"username is required!!"],
        unique : [true,"Username already exists!!"],
        match: [/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores!!'],
        minlength: [5,"username must be of min 5 characters!!"],
    },
    password : {
        type : String,
        required: [true, "Please enter password"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,30}$/,
            "Password must be 6–30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$)."
          ],
        minlength: [6, "Password must be of minimum 6 characters"],
    },
    email : {
        type : String,
        required : [true,"Email is Required!!"],
        unique : [true,"Email should be Unique!!"],
    },
    avatar: {
        url : {
            type: String,
            default : "https://res.cloudinary.com/djqk9esdt/image/upload/v1750918862/Default_DP.jpg"
        },
        filename : {
            type : String,
            default : "Default_DP"
        }
    },
    bio: {
        type: String,
        default: "Hi👋 Welcome To My Profile"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.getResetPasswordToken = async function() {

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);
