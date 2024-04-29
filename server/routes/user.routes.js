const express = require("express");
const router = express.Router();

// middle wares
const { singleAvatar } = require("../middlewares/multer.js");
const {
  verifyLoginBody,
  verifySignUpBody,
} = require("../middlewares/user.mw.js");
const { isAuthenticate } = require("../middlewares/auth.mw.js");

// controllers
const {
  createUser,
  userLogin,
  userProfile,
} = require("../controllers/user.controller.js");

// Create a new user in database and saved in cookie
router.post("/signup", singleAvatar, verifySignUpBody, createUser);
// Login a existing user
router.post("/login", singleAvatar, verifyLoginBody, userLogin);

// after this all routes need authentication that user must be logged in to access these routes ...
router.get("/profile", isAuthenticate, userProfile);


module.exports = router;
