// src/services/studyPlan.service.js

const StudyPlan = require("../models/studyPlan.model");

const createStudyPlan = async ({
  userId,
  exam,
  duration,
  weakTopics
}) => {

  const dailyTasks = [];

  for (let day = 1; day <= duration; day++) {

    const topic =
      weakTopics[(day - 1) % weakTopics.length];

    dailyTasks.push({
      day,
      topics: [topic],
      completed: false
    });
  }

  const studyPlan = await StudyPlan.create({
    user: userId,
    exam,
    duration,
    dailyTasks
  });

  return studyPlan;
};

module.exports = { createStudyPlan };