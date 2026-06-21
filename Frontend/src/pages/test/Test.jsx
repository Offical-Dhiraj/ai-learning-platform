import { useEffect, useState } from "react";
import { useTestStore } from "@/store/testStore";
import { useNavigate } from "react-router-dom";
import { saveResultAPI, getCurrentTestAPI } from "@/features/auth/auth.api";
import Navbar from "@/components/Navbar";

export default function Test() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { questions, answers, setAnswer, resetTest, startTest } =
    useTestStore();

  useEffect(() => {
    const loadCurrentTest = async () => {
      try {
        // If Zustand already has questions
        if (questions.length > 0) {
          setLoading(false);
          return;
        }

        // Load active test from DB
        const res = await getCurrentTestAPI();

        if (res.data.success) {
          startTest(res.data.test.questions);
        }
      } catch (error) {
        console.log("Load Test Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentTest();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h2 className="text-2xl font-bold">Loading Test...</h2>
      </div>
    );
  }

  // No Active Test
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">No Active Test</h2>

            <p className="text-gray-400">Generate a new AI test first.</p>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  const progress = (answeredCount / questions.length) * 100;

  const handleSubmit = async () => {
    try {
      console.log("Questions from store:", questions);

      const formattedQuestions = questions.map((q, index) => ({
        questionText: q.questionText,
        topic: q.topic || "General",
        options: q.options,
        correctAnswer: q.correctAnswer,
        selectedAnswer: answers[index] || null,
      }));

      console.log("Submitting:", formattedQuestions);

      const res = await saveResultAPI({
        exam: "placement",
        difficulty: "easy",
        questions: formattedQuestions,
      });

      alert(`Score: ${res.data.score}/${res.data.totalQuestions}`);

      resetTest();

      navigate("/results");
    } catch (error) {
      console.log(error);
      alert("Failed to submit test");
    }
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-4">
          {/* HERO */}

          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/10 rounded-3xl p-6 mb-6 backdrop-blur-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              AI Assessment Test
            </h1>

            <p className="text-gray-400">
              Answer all questions carefully before submitting.
            </p>
          </div>

          {/* PROGRESS */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <div className="flex justify-between mb-3">
              <span>Progress</span>

              <span className="text-cyan-400 font-bold">
                {answeredCount}/{questions.length}
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* QUESTION NAVIGATOR */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <h2 className="font-semibold mb-4">Question Navigator</h2>

            <div className="flex flex-wrap gap-3">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${answers[index] ? "bg-cyan-500" : "bg-slate-700"}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* QUESTIONS */}

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
              >
                {/* QUESTION */}

                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold">
                    {q.questionText}
                  </h2>
                </div>

                {/* OPTIONS */}

                <div className="space-y-3">
                  {q.options.map((option, optionIndex) => {
                    const selected = answers[index] === option;

                    return (
                      <label
                        key={optionIndex}
                        className={`
                        flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border

                        ${
                          selected
                            ? "bg-cyan-500/20 border-cyan-500"
                            : "bg-white/5 border-white/10 hover:border-cyan-500/40 hover:bg-white/10"
                        }
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={selected}
                          onChange={() => setAnswer(index, option)}
                          className="accent-cyan-500"
                        />

                        <span className="text-gray-200">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STICKY SUBMIT BAR */}

        <div className="fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm">Answered Questions</p>

                <h3 className="font-bold text-lg">
                  {answeredCount} / {questions.length}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Completion</p>

                  <h3 className="font-bold text-cyan-400">
                    {Math.round(progress)}%
                  </h3>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-2xl font-semibold shadow-lg"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
