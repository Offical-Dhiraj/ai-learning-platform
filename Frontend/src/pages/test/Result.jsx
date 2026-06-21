import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResultsAPI } from "@/features/auth/auth.api";
import { GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResultsAPI();
        setResults(res.data.results || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };


    fetchResults();


  }, []);

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <> <Navbar />


        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="text-gray-400 mt-4 text-lg">
              Loading Results...
            </p>
          </div>
        </div>
      </>
    );


  }

  // =========================
  // NO RESULTS
  // =========================

  if (!results || results.length === 0) {
    return (
      <> <Navbar />


        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
          <div className="max-w-xl text-center">

            



            <h1 className="text-4xl font-bold text-white mb-4">
              No Results Available
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              You haven't completed any tests yet.
              Generate your first AI-powered test and start
              tracking your progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <button
                onClick={() => navigate("/generate-test")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-300"
              >
                🚀 Generate Test
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3 border border-gray-600 hover:bg-white/10 rounded-xl text-white font-semibold transition-all duration-300"
              >
                📈 Dashboard
              </button>

            </div>

          </div>
        </div>
      </>
    );


  }

  const latest = results[0];

  return (
    <> <Navbar />


      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-12">

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* HERO SECTION */}

          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 mb-8 shadow-xl">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10">




              <div className="flex items-center gap-3 mb-3">
                <GraduationCap size={40} className="text-cyan-400" />

                <h1 className="text-3xl md:text-5xl font-bold">
                  Performance Report
                </h1>
              </div>

              <p className="text-white/90 text-lg">
                Review your test performance, identify weak areas,
                and get AI-powered improvement suggestions.
              </p>

            </div>

          </div>

          {/* SCORE SECTION */}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">

            {/* MAIN SCORE CARD */}

            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">

              <h2 className="text-xl font-semibold mb-6">
                Overall Performance
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-6">

                <div>

                  <p className="text-5xl md:text-6xl font-bold text-green-400">
                    {latest.score}
                  </p>

                  <p className="text-gray-400 mt-1">
                    out of {latest.totalQuestions}
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-4xl md:text-5xl font-bold text-blue-400">
                    {latest.percentage}%
                  </p>

                  <p className="text-gray-400">
                    Accuracy
                  </p>

                </div>

              </div>

              <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mt-6">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{
                    width: `${latest.percentage || 0}%`
                  }}
                />

              </div>

            </div>

            {/* STATS */}

            <div className="space-y-4">

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">

                <h3 className="text-gray-400 text-sm">
                  Total Questions
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {latest.totalQuestions}
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">

                <h3 className="text-gray-400 text-sm">
                  Correct Answers
                </h3>

                <p className="text-3xl font-bold mt-2 text-green-400">
                  {latest.score}
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">

                <h3 className="text-gray-400 text-sm">
                  Wrong Answers
                </h3>

                <p className="text-3xl font-bold mt-2 text-red-400">
                  {latest.totalQuestions - latest.score}
                </p>

              </div>

            </div>

          </div>

          {/* WEAK TOPICS */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              🎯 Weak Topics Analysis
            </h2>

            {!latest.weakTopics || latest.weakTopics.length === 0 ? (

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">

                <p className="text-green-400 font-semibold">
                  🎉 Excellent! No weak topics detected.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-4">

                {latest.weakTopics.map((topic, index) => (

                  <div
                    key={index}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 hover:scale-[1.02] transition-all duration-300"
                  >

                    <h3 className="font-semibold text-lg">
                      {topic.topic}
                    </h3>

                    <p className="text-red-400 mt-2">
                      {topic.incorrectCount} Incorrect Answers
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* AI SUGGESTIONS */}

          <div className="bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 backdrop-blur-xl rounded-3xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              🤖 AI Study Suggestions
            </h2>

            {!latest.suggestions ? (

              <p className="text-gray-400">
                No suggestions available.
              </p>

            ) : (

              <div className="space-y-3">

                {latest.suggestions
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map((line, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-xl"
                    >

                      <span className="text-purple-400 text-lg">
                        ✓
                      </span>

                      <p className="text-gray-200">
                        {line}
                      </p>

                    </div>

                  ))}

              </div>

            )}

          </div>

          {/* QUESTION REVIEW */}

          <div>

            <h2 className="text-2xl font-bold mb-6">
              📝 Question Review
            </h2>

            <div className="space-y-5">

              {latest.questions?.map((question, index) => (

                <div
                  key={index}
                  className={`rounded-3xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-[1.01]
              ${question.isCorrect
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                    }`}
                >

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">

                    <h3 className="font-semibold text-lg">
                      Question {index + 1}
                    </h3>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold w-fit
                  ${question.isCorrect
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {question.isCorrect
                        ? "✅ Correct"
                        : "❌ Incorrect"}
                    </span>

                  </div>

                  <p className="mb-4 text-gray-200">
                    {question.questionText}
                  </p>

                  <div className="space-y-2">

                    <p>

                      <span className="text-gray-400">
                        Your Answer:
                      </span>

                      <span className="ml-2 font-semibold">
                        {question.selectedAnswer || "Not Answered"}
                      </span>

                    </p>

                    {!question.isCorrect && (

                      <p>

                        <span className="text-gray-400">
                          Correct Answer:
                        </span>

                        <span className="ml-2 text-green-400 font-semibold">
                          {question.correctAnswer}
                        </span>

                      </p>

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </>


  );
}
