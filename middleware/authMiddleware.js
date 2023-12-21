const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  let token = req.get("Authorization");
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

module.exports = authMiddleware;
