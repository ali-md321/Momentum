const User = require("../models/userModel");
const Post = require("../models/postModel");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require('cloudinary').v2;
const { sendCookie, deleteCookie } = require("../utils/cookieManage");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

module.exports.userSignUp = catchAsync(async (req, res) => {
  let { name, username, email, password, bio } = req.body;
  if (bio === "") bio = undefined;

  let avatarUrl, avatarFilename;

  // Upload image only if present
  if (req.file) {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'Momentum_avatar_DEV',
            resource_type: 'image',
            allowedFormats: ['png','jpg','jpeg','webp'],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await streamUpload();
    avatarUrl = result.secure_url;
    avatarFilename = result.public_id;
  }
  const regUser = new User({
    name,
    username,
    password,
    email,
    bio,
    avatar: { url: avatarUrl, filename: avatarFilename },
  });

  await regUser.save();

  sendCookie(regUser, 201, res);
});


module.exports.userLogin = catchAsync(async(req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({
        $or: [{ email: email }, { username: email }]
    });

    if (!user) {
        throw new ErrorHandler("Invalid Username/email", 404);
    }

    const isMatch = await user.comparePassword(password); // ensure comparePassword is async

    if (!isMatch) {
        throw new ErrorHandler("Password is incorrect", 400);
    }

    
    sendCookie(user,201,res);
})

module.exports.userLogOut = catchAsync(async(req, res) => {
    deleteCookie(200,res);
})

module.exports.getUserDetailsController = catchAsync(async(req,res) => {
    let {id} = req.params;
    let user,posts;
    if(id == "me"){
        id = req.userId;
    }
    user = await User.findById(id).populate("following").populate("followers")
                                  .populate("posts","_id image")
                                  .populate("saved","_id image"); 
    res.status(200).json({
            userDetails : user, 
        });
})
    
exports.followUserController = catchAsync(async(req,res) => {
  let userId = req.userId;
  let {id : followId} = req.params;

  if (userId === followId) {
    throw new ErrorHandler("You cannot follow yourself", 400);
  }
  const currUser = await User.findById(userId);
  const followUser = await User.findById(followId);

  if (!currUser || !followUser) {
    throw new ErrorHandler("User not found", 404);
  }
  isFollowing = currUser.following.includes(followId);
  if(isFollowing){
    currUser.following = currUser.following.filter(id => id.toString() != followId)
    followUser.followers = followUser.followers.filter(id => id.toString() != userId)
  }else{
    currUser.following.push(followUser);
    followUser.followers.push(currUser);
  }
  await currUser.save({ validateBeforeSave: false });
  await followUser.save({ validateBeforeSave: false });

  res.status(200).json({
    message : isFollowing ? "User unfollowed!!" : "user Followed!!",
    user : currUser
  })
})

module.exports.searchUserController = catchAsync(async(req,res) => {
  let {username} = req.params;

  const searchUsers = await User.find({
    username: { $regex: `^${username}`, $options: 'i' },
  }).select('username name avatar');

  res.json({
    message : "Searched Users!!",
    searchUsers : searchUsers
  })
})

module.exports.editUserController = catchAsync(async (req,res) => {
  const userId = req.userId;
  let user;
  let { name, username, email, password, bio, prevFilename } = req.body;
  let avatarUrl, avatarFilename;

  if (req.file ) {
    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'Momentum_avatar_DEV',
            resource_type: 'image',
            allowedFormats: ['png','jpg','jpeg','webp'],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

    const result = await streamUpload();
    avatarUrl = result.secure_url;
    avatarFilename = result.public_id;
    if(prevFilename != "Default_DP"){
      cloudinary.uploader
      .destroy(prevFilename)
    }
    user = await User.findByIdAndUpdate(userId,{name, username, email, password, bio,avatar : {url:avatarUrl,filename:avatarFilename}},{new : true})
  }else{
    user = await User.findByIdAndUpdate(userId,{name, username, email, password, bio},{new : true})
  }
  
  res.json({
    message : "user Edited!!",
    user : user
  })
})


module.exports.forgotPasswordController = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ErrorHandler("User Not Found", 404);
  }

  const resetPasswordToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetPasswordToken}`;

  try {
    await sendEmail({
      email: user.email,
      templateId: process.env.SENDGRID_RESET_TEMPLATEID,
      data: {
        username: user.username,
        reset_url: resetPasswordUrl,
      },
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ErrorHandler("Failed to send email. " + error.message, 500);
  }
});


module.exports.resetPasswordController = catchAsync(async(req,res) =>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() }
  });

  if(!user) {
    throw new ErrorHandler("User Not Found", 404);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save({ validateBeforeSave: false });
})
