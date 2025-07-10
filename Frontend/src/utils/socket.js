// frontend/src/utils/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = (userId) => {
  if (!socket) {
    socket = io("https://momentum-s326.onrender.com", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      if (userId) {
        socket.emit("addUser", userId); 
      }
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};
