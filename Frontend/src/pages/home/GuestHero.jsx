import { useNavigate } from "react-router-dom";

export default function GuestHero() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400">
          🚀 AI Powered Learning Platform
        </span>

        <h1 className="text-6xl md:text-7xl font-bold mt-8">
          Master Any Exam
          <br />
          With AI
        </h1>

        <p className="text-xl text-slate-300 mt-6 max-w-3xl mx-auto">
          Generate tests, identify weak topics,
          get personalized study plans and
          improve faster with AI.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
            onClick={() =>
              navigate("/register")
            }
            className="px-8 py-4 bg-blue-500 rounded-xl"
          >
            Start Free
          </button>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="px-8 py-4 border border-slate-600 rounded-xl"
          >
            Login
          </button>

        </div>

      </div>

    </section>
  );
}