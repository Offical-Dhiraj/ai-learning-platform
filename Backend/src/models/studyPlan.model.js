const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema(
  {
    day: Number,
    topics: [String],
    completed: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const studyPlanSchema = new mongoose.Schema(
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

    duration: Number,

    dailyTasks: [dailyTaskSchema],

    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);