const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies[process.env.TOKEN_NAME];

    // If there is no token
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Please login to access this route" });

    const decode = jwt.verify(token, process.env.secret);
    req.userId = decode._id;

    next();
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "error while authenticating the user !",
      });
  }
};

const adminAuthenticate = (req, res, next) => {
  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "noKey";

  try {
    const token = req.cookies[process.env.ADMIN_TOKEN_NAME];

    // If there is no token
    if (!token)
      return res.status(400).json({
        success: false,
        message: "Please login to access this route",
      });

    const decode = jwt.verify(token, process.env.secret);
    const isMatch = adminSecretKey === decode.key;

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized !" });

    next();
  } catch (err){
    res.status(400).json({success: false, message: "error while authenticating the admin !"});
  }
};

module.exports = { isAuthenticate, adminAuthenticate };
