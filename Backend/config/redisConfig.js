const { Redis } = require('@upstash/redis');
const redisClient = new Redis({
  url: 'https://master-cougar-56784.upstash.io',
  token: process.env.REDIS_TOKEN,
})
module.exports = redisClient;
