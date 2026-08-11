import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { resetPasswordAPI } from "../../features/auth/auth.api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both passwords");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPasswordAPI(token, {
        newPassword,
        confirmPassword,
      });

      toast.success(
        res.data.message ||
          "Password reset successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid or expired reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[140px] rounded-full" />

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

          <div className="text-4xl mb-4">
            🔐
          </div>

          <h2 className="text-3xl font-bold text-white">
            Reset Password
          </h2>

          <p className="text-gray-400 mt-3">
            Create a new password for your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* New Password */}

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="New Password"
              required
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

          {/* Confirm Password */}

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
              required
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-50"
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </motion.div>

    </div>
  );
}