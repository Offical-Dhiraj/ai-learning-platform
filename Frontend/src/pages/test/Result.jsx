import { useEffect, useState } from "react";
import { getResultsAPI } from "@/features/auth/auth.api";
import Navbar from "@/components/Navbar";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResultsAPI();
        setResults(res.data.results || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, []);

  // ✅ safe check
  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        No results yet
      </div>
    );
  }

  const latest = results[0];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#1e293b] text-white p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">My Result</h1>

        {/* SCORE CARD */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl mb-2">Your Score</h2>

          <p className="text-4xl font-bold text-green-400">
            {latest.score} / {latest.totalQuestions}
          </p>

          <p className="text-gray-300">{latest.percentage}%</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
            <div
              className="bg-green-400 h-3 rounded-full"
              style={{ width: `${latest.percentage || 0}%` }}
            ></div>
          </div>
        </div>

        {/* WEAK TOPICS */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl mb-4 font-bold">Weak Topics</h2>

          {!latest.weakTopics || latest.weakTopics.length === 0 ? (
            <p className="text-green-400 font-bold">
              🎉 No weak topics
            </p>
          ) : (
            latest.weakTopics.map((t, i) => (
              <div
                key={i}
                className="flex justify-between bg-red-500/20 p-3 rounded-lg mb-2"
              >
                <span>{t.topic}</span>
                <span>{t.incorrectCount} wrong</span>
              </div>
            ))
          )}
        </div>

        {/* ✅ AI SUGGESTIONS (IMPROVED) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">AI Suggestions</h2>

          <div className="bg-purple-500/20 p-4 rounded-lg">
            {!latest.suggestions ? (
              <p className="text-gray-300">
                No suggestions available
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {latest.suggestions
                  .split("\n")   // 🔥 split bullet text
                  .filter(line => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* QUESTIONS REVIEW */}
        <div className="space-y-4">
          <h2 className="text-xl mb-2 font-bold">Question Review</h2>

          {latest.questions?.map((q, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                q.isCorrect
                  ? "border-green-400 bg-green-500/10"
                  : "border-red-400 bg-red-500/10"
              }`}
            >
              <p className="font-semibold mb-2">
                {index + 1}. {q.questionText}
              </p>

              <p>
                Your Answer:{" "}
                <span className="font-bold">
                  {q.selectedAnswer || "Not Answered"}
                </span>
              </p>

              {!q.isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span className="text-green-400 font-bold">
                    {q.correctAnswer}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}