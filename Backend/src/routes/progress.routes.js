const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getExamPerformance,   
  getWeakTopics,
  getRecentActivity
} = require("../controllers/progress.controller");

const { protect } = require("../middlewares/auth.middleware");

router.get("/summary", protect, getDashboardSummary);
router.get("/exam-performance", protect, getExamPerformance);  
router.get("/weak-topics", protect, getWeakTopics);
router.get("/recent", protect, getRecentActivity);

module.exports = router;