const Result = require("../models/result.model");
const mongoose = require("mongoose");
const { generateStudySuggestions } = require("../services/ai.service");
const StudyPlan = require("../models/studyPlan.model");
const resourcesMap = require("../data/resources");


const submitTest = async (req, res, next) => {
  try {
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

    const weakTopicsMap = {};

    const processedAnswers = [];

    for (const q of questions) {
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

      const isCorrect =
        selectedAnswer?.trim().toLowerCase() ===
        correctAnswer?.trim().toLowerCase();

      if (isCorrect) {
        score++;
      } else {
        weakTopicsMap[topic] =
          (weakTopicsMap[topic] || 0) + 1;
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

    const weakTopics = Object.keys(
      weakTopicsMap
    ).map(topic => ({
      topic,
      incorrectCount: weakTopicsMap[topic]
    }));

    // ======================
    // AI Suggestions
    // ======================

    let suggestions = "";

    try {
      suggestions =
        await generateStudySuggestions(
          weakTopics
        );
    } catch (error) {
      suggestions =
        "Revise weak topics and practice daily.";
    }

    // ======================
    // Learning Resources
    // ======================

    const resources = weakTopics.map(
      item => ({
        topic: item.topic,

        youtube:
          resourcesMap[item.topic]?.youtube ||
          "https://www.youtube.com",

        article:
          resourcesMap[item.topic]?.article ||
          "https://www.google.com"
      })
    );

    // ======================
    // Save Result
    // ======================

    const result = await Result.create({
      user: userId,
      exam,
      difficulty,
      totalQuestions,
      score,
      percentage,
      questions: processedAnswers,
      weakTopics,
      suggestions,
      resources
    });

    // ======================
    // Topic Names
    // ======================

    const topicNames =
      weakTopics.length > 0
        ? weakTopics.map(
          item => item.topic
        )
        : ["General Practice"];

    // ======================
    // Smart Task Map
    // ======================

    const taskMap = {
      Percentage:
        "Watch Percentage Video + Solve 20 Questions",

      Aptitude:
        "Practice Quantitative Aptitude Questions",

      Coding:
        "Practice Arrays and Strings Problems",

      Reasoning:
        "Solve Logical Reasoning Questions",

      Verbal:
        "Read Comprehension + Vocabulary Practice",

      "Number Series":
        "Solve 20 Number Series Questions",

      "Profit and Loss":
        "Learn Formula + Solve 15 Questions",

      "Time and Work":
        "Solve 15 Time and Work Questions",

      "Data Interpretation":
        "Practice DI Sets",

      "Logical Deduction":
        "Solve Deduction Based Problems"
    };

    // ======================
    // Daily Tasks
    // ======================

    const dailyTasks = [];

    for (
      let day = 1;
      day <= 30;
      day++
    ) {
      const topic =
        topicNames[
        (day - 1) %
        topicNames.length
        ];

      dailyTasks.push({
        day,

        topic,

        task:
          taskMap[topic] ||
          `Practice ${topic}`,

        estimatedTime:
          day <= 10
            ? "1 Hour"
            : day <= 20
              ? "1.5 Hours"
              : "2 Hours",

        completed: false
      });
    }

    // ======================
    // Remove Old Plan
    // ======================

    await StudyPlan.findOneAndDelete({
      user: userId
    });

    // ======================
    // Create New Study Plan
    // ======================

    const studyPlan =
      await StudyPlan.create({
        user: userId,

        exam,

        duration: 30,

        weakTopics: topicNames,

        dailyTasks,

        monthlyPlan: [
          {
            week: 1,
            goal:
              "Understand Weak Concepts"
          },

          {
            week: 2,
            goal:
              "Topic Wise Practice"
          },

          {
            week: 3,
            goal:
              "Mock Tests & Accuracy"
          },

          {
            week: 4,
            goal:
              "Final Revision"
          }
        ]
      });

    console.log(
      "Study Plan Created:",
      studyPlan._id
    );

    // ======================
    // Response
    // ======================

    res.status(201).json({
      success: true,

      message:
        "Test submitted and study plan generated successfully",

      score,

      totalQuestions,

      percentage,

      weakTopics,

      suggestions,

      resources,

      studyPlanId:
        studyPlan._id,

      resultId:
        result._id
    });

  } catch (error) {
    console.log(
      "Submit Test Error:",
      error
    );

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