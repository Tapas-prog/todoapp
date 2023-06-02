const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generatetoken");
const fs = require("fs");
const path = require("path");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Users = loadUsers();
  const user = Users.find(
    (use) => use.email === email && use.password === password
  );

  if (user) {
    generateToken(res, user.id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: res.token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "logout User" });
});

const loadUsers = () => {
  try {
    const fileName = path.join(__dirname, "User.json");
    const dataBuffer = fs.readFileSync(fileName);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports = { authUser, logoutUser };
