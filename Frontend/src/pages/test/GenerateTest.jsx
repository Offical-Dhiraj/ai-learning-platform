import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTestAPI } from "../../features/auth/auth.api";
import { toast } from "react-toastify";
import { useTestStore } from "../../store/testStore";
import Navbar from "@/components/Navbar";

export default function GenerateTest() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    exam: "placement",
    difficulty: "easy",
  });

  const [loading, setLoading] = useState(false);

  const { startTest } = useTestStore();

  const handleGenerate = async () => {
    try {

      setLoading(true);

      const res = await generateTestAPI(form);

      const test = res.data.test;

      startTest(test.questions);

      navigate("/test");

    } catch (err) {

      if (
        err?.response?.data?.message ===
        "You already have an active test. Complete it first."
      ) {
        navigate("/test");
        return;
      }

      console.log(err);

      toast.error("Failed to generate test");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pt-24 px-4">

        <div className="max-w-5xl mx-auto">

          {/* HERO */}

          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/10 rounded-3xl p-8 mb-8 backdrop-blur-xl">

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              AI Test Generator
            </h1>

            <p className="text-gray-400 text-lg">
              Generate personalized AI-powered tests based on your selected exam and difficulty level.
            </p>

          </div>

          {/* MAIN CARD */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-6">
              Test Configuration
            </h2>



                        {/* EXAM */}

            <label className="block mb-2 text-gray-300">
              Select Exam
            </label>

            <select
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none mb-6"
              value={form.exam}
              onChange={(e) =>
                setForm({
                  ...form,
                  exam: e.target.value,
                })
              }
            >
              <option value="placement">
                Placement
              </option>

              <option value="neet">
                NEET
              </option>

              <option value="jee">
                IIT JEE
              </option>

            </select>

            {/* DIFFICULTY */}

            <label className="block mb-2 text-gray-300">
              Difficulty Level
            </label>

            <select
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none mb-8"
              value={form.difficulty}
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty: e.target.value,
                })
              }
            >
              <option value="easy">
                Easy
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="hard">
                Hard
              </option>

            </select>

            {/* INFO CARDS */}

            <div className="grid md:grid-cols-3 gap-4 mb-8">

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">

                <h3 className="font-semibold text-cyan-400 mb-2">
                  Smart Questions
                </h3>

                <p className="text-sm text-gray-400">
                  AI generates unique questions every time.
                </p>

              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">

                <h3 className="font-semibold text-emerald-400 mb-2">
                  Instant Analysis
                </h3>

                <p className="text-sm text-gray-400">
                  Get score, weak topics and suggestions.
                </p>

              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">

                <h3 className="font-semibold text-blue-400 mb-2">
                  Study Plan
                </h3>

                <p className="text-sm text-gray-400">
                  Personalized roadmap after every test.
                </p>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg disabled:opacity-60"
            >

              {loading ? (

                <div className="flex items-center justify-center gap-3">

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  Generating Test...

                </div>

              ) : (

                "Generate Test"

              )}

            </button>

          </div>

        </div>

      </div>

    </>
  );
}