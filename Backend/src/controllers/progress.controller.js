const Result = require("../models/result.model");
const mongoose = require("mongoose");



const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

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

    res.json({
      success: true,
      totalTests,
      totalQuestions,
      totalScore,
      averageScore
    });

  } catch (error) {
    next(error);
  }
};


const getExamPerformance = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const results = await Result.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$exam",
          tests: { $sum: 1 },
          totalScore: { $sum: "$score" },
          totalQuestions: { $sum: "$totalQuestions" }
        }
      }
    ]);

    res.json({
      success: true,
      performance: results
    });

  } catch (error) {
    next(error);
  }
};



const getWeakTopics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const results = await Result.find({ user: userId });

    const topicMap = {};

    results.forEach(result => {
      result.weakTopics.forEach(topic => {
        if (!topicMap[topic.topic]) {
          topicMap[topic.topic] = 0;
        }

        topicMap[topic.topic] += topic.incorrectCount;
      });
    });

    const weakTopics = Object.keys(topicMap).map(topic => ({
      topic,
      incorrectCount: topicMap[topic]
    }));

    // Sort highest weakness first
    weakTopics.sort((a, b) => b.incorrectCount - a.incorrectCount);

    res.json({
      success: true,
      weakTopics
    });

  } catch (error) {
    next(error);
  }
};



const getRecentActivity = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const recentTests = await Result.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      recentTests
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getDashboardSummary,
  getExamPerformance,
  getWeakTopics,
  getRecentActivity
};