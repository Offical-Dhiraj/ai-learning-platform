import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getDashboardAPI,
  getProfile,
} from "../../../features/auth/auth.api";

import {
  LayoutDashboard,
  Brain,
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [stats, setStats] = useState({
    totalTest: 0,
    avgScore: 0,
    accuracy: 0,
  });

  const [recent, setRecent] = useState([]);
  const [trand, setTrand] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardAPI();

        setStats(res.data.stats || {});
        setRecent(res.data.recent || []);
        setTrand(res.data.trand || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-white/10 z-50 transform transition-all duration-300
        ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-6">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Edu<span className="text-cyan-400">AI</span>
            </h2>

            <button
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>

          </div>

          <nav className="space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/generate-test")
              }
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
            >
              <Brain size={18} />
              Generate Test
            </button>

            <button
              onClick={() => navigate("/results")}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
            >
              <BarChart3 size={18} />
              Results
            </button>

            <button
              onClick={() =>
                navigate("/study-plan")
              }
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10"
            >
              <BookOpen size={18} />
              Study Plan
            </button>

          </nav>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}

      <aside className="hidden md:flex w-72 bg-slate-900 border-r border-white/10 flex-col justify-between p-6">

        <div>

          <h2
            onClick={() => navigate("/")}
            className="text-3xl font-bold cursor-pointer mb-10"
          >
            Edu<span className="text-cyan-400">AI</span>
          </h2>

          <nav className="space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                location.pathname === "/dashboard"
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/generate-test")
              }
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                location.pathname ===
                "/generate-test"
                  ? "bg-cyan-500"
                  : "hover:bg-white/10"
              }`}
            >
              <Brain size={18} />
              Generate Test
            </button>

            <button
              onClick={() => navigate("/results")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                location.pathname === "/results"
                  ? "bg-cyan-500"
                  : "hover:bg-white/10"
              }`}
            >
              <BarChart3 size={18} />
              Results
            </button>

            <button
              onClick={() =>
                navigate("/study-plan")
              }
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                location.pathname ===
                "/study-plan"
                  ? "bg-cyan-500"
                  : "hover:bg-white/10"
              }`}
            >
              <BookOpen size={18} />
              Study Plan
            </button>

          </nav>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-4 md:p-8">

        <div className="md:hidden flex justify-between items-center mb-6">

          <button
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="text-red-400"
          >
            Logout
          </button>

        </div>

        {/* HERO */}

        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/10 rounded-3xl p-8 mb-6 backdrop-blur-xl">

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back,
            {" "}
            {user?.username || "User"}
          </h1>

          <p className="text-gray-400">
            Track your learning progress and improve your weak areas.
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <p className="text-gray-400">
              Total Tests
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {stats.totalTest}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <p className="text-gray-400">
              Accuracy
            </p>

            <h2 className="text-4xl font-bold text-emerald-400 mt-2">
              {stats.accuracy}%
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <p className="text-gray-400">
              Avg Score
            </p>

            <h2 className="text-4xl font-bold text-orange-400 mt-2">
              {stats.avgScore}
            </h2>
          </div>

        </div>


                {/* PERFORMANCE */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 backdrop-blur-xl">

          <div className="flex justify-between mb-4">

            <h2 className="text-xl font-bold">
              Learning Performance
            </h2>

            <span className="text-cyan-400 font-bold">
              {stats.accuracy}%
            </span>

          </div>

          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

            <div
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-4 rounded-full transition-all duration-1000"
              style={{
                width: `${stats.accuracy || 0}%`
              }}
            />

          </div>

          <p className="text-gray-400 mt-3">
            Overall learning accuracy across all tests.
          </p>

        </div>

        {/* CHART + RECENT */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* TREND CHART */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-xl font-bold mb-5">
              Progress Trend
            </h2>

            {trand.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={trand}>

                  <XAxis
                    dataKey="exam"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#06b6d4"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            ) : (

              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No chart data available
              </div>

            )}

          </div>

          {/* RECENT ACTIVITY */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-xl font-bold mb-5">
              Recent Activity
            </h2>

            {recent.length > 0 ? (

              <div className="space-y-4">

                {recent.map((r, i) => (

                  <div
                    key={i}
                    className="bg-white/5 hover:bg-white/10 transition p-4 rounded-2xl flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {r.exam}
                      </h3>

                      <p className="text-sm text-gray-400">
                        Test Completed
                      </p>

                    </div>

                    <span className="text-emerald-400 font-bold">
                      {r.score}/{r.totalQuestions}
                    </span>

                  </div>

                ))}

              </div>

            ) : (

              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No activity yet
              </div>

            )}

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="grid md:grid-cols-3 gap-5">

          <button
            onClick={() => navigate("/generate-test")}
            className="bg-cyan-500 hover:bg-cyan-600 transition-all rounded-2xl p-6 text-left"
          >

            <h3 className="text-xl font-bold mb-2">
              Generate Test
            </h3>

            <p className="text-white/80">
              Create a new AI-powered test.
            </p>

          </button>

          <button
            onClick={() => navigate("/results")}
            className="bg-emerald-500 hover:bg-emerald-600 transition-all rounded-2xl p-6 text-left"
          >

            <h3 className="text-xl font-bold mb-2">
              View Results
            </h3>

            <p className="text-white/80">
              Analyze your previous performance.
            </p>

          </button>

          <button
            onClick={() => navigate("/study-plan")}
            className="bg-blue-500 hover:bg-blue-600 transition-all rounded-2xl p-6 text-left"
          >

            <h3 className="text-xl font-bold mb-2">
              Study Plan
            </h3>

            <p className="text-white/80">
              Follow your personalized roadmap.
            </p>

          </button>

        </div>

      </main>

    </div>
  );
}