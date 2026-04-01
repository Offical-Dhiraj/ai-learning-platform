const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

//  CLEAN JSON FUNCTION 
const cleanJSON = (text) => {
  try {
    if (!text) return null;

    // remove markdown
    let cleaned = text.replace(/```json|```/g, "").trim();

    // extract JSON safely
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;

    cleaned = match[0];

    // remove trailing commas
    cleaned = cleaned.replace(/,\s*}/g, "}");
    cleaned = cleaned.replace(/,\s*]/g, "]");

    return JSON.parse(cleaned);
  } catch (err) {
    console.log("JSON CLEAN ERROR:", err.message);
    return null;
  }
};

//  PROMPT BUILDER
const buildPrompt = (exam, difficulty, count) => {
  return `
You are an expert ${exam} exam question generator.

Generate ${count} COMPLETELY NEW and UNIQUE MCQ questions.

Exam: ${exam}
Difficulty: ${difficulty}

STRICT INSTRUCTIONS:

1. Questions MUST be ONLY from ${exam} syllabus.
2. If exam = JEE → ONLY Physics, Chemistry, Mathematics
3. If exam = NEET → ONLY Biology, Physics, Chemistry
4. If exam = PLACEMENT → ONLY Aptitude, Reasoning, Verbal, Coding

5. DO NOT generate generic questions like:
   - 2+2
   - basic synonyms
   - common puzzles

6. Each question must be DIFFERENT from previous generations.

7. Make questions slightly advanced and realistic.

Return ONLY JSON:
{
  "questions": [
    {
      "questionText": "string",
      "topic": "string",
      "options": ["A","B","C","D"],
      "correctAnswer": "string"
    }
  ]
}

CRITICAL:
- No explanation
- No markdown
- No extra text
- ONLY JSON
`;
};

//  FALLBACK QUESTIONS
const getFallbackQuestions = (count = 5) => {
  const base = [
    {
      questionText: "What is 2 + 2?",
      topic: "Aptitude",
      options: ["1", "2", "3", "4"],
      correctAnswer: "4"
    },
    {
      questionText: "Which is a programming language?",
      topic: "Coding",
      options: ["HTML", "Python", "CSS", "HTTP"],
      correctAnswer: "Python"
    },
    {
      questionText: "Choose synonym of Happy",
      topic: "Verbal",
      options: ["Sad", "Joyful", "Angry", "Weak"],
      correctAnswer: "Joyful"
    },
    {
      questionText: "Find next: 2, 4, 8, ?",
      topic: "Reasoning",
      options: ["10", "12", "16", "18"],
      correctAnswer: "16"
    }
  ];

  let result = [];

  for (let i = 0; i < count; i++) {
    const baseQ = base[i % base.length];

    result.push({
      ...baseQ,
      questionText: `${baseQ.questionText} [Fallback-${Date.now()}-${i}]`
    });
  }

  return result;
};

//  MAIN FUNCTION
const generateQuestions = async (exam, difficulty, totalQuestions) => {
  try {
    const chunkSize = 5;
    let promises = [];

    for (let i = 0; i < totalQuestions; i += chunkSize) {
      const currentChunk = Math.min(chunkSize, totalQuestions - i);

      const prompt =
        buildPrompt(exam, difficulty, currentChunk) +
        `\nID: ${Date.now()}-${Math.random()}`;

      promises.push(
        client.chat.completions.create({
          model: "openai/gpt-oss-safeguard-20b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8
        })
      );
    }

    const responses = await Promise.all(promises);

    let allQuestions = [];

    for (let res of responses) {
      const text = res?.choices?.[0]?.message?.content;

      const parsed = cleanJSON(text);

      if (parsed?.questions && Array.isArray(parsed.questions)) {
        allQuestions.push(...parsed.questions);
      } else {
        console.log("⚠️ Invalid AI response → using fallback");
      }
    }

    //  REMOVE DUPLICATES
    const seen = new Set();
    const uniqueQuestions = [];

    for (let q of allQuestions) {
      if (q?.questionText && !seen.has(q.questionText)) {
        seen.add(q.questionText);
        uniqueQuestions.push(q);
      }
    }

    //  FILL REMAINING
    if (uniqueQuestions.length < totalQuestions) {
      const remaining = totalQuestions - uniqueQuestions.length;
      uniqueQuestions.push(...getFallbackQuestions(remaining));
    }

    return uniqueQuestions.slice(0, totalQuestions);

  } catch (error) {
    console.log(" FINAL ERROR:", error.message);
    return getFallbackQuestions(totalQuestions);
  }
};


const generateStudySuggestions = async (weakTopics) => {
  try {
    // ✅ 1. Handle empty weak topics (no change, just improved message)
    if (!weakTopics || weakTopics.length === 0) {
      return "🎉 Great job! No weak topics found.\n• Keep practicing\n• Try higher difficulty questions";
    }

    const topics = weakTopics.map(t => t.topic).join(", ");

    const prompt = `
You are an AI tutor.

Weak topics: ${topics}

Give short, practical improvement tips in bullet points.

Rules:
- Only bullet points
- No explanation
- No extra text
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-safeguard-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    // ✅ 2. SAFE ACCESS (main fix)
    const output = response?.choices?.[0]?.message?.content;

    // ✅ 3. HANDLE EMPTY AI RESPONSE (main fix)
    if (!output || output.trim() === "") {
      return "• Revise concepts daily\n• Practice MCQs\n• Focus on weak areas";
    }

    // ✅ 4. CLEAN OUTPUT (extra improvement)
    const cleaned = output
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "")
      .join("\n");

    return cleaned;

  } catch (error) {
    console.log("AI Suggestion Error:", error.message);

    // ✅ 5. STRONG FALLBACK (important)
    return "• Revise basics\n• Practice daily\n• Focus on weak topics";
  }
};
module.exports = {
  generateQuestions,
  generateStudySuggestions
};