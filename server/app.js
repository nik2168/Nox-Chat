const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { v4 } = require("uuid");
const cors = require("cors")
const cloudinary = require('cloudinary')

// routes import
const userRoutes = require("./routes/user.routes.js");
const chatRoutes = require("./routes/chat.routes.js");
const adminRoutes = require("./routes/admin.routes.js");

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
  credentials: true,

}))

// socket.io
const { Server } = require("socket.io");
const { NEW_MESSAGE, NEW_MESSAGE_ALERT } = require("./constants/events.js");
const Message = require("./models/message.model.js");
const server = createServer(app);
const io = new Server(server, {});
const userSocketIds = new Map(); // will map will id with socketId
// socket.io

dotenv.config({
  path: "./.env",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.name })
  .then(() => {
    console.log("Connected to database successfully!");

    server.listen(process.env.port, () => {
      console.log(
        `Sever is running at port: ${process.env.port} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db", err);
  });

  // cloudinary setup
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);

// instead of socket.handshake we can use socket middleware api to authenticate the connection
io.use((socket, next) => {});

// socket.io connection
io.on("connection", (socket) => {
  const user = {
    // will get all the users currently connected to socket
    // temp user
    _id: "sam123",
    name: "Sam",
  };

  userSocketIds.set(user._id.toString(), socket.id); // all the socket connected users are in this map

  console.log("a user connected", socket.id);
  console.log(userSocketIds);

  socket.on(NEW_MESSAGE, async ({ message, chatId, members }) => {
    // we got this data from frontend for each chat

    const messageForRealTime = {
      // this will be the message for real time chatting ...
      content: message,
      _id: v4(), // generate a random _id temprary
      sender: {
        _id: user._id,
        name: user.name,
        chat: chatId,
        createdAt: new Date().toISOString(),
      },
    };

    const messageForDb = {
      // this format of message will save in our Message model
      content: message,
      sender: user._id,
      chat: chatId,
    };

    try {
      await Message.create(messageForDb);
    } catch (err) {
      console.log("Error while saving message to db :", err);
    }

    const membersSockets = members.map((user) =>
      userSocketIds.get(user._id.toString())
    ); // will get all the socketIds of a sepecific chat's members to whom we need to send the message ...

    io.to(membersSockets).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId });
  });

  socket.on("disconnect", () => {
    userSocketIds.delete(user._id.toString()); // will remove members from map once they dissconnected ...
    console.log("user dissconnected");
  });
});
