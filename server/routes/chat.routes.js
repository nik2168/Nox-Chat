const express = require("express");
const router = express.Router();



// controllers
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
} = require("../controllers/chat.controller.js");


// middle wares
const { isAuthenticate } = require("../middlewares/auth.mw.js");


// after this all routes need authentication that user must be logged in to access these routes ...
router.use(isAuthenticate); // authenticate a user with cookie
router.post("/creategroup", newGroupChat);
router.get("/chats", getMyChats);
router.get("/groups", getMyGroups);


module.exports = router;
