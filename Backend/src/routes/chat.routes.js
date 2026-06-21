const express = require("express");

const router = express.Router();

const { chatWithAI, getHistory } = require("../controllers/chat.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, chatWithAI);

router.get("/history", protect, getHistory);

module.exports = router;
