const mongoose = require("mongoose");

const dailyTaskSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String,
      default: "1 Hour",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const monthlyPlanSchema = new mongoose.Schema(
  {
    week: Number,
    goal: String,
  },
  { _id: false }
);

const studyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    weakTopics: [String],
    dailyTasks: [dailyTaskSchema],
    monthlyPlan: [monthlyPlanSchema],
    generatedAt: {
      type: Date,
      default: Date.now,
    },

    resources: [
      {
        topic: {
          type: String
        },
        youtube: {
          type: String
        },
        article: {
          type: String
        }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
