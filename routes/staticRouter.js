const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});
module.exports = router;
