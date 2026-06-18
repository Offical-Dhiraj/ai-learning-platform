import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";

import { registerUser } from "../../features/auth/auth.api";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    targetExam: "PLACEMENT",
  });

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

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full"></div>

      {/* Logo */}

      <div className="absolute top-8 left-8">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-white cursor-pointer"
        >
          Edu
          <span className="text-blue-400">
            AI
          </span>
        </h1>
      </div>

      {/* Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-white">
            Create Account 
          </h2>

          <p className="text-gray-400 mt-3">
            Start your AI-powered learning
            journey today.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Username */}

          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Email */}

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

          </div>

          {/* Password */}

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* Target Exam */}

          <div className="relative">

            <GraduationCap
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <select
              name="targetExam"
              value={form.targetExam}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            >
              <option
                value="PLACEMENT"
                className="text-black"
              >
                Placement
              </option>

              <option
                value="IIT"
                className="text-black"
              >
                IIT JEE
              </option>

              <option
                value="NEET"
                className="text-black"
              >
                NEET
              </option>
            </select>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition duration-300"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}