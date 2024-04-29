const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieObj = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const avatar = {
  public_id: "asd8a797",
  url: "akjshdgiaerhg",
};

// SIGN UP :
const createUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  try {
    const newUser = await User.create({
      name,
      username,
      password,
      bio,
      avatar,
    });

    // generate a new jwt token
    const token = jwt.sign({ username: newUser.username }, process.env.secret, {
      expiresIn: 15 * 24 * 60 * 60 * 1000, // 15 days ...
    });

    // If everything is fine then send the jwt token in cookie
    return res
      .status(201)
      .cookie("nox_token", token, cookieObj)
      .json({ success: true, message: "User Created!", newUser });
  } catch (err) {
    return res.status(500).send("Error while creating the user", err);
  }
};

// LOG IN :
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user is present
    const checkUser = await User.findOne({ username: username }).select(
      "+password"
    );
    if (!checkUser)
      return res.status(400).send("User not found with this username");

    // check if the password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) return res.status(400).send("Incorrect Password !");

    // generate a new jwt token
    const token = jwt.sign(
      { username: checkUser.username },
      process.env.secret,
      {
        expiresIn: 15 * 24 * 60 * 60 * 1000, // 15 days ...
      }
    );

    // If everything is fine then send the jwt token in cookie
    return res
      .status(200)
      .cookie("nox_token", token, cookieObj)
      .json({ success: true, message: "Login Success!", checkUser });
  } catch (err) {
    return res
      .status(500)
      .json({ Error: "Error while creating the user", Des: err });
  }
};

// user Profile
const userProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: "user data",
    });
  } catch (err) {
    res.status(500).send("Error while fetching user profile");
  }
};

module.exports = { createUser, userLogin, userProfile };
