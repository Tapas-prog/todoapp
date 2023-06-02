const express = require("express");
const router = express.Router();
const { authUser, logoutUser } = require("../controller/userController");

router.post("/auth", authUser);
router.post("/logout", logoutUser);

module.exports = router;
