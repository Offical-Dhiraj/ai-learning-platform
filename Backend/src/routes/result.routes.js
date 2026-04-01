const express = require("express");
const router = express.Router();

const {
  submitTest,
  getUserResults,
  getResultById,
  deleteResult,
  getDashboardStats
} = require("../controllers/result.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/submit", protect, submitTest);
router.get("/my", protect, getUserResults);
router.get("/dashboard", protect, getDashboardStats);
router.get("/:id", protect, getResultById);
router.get("/", getUserResults);

module.exports = router;