const calculateTestResult = (answers, questions) => {
  let score = 0;
  let processedQuestions = [];
  let weakTopicsMap = {};

  answers.forEach(answer => {
    const question = questions.find(
      q => q._id.toString() === answer.questionId
    );

    const isCorrect =
      question.correctAnswer === answer.selectedAnswer;

    if (isCorrect) score++;

    if (!isCorrect) {
      if (!weakTopicsMap[question.topic]) {
        weakTopicsMap[question.topic] = 0;
      }
      weakTopicsMap[question.topic]++;
    }

    processedQuestions.push({
      questionId: question._id,
      topic: question.topic,
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect
    });
  });

  const weakTopics = Object.keys(weakTopicsMap).map(topic => ({
    topic,
    incorrectCount: weakTopicsMap[topic]
  }));

  return {
    score,
    totalQuestions: answers.length,
    processedQuestions,
    weakTopics
  };
};

module.exports = { calculateTestResult };