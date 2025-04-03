const jwt = require("jsonwebtoken");
const config = require("../utlis/config");
const User = require("../models/user");

const authMiddleware = {
  isAuth: (req, res, next) => {
    // get the token from the request headers
    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // verify the token
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },

  isAdmin: async (req, res, next) => {
    // get the token from the request headers
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // verify the token
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.userId = decoded.id;
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
};

module.exports = authMiddleware;
