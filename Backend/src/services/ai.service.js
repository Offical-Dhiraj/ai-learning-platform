
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// =====================================================
// CLEAN JSON
// =====================================================

const cleanJSON = (text) => {
  try {
    if (!text) return null;

    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
      return null;
    }

    cleaned = match[0];

    cleaned = cleaned.replace(/,\s*}/g, "}");
    cleaned = cleaned.replace(/,\s*]/g, "]");

    return JSON.parse(cleaned);

  } catch (error) {
    console.log(
      "JSON CLEAN ERROR:",
      error.message
    );

    return null;
  }
};

// =====================================================
// NORMALIZE EXAM
// =====================================================

const normalizeExam = (exam) => {
  const value = String(exam || "")
    .trim()
    .toLowerCase();

  if (
    value === "placement" ||
    value === "placements"
  ) {
    return "placement";
  }

  if (value === "neet") {
    return "neet";
  }

  if (
    value === "jee" ||
    value === "iit jee" ||
    value === "iIT jee".toLowerCase()
  ) {
    return "jee";
  }

  return value;
};

// =====================================================
// PROMPT BUILDER
// =====================================================

const buildPrompt = (
  exam,
  difficulty,
  count,
  startIndex = 0
) => {

  const normalizedExam = normalizeExam(exam);

  // ===================================================
  // PLACEMENT
  // ===================================================

  if (normalizedExam === "placement") {

    return `
You are an expert placement examination question generator.

Generate exactly ${count} completely new and unique MCQ questions.

Exam: PLACEMENT
Difficulty: ${difficulty}

IMPORTANT QUESTION SEQUENCE:

Questions must follow this order:

1. Aptitude
2. Reasoning
3. Verbal
4. Coding

For a 30-question test:

Questions 1-8:
APTITUDE

Questions 9-15:
REASONING

Questions 16-22:
VERBAL

Questions 23-30:
CODING

APTITUDE TOPICS:
- Percentage
- Profit and Loss
- Ratio and Proportion
- Average
- Time and Work
- Time Speed Distance
- Data Interpretation
- Simple and Compound Interest

REASONING TOPICS:
- Number Series
- Logical Deduction
- Blood Relations
- Direction Sense
- Seating Arrangement
- Coding-Decoding
- Syllogism

VERBAL TOPICS:
- Synonyms
- Antonyms
- Vocabulary
- Sentence Correction
- Grammar
- Reading Comprehension

CODING TOPICS:
- Arrays
- Strings
- OOP
- Java
- Python
- Data Structures
- Algorithms
- Programming Output

STRICT RULES:

1. Generate ONLY placement questions.
2. Do NOT generate NEET questions.
3. Do NOT generate JEE questions.
4. Every question must have exactly 4 options.
5. Every question must have a specific topic.
6. correctAnswer MUST contain the exact FULL option text.
7. Never return A, B, C or D as correctAnswer.
8. No duplicate questions.
9. No explanations.
10. Return ONLY valid JSON.

Example:

{
  "questions": [
    {
      "questionText": "A train travels 120 km in 2 hours. What is its average speed?",
      "topic": "Time Speed Distance",
      "options": [
        "40 km/h",
        "50 km/h",
        "60 km/h",
        "80 km/h"
      ],
      "correctAnswer": "60 km/h"
    }
  ]
}

Return ONLY JSON.
`;
  }

  // ===================================================
  // NEET
  // ===================================================

  if (normalizedExam === "neet") {

    return `
You are an expert NEET examination question generator.

Generate exactly ${count} completely new and unique MCQ questions.

Exam: NEET
Difficulty: ${difficulty}

IMPORTANT:

These questions MUST be strictly related to the NEET syllabus.

Allowed subjects ONLY:

BIOLOGY:
- Cell Biology
- Genetics
- Human Physiology
- Plant Physiology
- Ecology
- Evolution
- Human Reproduction
- Reproductive Health
- Biotechnology
- Diversity of Living Organisms

PHYSICS:
- Mechanics
- Thermodynamics
- Current Electricity
- Electrostatics
- Optics
- Modern Physics
- Electromagnetism
- Oscillations and Waves

CHEMISTRY:
- Organic Chemistry
- Inorganic Chemistry
- Physical Chemistry
- Chemical Bonding
- Thermodynamics
- Equilibrium
- Electrochemistry
- Coordination Compounds

STRICT RULES:

1. Generate ONLY NEET questions.
2. Do NOT generate placement questions.
3. Do NOT generate aptitude questions.
4. Do NOT generate reasoning questions.
5. Do NOT generate verbal questions.
6. Do NOT generate coding questions.
7. Every question must have exactly 4 options.
8. Every question must have a specific NEET topic.
9. correctAnswer MUST contain the exact FULL option text.
10. Never return A, B, C or D as correctAnswer.
11. Questions should be realistic NEET-style MCQs.
12. No duplicate questions.
13. No explanation.
14. Return ONLY valid JSON.

Example:

{
  "questions": [
    {
      "questionText": "Which organelle is known as the powerhouse of the cell?",
      "topic": "Cell Biology",
      "options": [
        "Nucleus",
        "Ribosome",
        "Mitochondria",
        "Golgi Apparatus"
      ],
      "correctAnswer": "Mitochondria"
    }
  ]
}

Return ONLY JSON.
`;
  }

  // ===================================================
  // JEE
  // ===================================================

  if (normalizedExam === "jee") {

    return `
You are an expert IIT JEE examination question generator.

Generate exactly ${count} completely new and unique MCQ questions.

Exam: JEE
Difficulty: ${difficulty}

Allowed subjects ONLY:

PHYSICS:
- Mechanics
- Kinematics
- Laws of Motion
- Work Energy Power
- Rotational Motion
- Thermodynamics
- Electrostatics
- Current Electricity
- Magnetism
- Electromagnetic Induction
- Optics
- Modern Physics
- Waves

CHEMISTRY:
- Physical Chemistry
- Organic Chemistry
- Inorganic Chemistry
- Chemical Bonding
- Thermodynamics
- Equilibrium
- Electrochemistry
- Coordination Chemistry
- Hydrocarbons

MATHEMATICS:
- Algebra
- Calculus
- Coordinate Geometry
- Trigonometry
- Probability
- Statistics
- Matrices
- Determinants
- Vectors
- 3D Geometry

STRICT RULES:

1. Generate ONLY JEE questions.
2. Do NOT generate NEET questions.
3. Do NOT generate placement questions.
4. Do NOT generate aptitude questions.
5. Do NOT generate reasoning questions.
6. Do NOT generate verbal questions.
7. Do NOT generate coding questions.
8. Every question must have exactly 4 options.
9. Every question must have a specific JEE topic.
10. correctAnswer MUST contain the exact FULL option text.
11. Never return A, B, C or D as correctAnswer.
12. Questions should be realistic JEE-style questions.
13. No duplicate questions.
14. No explanation.
15. Return ONLY valid JSON.

Example:

{
  "questions": [
    {
      "questionText": "If the velocity of a particle is doubled, how does its kinetic energy change?",
      "topic": "Work Energy Power",
      "options": [
        "Becomes half",
        "Remains same",
        "Becomes four times",
        "Becomes two times"
      ],
      "correctAnswer": "Becomes four times"
    }
  ]
}

Return ONLY JSON.
`;
  }

  // ===================================================
  // DEFAULT
  // ===================================================

  return `
Generate ${count} MCQ questions for ${exam}.

Difficulty: ${difficulty}

Every question must have:
- questionText
- topic
- exactly 4 options
- correctAnswer

correctAnswer MUST be the exact option text.

Return ONLY JSON:

{
  "questions": []
}
`;
};

// =====================================================
// FALLBACK QUESTIONS
// =====================================================

const getFallbackQuestions = (
  exam,
  count = 5
) => {

  const normalizedExam = normalizeExam(exam);

  let base = [];

  // ===================================================
  // PLACEMENT FALLBACK
  // ===================================================

  if (normalizedExam === "placement") {

    base = [

      {
        questionText:
          "A product costs ₹800 and is sold for ₹960. What is the profit percentage?",

        topic:
          "Profit and Loss",

        options: [
          "15%",
          "20%",
          "25%",
          "30%"
        ],

        correctAnswer:
          "20%"
      },

      {
        questionText:
          "Find the next number: 3, 6, 12, 24, ?",

        topic:
          "Number Series",

        options: [
          "36",
          "42",
          "48",
          "54"
        ],

        correctAnswer:
          "48"
      },

      {
        questionText:
          "Choose the synonym of 'Abundant'.",

        topic:
          "Vocabulary",

        options: [
          "Scarce",
          "Plentiful",
          "Weak",
          "Limited"
        ],

        correctAnswer:
          "Plentiful"
      },

      {
        questionText:
          "Which data structure follows the LIFO principle?",

        topic:
          "Data Structures",

        options: [
          "Queue",
          "Stack",
          "Linked List",
          "Tree"
        ],

        correctAnswer:
          "Stack"
      }
    ];
  }

  // ===================================================
  // NEET FALLBACK
  // ===================================================

  else if (normalizedExam === "neet") {

    base = [

      {
        questionText:
          "Which organelle is known as the powerhouse of the cell?",

        topic:
          "Cell Biology",

        options: [
          "Nucleus",
          "Ribosome",
          "Mitochondria",
          "Golgi Apparatus"
        ],

        correctAnswer:
          "Mitochondria"
      },

      {
        questionText:
          "Which molecule carries genetic information in most organisms?",

        topic:
          "Genetics",

        options: [
          "Protein",
          "DNA",
          "Lipid",
          "Glucose"
        ],

        correctAnswer:
          "DNA"
      },

      {
        questionText:
          "Which hormone regulates blood glucose level?",

        topic:
          "Human Physiology",

        options: [
          "Insulin",
          "Thyroxine",
          "Adrenaline",
          "Estrogen"
        ],

        correctAnswer:
          "Insulin"
      },

      {
        questionText:
          "The SI unit of electric current is:",

        topic:
          "Current Electricity",

        options: [
          "Volt",
          "Ohm",
          "Ampere",
          "Watt"
        ],

        correctAnswer:
          "Ampere"
      }
    ];
  }

  // ===================================================
  // JEE FALLBACK
  // ===================================================

  else if (normalizedExam === "jee") {

    base = [

      {
        questionText:
          "If the velocity of a body is doubled, its kinetic energy becomes:",

        topic:
          "Work Energy Power",

        options: [
          "Half",
          "Double",
          "Four times",
          "Unchanged"
        ],

        correctAnswer:
          "Four times"
      },

      {
        questionText:
          "The derivative of x² with respect to x is:",

        topic:
          "Calculus",

        options: [
          "x",
          "2x",
          "x²",
          "2"
        ],

        correctAnswer:
          "2x"
      },

      {
        questionText:
          "The atomic number represents the number of:",

        topic:
          "Inorganic Chemistry",

        options: [
          "Neutrons",
          "Electrons only",
          "Protons",
          "Nucleons"
        ],

        correctAnswer:
          "Protons"
      },

      {
        questionText:
          "Which particle has a negative charge?",

        topic:
          "Modern Physics",

        options: [
          "Proton",
          "Neutron",
          "Electron",
          "Photon"
        ],

        correctAnswer:
          "Electron"
      }
    ];
  }

  else {

    base = [
      {
        questionText:
          "What is 10 + 20?",

        topic:
          "General",

        options: [
          "20",
          "30",
          "40",
          "50"
        ],

        correctAnswer:
          "30"
      }
    ];
  }

  const result = [];

  for (let i = 0; i < count; i++) {

    const question =
      base[i % base.length];

    result.push({
      ...question,

      questionText:
        `${question.questionText} [Fallback-${Date.now()}-${i}]`
    });
  }

  return result;
};

// =====================================================
// FIX QUESTION
// =====================================================

const normalizeQuestion = (question) => {

  if (
    !question ||
    !question.questionText ||
    !Array.isArray(question.options) ||
    question.options.length !== 4
  ) {
    return null;
  }

  let correctAnswer =
    String(
      question.correctAnswer || ""
    ).trim();

  // Convert A/B/C/D to actual option
  const answerMap = {
    A: question.options[0],
    B: question.options[1],
    C: question.options[2],
    D: question.options[3]
  };

  const upperAnswer =
    correctAnswer.toUpperCase();

  if (answerMap[upperAnswer]) {
    correctAnswer =
      answerMap[upperAnswer];
  }

  // Try matching answer text with option
  const matchedOption =
    question.options.find(
      option =>
        String(option)
          .trim()
          .toLowerCase() ===
        correctAnswer
          .trim()
          .toLowerCase()
    );

  if (matchedOption) {
    correctAnswer = matchedOption;
  }

  if (!correctAnswer) {
    return null;
  }

  return {
    questionText:
      String(question.questionText).trim(),

    topic:
      String(
        question.topic || "General"
      ).trim(),

    options:
      question.options.map(
        option => String(option).trim()
      ),

    correctAnswer
  };
};

// =====================================================
// GENERATE QUESTIONS
// =====================================================

const generateQuestions = async (
  exam,
  difficulty,
  totalQuestions
) => {

  const normalizedExam =
    normalizeExam(exam);

  totalQuestions =
    Number(totalQuestions);

  if (
    !Number.isInteger(totalQuestions) ||
    totalQuestions <= 0
  ) {
    totalQuestions = 20;
  }

  console.log(
    "================================="
  );

  console.log(
    "GENERATING TEST"
  );

  console.log(
    "Exam:",
    normalizedExam
  );

  console.log(
    "Difficulty:",
    difficulty
  );

  console.log(
    "Questions:",
    totalQuestions
  );

  console.log(
    "================================="
  );

  try {

    /*
      Smaller chunks reduce invalid JSON
      and reduce token pressure.
    */

    const chunkSize = 10;

    const allQuestions = [];

    for (
      let i = 0;
      i < totalQuestions;
      i += chunkSize
    ) {

      const currentChunk =
        Math.min(
          chunkSize,
          totalQuestions - i
        );

      const prompt =
        buildPrompt(
          normalizedExam,
          difficulty,
          currentChunk,
          i
        ) +
        `

This is question batch starting at question ${i + 1}.

UNIQUE_REQUEST_ID:
${Date.now()}-${Math.random()}
`;

      try {

        const response =
          await client.chat.completions.create({

            model:
              "openai/gpt-oss-safeguard-20b",

            messages: [
              {
                role: "system",
                content:
                  "You are an expert examination question generator. Return ONLY valid JSON."
              },
              {
                role: "user",
                content: prompt
              }
            ],

            temperature: 0.7
          });

        const text =
          response
            ?.choices?.[0]
            ?.message
            ?.content;

        console.log(
          `AI batch ${i + 1}:`,
          text
            ? "Response received"
            : "Empty response"
        );

        const parsed =
          cleanJSON(text);

        if (
          parsed &&
          Array.isArray(
            parsed.questions
          )
        ) {

          for (
            const rawQuestion
            of parsed.questions
          ) {

            const question =
              normalizeQuestion(
                rawQuestion
              );

            if (question) {
              allQuestions.push(
                question
              );
            }
          }

        } else {

          console.log(
            "Invalid AI JSON response"
          );
        }

      } catch (error) {

        console.log(
          `AI Batch ${i + 1} Error:`,
          error.message
        );
      }
    }

    // =================================================
    // REMOVE DUPLICATES
    // =================================================

    const seen =
      new Set();

    const uniqueQuestions =
      [];

    for (
      const question
      of allQuestions
    ) {

      const key =
        question.questionText
          .trim()
          .toLowerCase();

      if (!seen.has(key)) {

        seen.add(key);

        uniqueQuestions.push(
          question
        );
      }
    }

    // =================================================
    // IMPORTANT:
    // For NEET/JEE never use placement fallback
    // =================================================

    if (
      uniqueQuestions.length <
      totalQuestions
    ) {

      const remaining =
        totalQuestions -
        uniqueQuestions.length;

      console.log(
        `Using ${remaining} ${normalizedExam} fallback questions`
      );

      const fallback =
        getFallbackQuestions(
          normalizedExam,
          remaining
        );

      for (
        const question
        of fallback
      ) {

        const key =
          question.questionText
            .trim()
            .toLowerCase();

        if (!seen.has(key)) {

          seen.add(key);

          uniqueQuestions.push(
            question
          );
        }
      }
    }

    return uniqueQuestions.slice(
      0,
      totalQuestions
    );

  } catch (error) {

    console.log(
      "FINAL QUESTION ERROR:",
      error.message
    );

    return getFallbackQuestions(
      normalizedExam,
      totalQuestions
    );
  }
};

// =====================================================
// STUDY SUGGESTIONS
// =====================================================

const generateStudySuggestions = async (
  weakTopics
) => {

  try {

    if (
      !weakTopics ||
      weakTopics.length === 0
    ) {

      return (
        "Great job! No weak topics found.\n" +
        "• Keep practicing\n" +
        "• Try higher difficulty questions"
      );
    }

    const topics =
      weakTopics
        .map(
          topic => topic.topic
        )
        .join(", ");

    const prompt = `
You are an AI tutor.

Weak topics:
${topics}

Give short practical improvement tips.

Rules:
- Only bullet points
- No explanation
- No extra text
`;

    const response =
      await client.chat.completions.create({

        model:
          "openai/gpt-oss-safeguard-20b",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7
      });

    const output =
      response
        ?.choices?.[0]
        ?.message
        ?.content;

    if (
      !output ||
      output.trim() === ""
    ) {

      return (
        "• Revise concepts daily\n" +
        "• Practice MCQs\n" +
        "• Focus on weak areas"
      );
    }

    return output
      .split("\n")
      .map(
        line => line.trim()
      )
      .filter(
        line => line !== ""
      )
      .join("\n");

  } catch (error) {

    console.log(
      "AI Suggestion Error:",
      error.message
    );

    return (
      "• Revise basics\n" +
      "• Practice daily\n" +
      "• Focus on weak topics"
    );
  }
};

// =====================================================
// AI STUDY PLAN
// =====================================================

const generateAIStudyPlan = async (
  weakTopics,
  duration
) => {

  try {

    if (
      !weakTopics ||
      weakTopics.length === 0
    ) {
      return null;
    }

    const topics =
      weakTopics
        .map(
          topic => topic.topic
        )
        .join(", ");

    const prompt = `
You are an expert AI tutor.

Generate a ${duration} day personalized study plan.

Weak Topics:
${topics}

Return ONLY JSON.

{
  "dailyTasks": [
    {
      "day": 1,
      "topic": "Topic Name",
      "task": "Practice topic",
      "estimatedTime": "1 Hour"
    }
  ],
  "monthlyPlan": [
    {
      "week": 1,
      "goal": "Master weak topics"
    }
  ]
}

No explanation.
No markdown.
ONLY JSON.
`;

    const response =
      await client.chat.completions.create({

        model:
          "openai/gpt-oss-safeguard-20b",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7
      });

    const text =
      response
        ?.choices?.[0]
        ?.message
        ?.content;

    return cleanJSON(text);

  } catch (error) {

    console.log(
      "AI Study Plan Error:",
      error.message
    );

    return null;
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  generateQuestions,
  generateStudySuggestions,
  generateAIStudyPlan
};