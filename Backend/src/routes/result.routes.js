const express = require("express");
const router = express.Router();

const {
  submitTest,
  getUserResults,
  getDashboardStats
} = require("../controllers/result.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/submit", protect, submitTest);
router.get("/my", protect, getUserResults);
router.get("/dashboard", protect, getDashboardStats);
router.get("/:id", protect, getUserResults);

module.exports = router;