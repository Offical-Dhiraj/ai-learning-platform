const StudyPlan = require("../models/studyPlan.model");
const Result = require("../models/result.model");

// =========================
// Generate Study Plan
// =========================

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

const weakTopics =
  latestResult.weakTopics?.map(
    item => item.topic
  ) || [];

if (weakTopics.length === 0) {
  return res.status(400).json({
    success: false,
    message: "No weak topics found"
  });
}

// Copy resources from latest result
const resources = latestResult.resources || [];

const dailyTasks = [];
let day = 1;

weakTopics.forEach(topic => {
  dailyTasks.push({
    day: day++,
    topic,
    task: `Learn ${topic} concepts`,
    estimatedTime: "1 Hour",
    completed: false
  });

  dailyTasks.push({
    day: day++,
    topic,
    task: `Practice ${topic} questions`,
    estimatedTime: "1.5 Hours",
    completed: false
  });

  dailyTasks.push({
    day: day++,
    topic,
    task: `${topic} revision`,
    estimatedTime: "1 Hour",
    completed: false
  });
});

while (dailyTasks.length < duration) {
  const topic =
    weakTopics[
      dailyTasks.length %
      weakTopics.length
    ];

  dailyTasks.push({
    day: day++,
    topic,
    task: `Mixed Practice - ${topic}`,
    estimatedTime: "1 Hour",
    completed: false
  });
}

const monthlyPlan = [
  {
    week: 1,
    goal: "Understand Weak Concepts"
  },
  {
    week: 2,
    goal: "Practice Questions"
  },
  {
    week: 3,
    goal: "Mock Tests"
  },
  {
    week: 4,
    goal: "Final Revision"
  }
];

await StudyPlan.deleteMany({
  user: userId
});

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
console.log("Generate Study Plan Error:", error);
next(error);
}
};

// =========================
// Get My Study Plan
// =========================

const getMyStudyPlan = async (req, res, next) => {
try {
const plan = await StudyPlan.findOne({
user: req.user.id
});


if (!plan) {
  return res.status(404).json({
    success: false,
    message: "No study plan found"
  });
}

res.status(200).json({
  success: true,
  studyPlan: plan
});


} catch (error) {
next(error);
}
};

// =========================
// Mark Day Completed
// =========================

const markDayCompleted = async (req, res, next) => {
try {
const userId = req.user.id;
const { day } = req.body;


if (!day) {
  return res.status(400).json({
    success: false,
    message: "Day is required"
  });
}

const plan = await StudyPlan.findOne({
  user: userId
});

if (!plan) {
  return res.status(404).json({
    success: false,
    message: "Study plan not found"
  });
}

const task = plan.dailyTasks.find(
  item => item.day === day
);

if (!task) {
  return res.status(404).json({
    success: false,
    message: "Task not found"
  });
}

task.completed = true;

await plan.save();

res.status(200).json({
  success: true,
  message: `Day ${day} marked completed`
});


} catch (error) {
next(error);
}
};

// =========================
// Delete Study Plan
// =========================

const deleteStudyPlan = async (req, res, next) => {
try {
await StudyPlan.findOneAndDelete({
user: req.user.id
});


res.status(200).json({
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
