const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

const router = express.Router();

//signup
router.post("/", handleUserSignUp);

//login
router.post("/login", handleUserLogin);

module.exports = router;
