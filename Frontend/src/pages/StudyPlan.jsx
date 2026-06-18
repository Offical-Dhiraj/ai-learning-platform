import { useEffect, useState } from "react";
import {
  getStudyPlanAPI,
  markDayCompletedAPI
} from "@/features/auth/auth.api";

import Navbar from "../components/Navbar";

export default function StudyPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

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
      ? (
          completedTasks /
          dailyTasks.length
        ) * 100
      : 0;

  return (
    <>
      <Navbar />

      {/* Loading */}
      {loading ? (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>

          <h2 className="text-xl font-semibold">
            Loading Study Plan...
          </h2>
        </div>
      ) : !plan ? (

        /* No Plan */
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl font-bold mb-4">
            📚 No Study Plan Found
          </h1>

          <p className="text-gray-400">
            Complete a test and generate a study
            plan first.
          </p>
        </div>

      ) : (

        /* Main Page */
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6">

          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-2">
                🧠 AI Study Plan
              </h1>

              <p className="text-gray-400">
                Personalized roadmap generated
                from your weak topics.
              </p>
            </div>

            {/* Progress */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8">
              <div className="flex justify-between mb-3">
                <h2 className="text-xl font-semibold">
                  Progress
                </h2>

                <span className="font-bold text-green-400">
                  {progress.toFixed(0)}%
                </span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>

              <p className="mt-3 text-gray-300">
                {completedTasks} / {dailyTasks.length}
                Days Completed
              </p>
            </div>

            {/* Weak Topics */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Weak Topics
              </h2>

              <div className="flex flex-wrap gap-3">
                {weakTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-500/20 border border-red-400 rounded-full text-red-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Monthly Goals */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Monthly Goals
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {monthlyPlan.map((item, index) => (
                  <div
                    key={index}
                    className="bg-purple-500/10 border border-purple-400 p-4 rounded-xl"
                  >
                    <h3 className="font-bold text-purple-300">
                      Week {item.week}
                    </h3>

                    <p className="mt-2">
                      {item.goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>


           

{/* Resources */}
<div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    📚 Recommended Resources
  </h2>

  {plan.resources?.length > 0 ? (
    <div className="grid md:grid-cols-2 gap-4">
      {plan.resources.map((resource, index) => (
        <div
          key={index}
          className="bg-slate-800 p-4 rounded-xl"
        >
          <h3 className="text-lg font-bold text-purple-400 mb-2">
            {resource.topic}
          </h3>

          <a
            href={resource.youtube}
            target="_blank"
            rel="noreferrer"
            className="block text-blue-400 hover:underline mb-2"
          >
            📺 Watch Video
          </a>

          <a
            href={resource.article}
            target="_blank"
            rel="noreferrer"
            className="block text-green-400 hover:underline"
          >
            📘 Study Notes
          </a>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400">
      No resources available.
    </p>
  )}
</div>


            {/* Daily Tasks */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Daily Study Tasks
              </h2>

              <div className="grid lg:grid-cols-2 gap-5">

                {dailyTasks.map(task => (
                  <div
                    key={task.day}
                    className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/10 hover:border-purple-500 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">
                        Day {task.day}
                      </h3>

                      {task.completed ? (
                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm">
                          Pending
                        </span>
                      )}
                    </div>

                    <p className="mb-2">
                      <span className="font-semibold text-purple-300">
                        Topic:
                      </span>{" "}
                      {task.topic}
                    </p>

                    <p className="mb-2">
                      <span className="font-semibold text-blue-300">
                        Task:
                      </span>{" "}
                      {task.task}
                    </p>

                    <p className="mb-4">
                      <span className="font-semibold text-green-300">
                        Duration:
                      </span>{" "}
                      {task.estimatedTime}
                    </p>

                    {!task.completed && (
                      <button
                        onClick={() =>
                          markCompleted(task.day)
                        }
                        className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold transition"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}