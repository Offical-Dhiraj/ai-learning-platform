import { useTestStore } from "@/store/testStore";
import { useNavigate } from "react-router-dom";
import { saveResultAPI } from "@/features/auth/auth.api";
import Navbar from "@/components/Navbar"; // ✅ your navbar

export default function Test() {
  const navigate = useNavigate();

  const { questions, answers, setAnswer, resetTest } = useTestStore();

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl">No test found. Generate a test first.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      if (Object.keys(answers).length < questions.length) {
        const confirmSubmit = confirm(
          "Some questions are unanswered. Submit anyway?"
        );
        if (!confirmSubmit) return;
      }

      const formattedQuestions = questions.map((q, index) => ({
        questionText: q.questionText,
        topic: q.topic || "General",
        options: q.options,
        correctAnswer: q.correctAnswer,
        selectedAnswer: answers[index] || null,
      }));

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          🧠 AI Test
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Attempt all questions and submit
        </p>
      </div>

      {/* QUESTIONS */}
      <div className="max-w-4xl mx-auto px-4 pb-24 space-y-6">

        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            {/* Question */}
            <h2 className="text-base md:text-lg font-semibold mb-4">
              {index + 1}. {q.questionText}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = answers[index] === opt;

                return (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                      isSelected
                        ? "bg-purple-500 text-white"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${index}`}
                      checked={isSelected}
                      onChange={() => setAnswer(index, opt)}
                      className="accent-purple-500"
                    />
                    <span className="text-sm md:text-base">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {/* ✅ STICKY SUBMIT BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0f172a]/90 backdrop-blur-lg border-t border-white/20 py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">

          <span className="text-gray-300 text-sm">
            Answered: {Object.keys(answers).length} / {questions.length}
          </span>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition font-semibold"
          >
            Submit Test
          </button>

        </div>
      </div>

    </div>
  );
}