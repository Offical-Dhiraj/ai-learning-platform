// src/services/progress.service.js

const Result = require("../models/result.model");

const calculateDashboardSummary = async (userId) => {

  const results = await Result.find({ user: userId });

  const totalTests = results.length;

  const totalScore = results.reduce(
    (sum, r) => sum + r.score,
    0
  );

  const totalQuestions = results.reduce(
    (sum, r) => sum + r.totalQuestions,
    0
  );

  const averageScore =
    totalTests > 0
      ? (totalScore / totalTests).toFixed(2)
      : 0;

  return {
    totalTests,
    totalScore,
    totalQuestions,
    averageScore
  };
};

module.exports = { calculateDashboardSummary };