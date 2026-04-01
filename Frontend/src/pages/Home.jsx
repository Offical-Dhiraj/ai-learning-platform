import { useNavigate } from "react-router-dom";
import heroImg from "../assets/Heroimag.avif";



export default function Home() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col"
            style={{
                backgroundImage: `url(${heroImg})`,
            }}
        >
            {/* Overlay */}
            <div className="min-h-screen bg-linear-to-br from-black/80 via-black/60 to-black/80 flex flex-col">

                {/* Navbar */}
                <div className="flex justify-between items-center px-8 py-4 text-white">
                    <h1 onChange={"/login"} className="text-2xl font-bold tracking-wide">
                        Edu<span className="text-blue-400">AI</span>
                    </h1>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-white/40 px-5 py-2 cursor-pointer bg-blue-400 hover:bg-blue-400 rounded-lg  transition"
                    >
                        Login
                    </button>
                </div>

                {/* Center Content */}
                <div className="flex flex-1 items-center justify-center text-center px-6">
                    <div className="max-w-3xl space-y-6">

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                            Transform Your Learning with <span className="text-blue-400">AI</span> 🚀
                        </h1>

                        {/* Subtext */}
                        <p className=" text-white text-lg leading-relaxed">
                            Experience a smarter way to study. Generate intelligent tests, analyze your performance,
                            and follow a personalized learning path designed just for you.

                            Whether you're preparing for competitive exams, improving your coding skills,
                            or mastering new subjects — EduAI helps you stay ahead with data-driven insights
                            and adaptive learning powered by artificial intelligence.
                        </p>

                        {/* Features Highlight */}
                        <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm text-gray-300">
                            <span className="bg-white/10 px-4 py-2 rounded-full">🧠 AI Test Generation</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full">📊 Performance Tracking</span>
                            <span className="bg-white/10 px-4 py-2 rounded-full">🎯 Smart Study Plans</span>
                        </div>

                        {/* CTA */}
                        <div className="pt-6">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-400 px-8 py-3 rounded-xl cursor-pointer text-white font-semibold shadow-lg hover:scale-105 hover:bg-blue-400 transition"
                            >
                                Get Started
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}