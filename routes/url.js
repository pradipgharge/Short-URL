const express = require("express");

const {
  handleGenerateNewShortURL,
  handleRedirecttoOriginalURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirecttoOriginalURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
