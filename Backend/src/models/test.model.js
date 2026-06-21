const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
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
      required: true
    },

    questions: {
      type: Array,
      required: true
    },

    submitted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Test",
  testSchema
);