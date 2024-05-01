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
    const token = jwt.sign({ _id: newUser._id }, process.env.secret);

    // If everything is fine then send the jwt token in cookie
    return res
      .status(201)
      .cookie(process.env.TOKEN_NAME, token, cookieObj)
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
    const token = jwt.sign({ _id: checkUser._id }, process.env.secret);

    // If everything is fine then send the jwt token in cookie
    return res
      .status(200)
      .cookie(process.env.TOKEN_NAME, token, cookieObj)
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
    const getUser = await User.findById(req.userId).select("-password"); // default

    if (!getUser) return res.status(400).send("User not exist");

    res.status(200).json({
      success: true,
      user: getUser,
    });
  } catch (err) {
    res.status(500).send("Error while fetching user profile :", err);
  }
};

// logout
const logout = async (req, res) => {
  return res
    .status(200)
    .cookie(process.env.TOKEN_NAME, "", { ...cookieObj, maxAge: 0 })
    .json({
      success: true,
      message: "log out successfully !",
    });
};

// find a user
const searchUser = async (req, res) => {

const { name } = req.query;

try{
  res.status(200).json({ success: true, message: `${name}`});

}catch(err){
  res.status(400).json({success: false, message: 'Error while searching the user: ', err})
}

};

module.exports = { createUser, userLogin, userProfile, logout, searchUser };
