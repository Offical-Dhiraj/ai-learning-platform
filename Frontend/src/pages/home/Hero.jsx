import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 mb-6">
                AI Powered Learning Platform
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Learn Smarter
              <br />
              <span className="text-blue-400">
                Not Harder
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-300 leading-relaxed max-w-xl">
              Generate intelligent tests, identify weak topics,
              receive personalized study plans and improve
              your exam preparation with AI.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              {token ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold"
                >
                  Go To Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold"
                  >
                    Start Learning Free
                  </button>

                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-4 border border-slate-600 text-white rounded-xl hover:bg-white/10"
                  >
                    Login
                  </button>
                </>
              )}

            </div>

            <div className="flex gap-10 mt-16">

              <div>
                <h3 className="text-4xl font-bold text-blue-400">
                  10K+
                </h3>

                <p className="text-slate-400">
                  Questions Generated
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-green-400">
                  500+
                </h3>

                <p className="text-slate-400">
                  Study Plans
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-purple-400">
                  95%
                </h3>

                <p className="text-slate-400">
                  Success Rate
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg hover:scale-105 transition">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-bold text-white">
                Test Generation
              </h3>
              <p className="text-slate-400 mt-2">
                Generate unique tests instantly.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg hover:scale-105 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white">
                Analytics
              </h3>
              <p className="text-slate-400 mt-2">
                Track your performance.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg hover:scale-105 transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white">
                Study Plans
              </h3>
              <p className="text-slate-400 mt-2">
                Personalized learning roadmap.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg hover:scale-105 transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white">
                Weak Topics
              </h3>
              <p className="text-slate-400 mt-2">
                Improve faster with AI insights.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}