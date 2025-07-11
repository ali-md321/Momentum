const ErrorHandler = require("../utils/errorhandler");
const { userJoiSchema, userEditJoiSchema, passwordJoiSchema} = require("../utils/joiSchema");
const catchAsync = require("./catchAsync");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

exports.validateUserSignUp = catchAsync(async(req,res,next) => {
    let result = userJoiSchema.validate(req.body);
    if(result.error){
        const errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ErrorHandler(errMsg,400)
    }
    else{
        let {email, username} = req.body;
        const user = await User.findOne({
            $or : [{email},{username}]
        })
        if(user){
            if(user.username == username){
                throw new ErrorHandler("username already exists",400);
            }else{
                throw new ErrorHandler("email already exists",400);
            }
        }else{
            next();
        }
    }

})

exports.validateUserEdit = catchAsync(async(req,res,next) => {
    let result = userEditJoiSchema.validate(req.body);
    if(result.error){
        const errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ErrorHandler(errMsg,400)
    }
    else{
        let {email, username} = req.body;
        const user = await User.findOne({
            $or : [{email},{username}]
        })
        
        if(user._id != req.userId){
            if(user.username == username){
                throw new ErrorHandler("username already exists",400);
            }else{
                throw new ErrorHandler("email already exists",400);
            }
        }else{
            next();
        }
    }

})


exports.validatePassword = catchAsync((req,res,next) => {
    let result = passwordJoiSchema.validate(req.body);
    if(result.error){
        const errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ErrorHandler(errMsg,400)
    }else{
        next();
    }
})