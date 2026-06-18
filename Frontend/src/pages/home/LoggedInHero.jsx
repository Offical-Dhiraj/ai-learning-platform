import { useNavigate } from "react-router-dom";

export default function LoggedInHero({
  user,
  stats
}) {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">

          <h1 className="text-5xl font-bold">
            Welcome Back,
            <span className="text-blue-400">
              {" "}
              {user?.username || "Student"}
            </span>
            👋
          </h1>

          <p className="text-slate-300 mt-4 text-lg">
            Ready for today's learning session?
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-4xl font-bold text-blue-400">
                {stats.totalTest || 0}
              </h3>

              <p>Tests Completed</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-4xl font-bold text-green-400">
                {stats.accuracy || 0}%
              </h3>

              <p>Accuracy</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="text-4xl font-bold text-purple-400">
                {stats.avgScore || 0}
              </h3>

              <p>Average Score</p>
            </div>

          </div>

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={() =>
                navigate("/study-plan")
              }
              className="px-8 py-4 bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Continue Study Plan
            </button>

            <button
              onClick={() =>
                navigate("/generate-test")
              }
              className="px-8 py-4 bg-purple-500 rounded-xl hover:bg-purple-600"
            >
              Generate Test
            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="px-8 py-4 border border-slate-600 rounded-xl"
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}