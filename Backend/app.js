const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { errorMiddleware } = require("./middlewares/errorMiddleware");

const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow access from this origin"));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",userRouter)
app.use("/api",postRouter)
app.use("/api",chatRouter)
app.use("/api",messageRouter)

app.use(errorMiddleware);
module.exports = app;
