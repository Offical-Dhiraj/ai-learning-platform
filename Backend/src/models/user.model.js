const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    resetPasswordToken: {
      type: String
    },

    resetPasswordExpires: {
      type: Date
    },

    testsTaken: { type: Number, default: 0 },
    accuracy: { type: String, default: "0%" },
    studyTime: { type: String, default: "0h" },
    topics: { type: Number, default: 0 },
    activities: [{ type: String }],
    suggestions:String,

    targetExam: {
      type: String,
      enum: ["IIT", "NEET", "PLACEMENT", "GENERAL"],
    },

    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    testsTaken: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
    weakSubjects: [String],
    strongSubjects: [String],
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
