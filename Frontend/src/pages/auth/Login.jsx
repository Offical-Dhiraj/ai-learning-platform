import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordAPI, loginUser } from "../../features/auth/auth.api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showForgot, setShowForgot] = useState(false)
  const [email, setEmail] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful")
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    }
  };

  const handleForgot=async()=>{
    try {
      await forgotPasswordAPI({email});
      toast.success("Rest link sent on register email.")
      setShowForgot(false)
    } catch (error) {
      toast.error(error.response?.data?.message||"Failed")
    }
  }




  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#100222] via-[#0a4a5c] to-[#02001c]">

        {/* ✅ TOP LEFT LOGO */}
        <div className="absolute top-6 left-8 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-white">Edu</span>
            <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
        </div>

        <div className="w-full max-w-187.5 h-105 flex rounded-2xl overflow-hidden shadow-2xl">

          {/* LEFT SIDE */}
          <div className="w-1/2 bg-[#0f172a]/90 backdrop-blur-xl p-10 text-white flex flex-col justify-center">

            <h2 className="text-xl font-semibold mb-2">
              Login to system
            </h2>

            <p className="text-md text-gray-400 mb-6">
              Please enter your login information or <a className="text-blue-500" href="/register">Click here</a> to registration
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Enter email or username"
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

              <div className="flex justify-end">
                <span onClick={()=>setShowForgot(true)} className="text-sm text-purple-400 cursor-pointer hover:underline">
                  Forgot Password

                </span>

              </div>



              <button className="w-full bg-linear-to-r from-purple-500 to-indigo-500 py-2 rounded-lg cursor-pointer font-semibold hover:opacity-90 transition">
                Login
              </button>

            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2 relative overflow-hidden">

            {/* Gradient Waves Background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#00181d] via-[#011112] to-[#760554]"></div>

            {/* Glow shapes */}
            <div className="absolute w-72 h-72 bg-red-500 blur-3xl opacity-30 rounded-full top-10 left-10"></div>
            <div className="absolute w-72 h-72 bg-blue-500 blur-3xl opacity-30 rounded-full bottom-10 right-10"></div>

            {/* Overlay content */}
            <div className="relative flex items-center justify-center h-full text-white text-center px-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome Back 👋
                </h2>
                <p className="text-sm text-gray-200">
                  Continue your AI learning journey
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-[#0f172a] p-6 rounded-lg w-96">
            <h2 className="text-white text-lg font-semibold mb-4">Reset Password</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-400 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleForgot}
                className="flex-1 bg-purple-500 text-white py-2 rounded hover:opacity-90"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setShowForgot(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:opacity-90"
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