const StudyPlan = require("../models/studyPlan.model");
const Result = require("../models/result.model");


const generateStudyPlan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let { duration = 30 } = req.body;

    duration = Number(duration);

    if (Number.isNaN(duration) || duration < 7 || duration > 90) {
      return res.status(400).json({
        success: false,
        message: "Duration must be between 7 and 90 days"
      });
    }

    const latestResult = await Result.findOne({
      user: userId
    }).sort({ createdAt: -1 });

    if (!latestResult) {
      return res.status(404).json({
        success: false,
        message: "No test result found"
      });
    }

    if (
      !latestResult.weakTopics ||
      latestResult.weakTopics.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No weak topics found"
      });
    }

    // Extract weak topics
    const weakTopics = latestResult.weakTopics.map(
      topic => topic.topic
    );

    // Copy resources from latest result
    const resources = latestResult.resources || [];

    // Generate daily tasks
    const dailyTasks = [];
    let currentDay = 1;

    for (const topic of weakTopics) {
      dailyTasks.push({
        day: currentDay++,
        topic,
        task: `Learn ${topic} concepts`,
        estimatedTime: "1 Hour",
        completed: false
      });

      dailyTasks.push({
        day: currentDay++,
        topic,
        task: `Solve 20 questions of ${topic}`,
        estimatedTime: "1.5 Hours",
        completed: false
      });

      dailyTasks.push({
        day: currentDay++,
        topic,
        task: `${topic} revision and mock test`,
        estimatedTime: "1 Hour",
        completed: false
      });
    }

    // Fill remaining days
    while (dailyTasks.length < duration) {
      const topic =
        weakTopics[dailyTasks.length % weakTopics.length];

      dailyTasks.push({
        day: currentDay++,
        topic,
        task: `Mixed practice for ${topic}`,
        estimatedTime: "1 Hour",
        completed: false
      });
    }

    // Monthly roadmap
    const monthlyPlan = [
      {
        week: 1,
        goal: "Understand concepts"
      },
      {
        week: 2,
        goal: "Practice questions"
      },
      {
        week: 3,
        goal: "Mock tests"
      },
      {
        week: 4,
        goal: "Final revision"
      }
    ];

    // Delete old study plan
    await StudyPlan.findOneAndDelete({
      user: userId
    });



    // Create new study plan
    const studyPlan = await StudyPlan.create({
      user: userId,
      exam: latestResult.exam,
      duration,
      weakTopics,
      dailyTasks,
      monthlyPlan,
      resources
    });

    return res.status(201).json({
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