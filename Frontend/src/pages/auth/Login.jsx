import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  loginUser,
  forgotPasswordAPI,
} from "../../features/auth/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [showForgot, setShowForgot] =
    useState(false);

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await loginUser(form);

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Login Successful");

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      return toast.error(
        "Please enter email"
      );
    }

    try {
      await forgotPasswordAPI({ email });

      toast.success(
        "Reset link sent successfully"
      );

      setShowForgot(false);
      setEmail("");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed"
      );
    }
  };

  return (
    <>
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

        {/* Login Card */}
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
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-3">
              Login to continue your AI
              learning journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Username */}

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Email or Username"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

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
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {/* Forgot Password */}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowForgot(true)
                }
                className="text-blue-400 text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition duration-300"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() =>
                navigate("/register")
              }
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}

      {showForgot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6">

            <h2 className="text-white text-xl font-bold mb-4">
              Reset Password
            </h2>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleForgot}
                className="flex-1 bg-blue-500 py-3 rounded-xl text-white"
              >
                Send Link
              </button>

              <button
                onClick={() =>
                  setShowForgot(false)
                }
                className="flex-1 bg-gray-700 py-3 rounded-xl text-white"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}