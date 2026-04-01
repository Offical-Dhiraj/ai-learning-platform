const Result = require("../models/result.model");
const mongoose = require("mongoose");
const { generateStudaySuggestions } = require("../services/ai.service");

const submitTest = async (req, res, next) => {
  try {
    console.log("USER:", req.user);

    const userId = req.user.id;
    const { exam, difficulty, questions } = req.body;

    if (!exam || !difficulty || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission data"
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No questions submitted"
      });
    }

    let score = 0;
    let weakTopicsMap = {};
    let processedAnswers = [];

    for (let q of questions) {
      const {
        questionText,
        topic,
        options,
        selectedAnswer,
        correctAnswer
      } = q;

      if (
        !questionText ||
        !topic ||
        !Array.isArray(options) ||
        options.length < 2 ||
        !correctAnswer
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid question format"
        });
      }

      const isCorrect = selectedAnswer === correctAnswer;

      if (isCorrect) {
        score++;
      } else {
        weakTopicsMap[topic] = (weakTopicsMap[topic] || 0) + 1;
      }

      processedAnswers.push({
        questionText,
        topic,
        options,
        selectedAnswer,
        correctAnswer,
        isCorrect
      });
    }

    const totalQuestions = questions.length;

    const percentage = Number(
      ((score / totalQuestions) * 100).toFixed(2)
    );

    const weakTopics = Object.keys(weakTopicsMap).map(topic => ({
      topic,
      incorrectCount: weakTopicsMap[topic]
    }));

    // ✅ FIXED: suggestion call moved here
    let suggestions = "";
    try {
      suggestions = await generateStudaySuggestions(weakTopics);
    } catch (err) {
      suggestions = "Revise weak topics and practice daily.";
    }

    const result = await Result.create({
      user: userId,
      exam,
      difficulty,
      totalQuestions,
      score,
      percentage,
      questions: processedAnswers,
      weakTopics,
      suggestions
    });

    res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      score,
      totalQuestions,
      percentage,
      weakTopics,
      suggestions,
      resultId: result._id
    });

  } catch (error) {
    next(error);
  }
};


const getUserResults = async (req, res, next) => {
  try {
    let results;

    if (req.user) {
      results = await Result.find({ user: req.user.id }).sort({ createdAt: -1 });
    } else {
      results = await Result.find().sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      total: results.length,
      results
    });

  } catch (error) {
    next(error);
  }
};


const getResultById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID"
      });
    }

    const result = await Result.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found"
      });
    }

    if (result.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    res.json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
};


const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const results = await Result.find({ user: userId });

    if (results.length === 0) {
      return res.json({
        success: true,
        stats: {
          totalTest: 0,
          avgScore: 0,
          accuracy: 0
        },
        recent: []
      });
    }

    const totalTest = results.length;

    const totalScore = results.reduce((acc, r) => acc + r.score, 0);

    const totalQuestions = results.reduce(
      (acc, r) => acc + r.totalQuestions,
      0
    );

    const avgScore = (totalScore / totalTest).toFixed(2);
    const accuracy = ((totalScore / totalQuestions) * 100).toFixed(2);

    const trand = results.map(r => ({
      date: new Date(r.createdAt).toLocaleDateString(),
      score: r.percentage
    }));

    res.json({
      success: true,
      stats: {
        totalTest,
        avgScore,
        accuracy
      },
      recent: results.slice(0, 5),
      trand
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitTest,
  getUserResults,
  getResultById,
  getDashboardStats
};