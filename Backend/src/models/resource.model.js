const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      enum: ["video", "book", "pdf", "playlist"],
    },
    link: String,
    subject: String,

    examType: {
      type: String,
      enum: ["IIT", "NEET", "PLACEMENT"],
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    strongSubjects: [String],
    timeTaken: Number,
  },
  { timestamps: true },
);

const resourceModel = mongoose.model("Resource", resourceSchema);

module.exports = resourceModel;
