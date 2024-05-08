const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createServer } = require('http')



// routes import
const userRoutes = require("./routes/user.routes.js");
const chatRoutes = require("./routes/chat.routes.js");
const adminRoutes = require("./routes/admin.routes.js");

const app = express();
app.use(cookieParser());

// socket.io 
const {Server} = require('socket.io')
const server = createServer(app)
const io = new Server(server, {});


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
      console.log(`Sever is running at port: ${process.env.port} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db", err);
  });

  
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id)

// socket.io connection
  socket.on("disconnect", () => {
    console.log("user dissconnected")
  })
})