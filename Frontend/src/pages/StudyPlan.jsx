import { useEffect, useState } from "react";
import {
  getStudyPlanAPI,
  markDayCompletedAPI
} from "@/features/auth/auth.api";
import Navbar from "../components/Navbar";
import Confetti from "react-confetti";
import { toast } from "react-hot-toast";


export default function StudyPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchPlan = async () => {
    try {
      const res = await getStudyPlanAPI();
      setPlan(res.data.studyPlan);
    } catch (error) {
      console.log(error);
      setPlan(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const markCompleted = async (day) => {
  try {
    await markDayCompletedAPI(day);

    setShowConfetti(true);

    toast.success(
      "🎉 Great Job! Task Completed Successfully!",
      {
        duration: 4000,
      }
    );

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    fetchPlan();

  } catch (error) {
    console.log(error);
  }
};

  const dailyTasks = Array.isArray(plan?.dailyTasks)
    ? plan.dailyTasks
    : [];

  const weakTopics = Array.isArray(plan?.weakTopics)
    ? plan.weakTopics
    : [];

  const monthlyPlan = Array.isArray(plan?.monthlyPlan)
    ? plan.monthlyPlan
    : [];

  const completedTasks = dailyTasks.filter(
    task => task.completed
  ).length;

  const progress =
    dailyTasks.length > 0
      ? (completedTasks / dailyTasks.length) * 100
      : 0;

  // =====================
  // LOADING
  // =====================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

          <div className="text-center text-white">

            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <h2 className="text-xl font-semibold">
              Loading Study Plan...
            </h2>

          </div>

        </div>
      </>
    );
  }

  // =====================
  // NO PLAN
  // =====================

  if (!plan) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

          <div className="text-center text-white">

            <h1 className="text-4xl font-bold mb-4">
              No Study Plan Found
            </h1>

            <p className="text-gray-400">
              Complete a test and generate a study plan first.
            </p>

          </div>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={250}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pt-24 pb-12 px-4">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Personalized Study Plan
            </h1>

            <p className="text-gray-400 text-lg">
              AI-generated roadmap based on your performance and weak topics.
            </p>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

              <p className="text-gray-400">
                Progress
              </p>

              <h2 className="text-4xl font-bold text-cyan-400 mt-2">
                {progress.toFixed(0)}%
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

              <p className="text-gray-400">
                Completed
              </p>

              <h2 className="text-4xl font-bold text-green-400 mt-2">
                {completedTasks}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

              <p className="text-gray-400">
                Remaining
              </p>

              <h2 className="text-4xl font-bold text-orange-400 mt-2">
                {dailyTasks.length - completedTasks}
              </h2>

            </div>

          </div>

          {/* PROGRESS BAR */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-xl">

            <div className="flex justify-between mb-3">

              <span>
                Overall Progress
              </span>

              <span className="font-bold text-cyan-400">
                {progress.toFixed(0)}%
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-1000"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

          </div>

          {/* WEAK TOPICS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-5">
              Focus Areas
            </h2>

            <div className="flex flex-wrap gap-3">

              {weakTopics.map((topic, index) => (

                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300"
                >
                  {topic}
                </span>

              ))}

            </div>

          </div>

          {/* MONTHLY GOALS */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-5">
              Monthly Goals
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {monthlyPlan.map((item, index) => (

                <div
                  key={index}
                  className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5"
                >

                  <h3 className="font-bold text-cyan-300">
                    Week {item.week}
                  </h3>

                  <p className="mt-2">
                    {item.goal}
                  </p>

                </div>

              ))}

            </div>

          </div>


          {/* RESOURCES */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-5">
              Recommended Resources
            </h2>

            {Array.isArray(plan?.resources) &&
              plan.resources.length > 0 ? (

              <div className="grid md:grid-cols-2 gap-5">

                {plan.resources.map((resource, index) => (

                  <div
                    key={index}
                    className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/10 hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-300 p-6 rounded-2xl"                  >

                    <h3 className="text-xl font-bold text-white mb-4">
                      {resource.topic}
                    </h3>

                    <div className="flex flex-col gap-3">

                      <a
                        href={resource.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-3 rounded-xl text-center font-semibold transition-all duration-300 hover:scale-[1.02]"                      >
                        📺 Watch Tutorial
                      </a>

                      <a
                        href={resource.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl text-center font-semibold transition-all duration-300 hover:scale-[1.02]"                      >
                        📘 Study Notes
                      </a>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="bg-slate-800 rounded-xl p-6 text-center">

                <p className="text-gray-400 text-lg">
                  No learning resources available.
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Generate a new study plan to get topic-wise resources.
                </p>

              </div>

            )}

          </div>

          {/* DAILY TASKS */}

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Daily Learning Journey
            </h2>

            <div className="space-y-5">

              {dailyTasks.map(task => (

                <div
                  key={task.day}
                  className={`border rounded-3xl p-6 transition-all duration-300
                  ${task.completed
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-white/5 border-white/10 hover:border-cyan-500/30"
                    }`}
                >

                  <div className="flex flex-col md:flex-row md:justify-between gap-4">

                    <div>

                      <h3 className="text-2xl font-bold mb-3">
                        Day {task.day}
                      </h3>

                      <p className="mb-2">

                        <span className="text-cyan-400 font-semibold">
                          Topic:
                        </span>{" "}

                        {task.topic}

                      </p>

                      <p className="mb-2">

                        <span className="text-blue-400 font-semibold">
                          Task:
                        </span>{" "}

                        {task.task}

                      </p>

                      <p>

                        <span className="text-emerald-400 font-semibold">
                          Duration:
                        </span>{" "}

                        {task.estimatedTime}

                      </p>

                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">

                      {task.completed ? (

                        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
                          ✓ Completed
                        </span>

                      ) : (

                        <>
                          <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full font-semibold">
                            Pending
                          </span>

                          <button
                            onClick={() =>
                              markCompleted(task.day)
                            }
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                          >
                            Complete Task
                          </button>
                        </>

                      )}

                    </div>

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











