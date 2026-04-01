const StudyPlan = require("../models/studyPlan.model");
const Result = require("../models/result.model");


const generateStudyPlan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let { duration = 30 } = req.body;

    duration = Number(duration);

    if (duration < 7 || duration > 90) {
      return res.status(400).json({
        success: false,
        message: "Duration must be between 7 and 90 days"
      });
    }

    const latestResult = await Result.findOne({ user: userId })
      .sort({ createdAt: -1 });

    if (!latestResult) {
      return res.status(400).json({
        success: false,
        message: "No test result found"
      });
    }

    if (!latestResult.weakTopics.length) {
      return res.status(400).json({
        success: false,
        message: "No weak topics found. You are performing well!"
      });
    }

    const sortedWeakTopics = latestResult.weakTopics
      .sort((a, b) => b.incorrectCount - a.incorrectCount)
      .map(t => t.topic);

    const dailyTasks = [];

    for (let day = 1; day <= duration; day++) {
      const topic =
        sortedWeakTopics[(day - 1) % sortedWeakTopics.length];

      dailyTasks.push({
        day,
        topics: [topic],
        completed: false
      });
    }

    await StudyPlan.findOneAndDelete({ user: userId });

    const studyPlan = await StudyPlan.create({
      user: userId,
      exam: latestResult.exam,
      duration,
      dailyTasks,
      generatedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Study plan generated successfully",
      studyPlan
    });

  } catch (error) {
    next(error);
  }
};


const getMyStudyPlan = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const plan = await StudyPlan.findOne({ user: userId });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "No study plan found"
      });
    }

    res.json({
      success: true,
      studyPlan: plan
    });

  } catch (error) {
    next(error);
  }
};




const markDayCompleted = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { day } = req.body;

    if (!day || typeof day !== "number") {
      return res.status(400).json({
        success: false,
        message: "Valid day number required"
      });
    }

    const plan = await StudyPlan.findOne({ user: userId });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Study plan not found"
      });
    }

    const task = plan.dailyTasks.find(t => t.day === day);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Invalid day"
      });
    }

    task.completed = true;

    await plan.save();

    res.json({
      success: true,
      message: `Day ${day} marked as completed`
    });

  } catch (error) {
    next(error);
  }
};



const deleteStudyPlan = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await StudyPlan.findOneAndDelete({ user: userId });

    res.json({
      success: true,
      message: "Study plan deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateStudyPlan,
  getMyStudyPlan,
  markDayCompleted,
  deleteStudyPlan
};