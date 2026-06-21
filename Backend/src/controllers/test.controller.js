const aiService = require("../services/ai.service");
const Test = require("../models/test.model");

// =========================
// GENERATE TEST
// =========================




const generateTest = async (req, res, next) => {
  try {
    const {
      exam,
      difficulty,
      totalQuestions = 20
    } = req.body;

    if (!exam || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Exam and difficulty are required"
      });
    }

    if (
      !["easy", "medium", "hard"].includes(difficulty)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level"
      });
    }

    // Delete old unfinished tests
    await Test.deleteMany({
      user: req.user.id,
      submitted: false
    });

    // Generate questions
    const questions =
      await aiService.generateQuestions(
        exam,
        difficulty,
        Number(totalQuestions)
      );

    if (!questions || questions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate questions"
      });
    }

    // Save new test
    const test = await Test.create({
      user: req.user.id,
      exam,
      difficulty,
      questions,
      submitted: false
    });

    res.status(201).json({
      success: true,
      test
    });

  } catch (error) {
    console.log("Generate Test Error:", error);
    next(error);
  }
};

// =========================
// GET CURRENT TEST
// =========================

const getCurrentTest = async (
  req,
  res,
  next
) => {
  try {

    const test = await Test.findOne({
      user: req.user.id,
      submitted: false
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        message:
          "No active test found"
      });
    }

    res.json({
      success: true,
      test
    });

  } catch (error) {
    next(error);
  }
};

// =========================
// DELETE CURRENT TEST
// =========================

const deleteCurrentTest = async (
  req,
  res,
  next
) => {
  try {

    await Test.findOneAndDelete({
      user: req.user.id,
      submitted: false
    });

    res.json({
      success: true,
      message:
        "Current test deleted"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateTest,
  getCurrentTest,
  deleteCurrentTest
};