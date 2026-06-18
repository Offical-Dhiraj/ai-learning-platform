import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const navLink = (path) =>
    location.pathname === path
      ? "text-blue-400 font-semibold"
      : "text-white hover:text-blue-400 transition";

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-bold text-white">
            Edu<span className="text-blue-400">AI</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <button
            onClick={() => navigate("/")}
            className={navLink("/")}
          >
            Home
          </button>

          {token && (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={navLink("/dashboard")}
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("/generate-test")}
                className={navLink("/generate-test")}
              >
                Generate Test
              </button>

              <button
                onClick={() => navigate("/study-plan")}
                className={navLink("/study-plan")}
              >
                Study Plan
              </button>

              <button
                onClick={() => navigate("/results")}
                className={navLink("/results")}
              >
                Results
              </button>
            </>
          )}

          {!token ? (
            <div className="flex gap-3">

              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition"
              >
                Register
              </button>

            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition"
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-slate-950 border-t border-white/10 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >

        <div className="flex flex-col px-6 py-5 gap-5">

          <button
            onClick={() => handleNavigate("/")}
            className={navLink("/")}
          >
            Home
          </button>

          {token && (
            <>
              <button
                onClick={() => handleNavigate("/dashboard")}
                className={navLink("/dashboard")}
              >
                Dashboard
              </button>

              <button
                onClick={() => handleNavigate("/generate-test")}
                className={navLink("/generate-test")}
              >
                Generate Test
              </button>

              <button
                onClick={() => handleNavigate("/study-plan")}
                className={navLink("/study-plan")}
              >
                Study Plan
              </button>

              <button
                onClick={() => handleNavigate("/results")}
                className={navLink("/results")}
              >
                Results
              </button>
            </>
          )}

          {!token ? (
            <>
              <button
                onClick={() => handleNavigate("/login")}
                className="border border-white/20 py-3 rounded-xl"
              >
                Login
              </button>

              <button
                onClick={() => handleNavigate("/register")}
                className="bg-blue-500 py-3 rounded-xl"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 py-3 rounded-xl"
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}