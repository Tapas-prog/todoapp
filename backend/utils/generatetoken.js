const jwt = require("jsonwebtoken");

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.token = token;
};

module.exports = generateToken;
