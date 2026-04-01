const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  selectedAnswer: {
    type: String,
    required: false,
    default:null
  },

  correctAnswer: {
    type: String,
    required: true
  },

  isCorrect: {
    type: Boolean,
    required: true
  }
});

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    exam: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    score: {
      type: Number,
      required: true
    },

    percentage: {
      type: Number,
      required: true
    },

    questions: [answerSchema],

    weakTopics: [
      {
        topic: String,
        incorrectCount: Number
      }
    ],

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);