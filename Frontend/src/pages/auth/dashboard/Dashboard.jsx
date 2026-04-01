import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardAPI, getProfile } from "../../../features/auth/auth.api";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTest: 0,
    avgScore: 0,
    accuracy: 0,
  });
  const [recent, setRecent] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trand, setTrand] = useState([])
  const location = useLocation();

  const navigate = useNavigate();

  // Fetch user
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

  // Fetch dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardAPI();
        setStats(res.data.stats || {});
        setRecent(res.data.recent || []);
        setTrand(res.data.trand || []);
      } catch (error) {
        console.log("Dashboard error", error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-white">

      {/* ✅ MOBILE OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* ✅ MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a] p-5 z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        <h2 className="text-2xl font-bold mb-6">
          Edu<span className="text-purple-400">AI</span>
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <button onClick={() => navigate("/dashboard")}> Dashboard</button>
          <button onClick={() => navigate("/generate-test")}> Generate Test</button>
          <button onClick={() => navigate("/results")}> Results</button>
          <button>Study Plan</button>
        </nav>

        <button
          onClick={() => setMenuOpen(false)}
          className="mt-6 text-gray-400"
        >
          Close ✖
        </button>
      </div>

      {/* ✅ DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 bg-[#0f172a] p-5 flex-col justify-between">
        <div>
          <h2
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer mb-6"
          >
            Edu<span className="text-purple-400">AI</span>
          </h2>
          <nav className="flex flex-col gap-3 text-sm">
            <button
              onClick={() => navigate("/dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname === "/dashboard"
                ? "bg-purple-500 text-white"
                : "hover:bg-white/10"
                }`}
            >
              🏠 <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/generate-test")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname === "/generate-test"
                ? "bg-purple-500 text-white"
                : "hover:bg-white/10"
                }`}
            >
              🧠 <span>Generate Test</span>
            </button>
            <button
              onClick={() => navigate("/results")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname === "/results"
                ? "bg-purple-500 text-white"
                : "hover:bg-white/10"
                }`}
            >
              📊 <span>Results</span>
            </button>
            <button
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${location.pathname === "/study-plan"
                ? "bg-purple-500 text-white"
                : "hover:bg-white/10"
                }`}
            >
              📚 <span>Study Plan</span>
            </button>

          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          🚪 <span>Logout</span>
        </button>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setMenuOpen(true)}>☰</button>



          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="text-red-400 text-sm"
          >
            Logout
          </button>
        </div>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-xl md:text-2xl font-bold">
            Welcome {user?.username || "User"} 👋
          </h1>

          <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">
            {user?.email || "Loading..."}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
            <h3 className="text-sm">Tests Taken</h3>
            <p className="text-2xl font-bold">{stats.totalTest}</p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600">
            <h3 className="text-sm">Accuracy</h3>
            <p className="text-2xl font-bold">{stats.accuracy}%</p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-pink-500 to-red-500">
            <h3 className="text-sm">Avg Score</h3>
            <p className="text-2xl font-bold">{stats.avgScore}</p>
          </div>

        </div>

        {/* PERFORMANCE */}
        <div className="bg-white/10 p-5 rounded-xl mb-6">
          <h2 className="mb-3 text-lg font-semibold">Performance</h2>

          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: `${stats.accuracy || 0}%` }}
            />
          </div>

          <p className="text-sm text-gray-300 mt-2">
            {stats.accuracy}% overall accuracy
          </p>
        </div>

        {/* RECENT */}
        <div className="bg-white/10 p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

          {recent.length > 0 ? (
            recent.map((r, i) => (
              <div
                key={i}
                className="flex justify-between bg-white/5 px-3 py-2 rounded mb-2"
              >
                <span>{r.exam}</span>
                <span className="text-green-400">
                  {r.score}/{r.totalQuestions}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No activity yet</p>
          )}
        </div>

      </div>


    </div>

  );
  
}