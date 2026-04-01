// src/services/result.service.js

const Result = require("../models/result.model");

const calculateTestResult = (answers) => {

  let score = 0;
  let weakTopicsMap = {};

  answers.forEach(answer => {

    const isCorrect =
      answer.correctAnswer === answer.selectedAnswer;

    if (isCorrect) score++;

    if (!isCorrect) {
      if (!weakTopicsMap[answer.topic]) {
        weakTopicsMap[answer.topic] = 0;
      }
      weakTopicsMap[answer.topic]++;
    }

    answer.isCorrect = isCorrect;
  });

  const weakTopics = Object.keys(weakTopicsMap).map(topic => ({
    topic,
    incorrectCount: weakTopicsMap[topic]
  }));

  const percentage =
    (score / answers.length) * 100;

  return {
    score,
    totalQuestions: answers.length,
    percentage,
    processedQuestions: answers,
    weakTopics
  };
};


const saveResult = async ({
  userId,
  exam,
  difficulty,
  processedQuestions,
  score,
  totalQuestions,
  percentage,
  weakTopics
}) => {

  const result = await Result.create({
    user: userId,
    exam,
    difficulty,
    totalQuestions,
    score,
    percentage,
    questions: processedQuestions,
    weakTopics
  });

  return result;
};

module.exports = {
  calculateTestResult,
  saveResult
};