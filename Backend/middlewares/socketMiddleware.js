const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const redisClient = require("../config/redisConfig");

exports.intializeUser = async (socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) return next(new ErrorHandler("No cookie", 400));
  
      const parsed = cookie.parse(cookies);
      const token = parsed.token;
      if (!token) return next(new ErrorHandler("No Token", 400));
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      socket.userId = userId;
  
      try {
        await redisClient.set(`user:${userId}`, socket.id);
      } catch (redisErr) {
        console.error("❌ Redis error while setting user:", redisErr);
        return next(new ErrorHandler("Redis error", 500));
      }
      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      return next(new ErrorHandler("Invalid Token", 400));
    }
  };
  