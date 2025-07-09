import { Redis } from '@upstash/redis'
const redisClient = new Redis({
  url: 'https://master-cougar-56784.upstash.io',
  token: process.env.REDIS_URL,
})
module.exports = redisClient;
