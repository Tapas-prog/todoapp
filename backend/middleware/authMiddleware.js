const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const protect = asyncErrorHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  if (token) {
    try {
      const Users = loadUsers();

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.find((user) => user.id === decoded.userID);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const loadUsers = () => {
  try {
    const fileName = path.join(__dirname, "..", "controller", "User.json");
    const dataBuffer = fs.readFileSync(fileName);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { protect };
