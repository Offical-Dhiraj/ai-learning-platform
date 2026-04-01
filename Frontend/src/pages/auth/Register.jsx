import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/auth.api";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    targetExam: "PLACEMENT",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser(form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "All fields are required");
    } finally {
      setLoading(false);
    }
  };

return (
 

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#100222] via-[#0a4a5c] to-[#02001c]">

 {/*  TOP LEFT LOGO */}
      <div className="absolute top-6 left-8 cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-white">Edu</span>
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            AI
          </span>
        </h1>
      </div>
      

      <div className="w-[800px] h-[480px] flex rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT PANEL (FORM) */}
        <div className="w-1/2 bg-[#0f172a]/90 backdrop-blur-xl p-8 text-white flex flex-col justify-center">

          <h2 className="text-xl font-semibold mb-2">
            Create Account
          </h2>

          <p className="text-xs text-gray-400 mb-6">
            Join and start your AI learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            />

            <select
              name="targetExam"
              value={form.targetExam}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white outline-none focus:border-purple-400"
            >
              <option className="text-black bg-white/5 border-white/10" value="PLACEMENT">Placement</option>
              <option className="text-black bg-white/5 border-white/10" value="IIT">IIT JEE</option>
              <option className="text-black bg-white/5 border-white/10" value="NEET">NEET</option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-500 cursor-pointer to-indigo-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-xs mt-4 text-gray-400 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>

        {/* RIGHT PANEL (VISUAL) */}
        <div className="w-1/2 relative overflow-hidden">

          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00181d] via-[#011112] to-[#760554]"></div>

          {/* Glow effects */}
          <div className="absolute w-72 h-72 bg-pink-500 blur-3xl opacity-30 rounded-full top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-blue-500 blur-3xl opacity-30 rounded-full bottom-10 right-10"></div>

          {/* Content */}
          <div className="relative flex items-center justify-center h-full text-white text-center px-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Welcome 
              </h2>
              <p className="text-sm text-gray-200">
                Create your account and unlock AI-powered learning tools
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  
  );
}