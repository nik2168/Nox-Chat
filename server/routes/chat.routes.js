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
const { attachmentsMulter, singleAvatar } = require("../middlewares/multer.js");
const {
  createGroupValidator,
  validateHandler,
  addMembersValidator,
  removeMembersValidator,
  leaveGroupValidator,
  sendAttachmentsValidator,
  renameGroupValidator,
  deleteChatValidator,
  getMessagesValidator,
} = require("../lib/validators.js");

// after this all routes need authentication that user must be logged in to access these routes ...

router.use(isAuthenticate); // authenticate a user with cookie

router.post(
  "/creategroup",
  singleAvatar,
  createGroupValidator(),
  validateHandler,
  newGroupChat
);

router.put("/addmembers", addMembersValidator(), validateHandler, addMembers);

router.delete(
  "/removemembers",
  removeMembersValidator(),
  validateHandler,
  removeMembers
);

router.get("/chats", getMyChats);

router.get("/groups", getMyGroups);

router.get("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup);

router.post(
  "/sendattachments",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
); // attachments

router.get(
  "/messages/:id",
  getMessagesValidator(),
  validateHandler,
  getMessages
);

router
  .route("/:id")
  .get(getChatDetails)
  .post(renameGroupValidator(), validateHandler, renameGroup)
  .delete(deleteChatValidator(), validateHandler, deleteChat);

module.exports = router;
