const express = require("express");
const router = express.Router();



// controllers
const {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} = require("../controllers/chat.controller.js");


// middle wares
const { isAuthenticate } = require("../middlewares/auth.mw.js");
const { attachmentsMulter } = require("../middlewares/multer.js");



// after this all routes need authentication that user must be logged in to access these routes ...

router.use(isAuthenticate); // authenticate a user with cookie

router.post("/creategroup", newGroupChat);

router.put("/addmembers", addMembers);

router.delete("/removemembers", removeMembers);

router.get("/chats", getMyChats);

router.get("/groups", getMyGroups);

router.get("/leave/:id", leaveGroup)

router.post("/messages", attachmentsMulter, sendAttachments) // attachments

router.get('/messages/:id', getMessages)

router.route("/:id").get(getChatDetails).post(renameGroup).delete(deleteChat);


module.exports = router;
