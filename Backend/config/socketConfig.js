const redisClient = require("./redisConfig");

let io;

const configureSocket = (server) => {
  const socketIO = require('socket.io')(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io = socketIO;

  socketIO.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("addUser", async (userId) => {
      if (userId) {
        await redisClient.set(`user:${userId}`, socket.id);
        const users = await redisClient.keys("user:*");
        console.log(users);
        socketIO.emit("getUsers", users.map(k => k.split(":")[1]));
      }
    });

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", async (msg) => {
      socket.to(msg.chatId).emit("getMessage", msg);
      const receiverSocketId = await redisClient.get(`user:${msg.receiverId}`);
      if (receiverSocketId) {
        socketIO.to(receiverSocketId).emit("getMessage", msg);
      }
    });

    socket.on("typing", async ({ senderId, receiverId, chatId }) => {
      const receiverSocketId = await redisClient.get(`user:${receiverId}`);
      if (receiverSocketId) {
        socketIO.to(receiverSocketId).emit("typing", { chatId });
      }
    });

    socket.on("typing stop", async ({ senderId, receiverId, chatId }) => {
      const receiverSocketId = await redisClient.get(`user:${receiverId}`);
      if (receiverSocketId) {
        socketIO.to(receiverSocketId).emit("stopTyping", { chatId });
      }
    });

    socket.on("disconnect", async () => {
      const keys = await redisClient.keys("user:*");
      for (const key of keys) {
        const value = await redisClient.get(key);
        if (value === socket.id) {
          await redisClient.del(key);
        }
      }
      const users = await redisClient.keys("user:*");
      socketIO.emit("getUsers", users.map(k => k.split(":")[1]));
    });
  });
};

module.exports = { configureSocket };
