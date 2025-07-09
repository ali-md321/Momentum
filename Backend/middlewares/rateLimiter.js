const redisClient = require("../config/redisConfig");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("./catchAsync");

exports.rateLimiter = (NoOfReqs,timeLimit) => catchAsync(async(req,res,next) => {
    const ip = req.connection.remoteAddress;
    const [response] = await redisClient.multi().incr(ip).expire(ip,timeLimit).exec();
    console.log("Req No in a Min : ",response[1]);
    if(response[1] > NoOfReqs){
        throw new ErrorHandler("Too many requests! Try after some time..",405)
    }
    next();
}) 