const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createUser } = require("./seeders/user.seeder.js");

// routes import
const userRoutes = require("./routes/user.routes.js");
const chatRoutes = require("./routes/chat.routes.js");

const app = express();
app.use(cookieParser());

dotenv.config({
  path: "./.env",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.name })
  .then(() => {
    console.log("Connected to database successfully!");

    app.listen(process.env.port, () => {
      console.log(`Sever is running at port: ${process.env.port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db", err);
  });


app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
