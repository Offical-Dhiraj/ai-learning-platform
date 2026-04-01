const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    completedTask: {
      type: Number,
      default: 0,
    },
    totalTask: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const progressModel = mongoose.model("Progress", progressSchema);

module.exports = progressModel;
