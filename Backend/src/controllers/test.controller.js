const aiService = require("../services/ai.service");

const generateTest = async (req, res, next) => {
  try {
    const { exam, difficulty, totalQuestions = 50 } = req.body;

    // Validation
    if (!exam || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Exam and difficulty are required",
      });
    }

    if (!["easy", "medium", "hard"].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level",
      });
    }

    //  Generate questions
    const questions = await aiService.generateQuestions(
      exam,
      difficulty,
      Number(totalQuestions)
    );

    if (!questions || questions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate questions",
      });
    }

    res.json({
      success: true,
      questions,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { generateTest };