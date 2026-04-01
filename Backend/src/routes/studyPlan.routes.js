const express = require("express");
const router = express.Router();

const {
  generateStudyPlan,
  getMyStudyPlan,
  markDayCompleted,
  deleteStudyPlan
} = require("../controllers/study-plan.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/generate", protect, generateStudyPlan);
router.get("/", protect, getMyStudyPlan);
router.patch("/complete-day", protect, markDayCompleted);
router.delete("/", protect, deleteStudyPlan);

module.exports = router;