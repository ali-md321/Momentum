const redisClient = require("../config/redisConfig");

module.exports.getUser = async(userId) => {
    const user = await redisClient.get(`user:${userId}`);
    return user;
} 

module.exports.removeUser = async (userId) => {
    try {
        const result = await redisClient.del(`user:${userId}`);
        if (result === 1) {
            console.log(`Redis: user:${userId} removed`);
        } else {
            console.warn(`Redis: user:${userId} not found`);
        }
    } catch (err) {
        console.error(`Redis error when deleting user:${userId}`, err);
        throw err;
    }
};


