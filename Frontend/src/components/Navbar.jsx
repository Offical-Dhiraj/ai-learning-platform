import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg border-b border-white/10">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <h1  onClick={()=>navigate("/")} className="text-2xl font-bold tracking-wide cursor-pointer">
                    Edu<span className="text-blue-400">AI</span>
                </h1>

                {/* LINKS */}
                <div className="flex items-center gap-6 text-sm">

                    <Link
                        to="/"
                        className="hover:text-purple-400 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="hover:text-purple-400 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/results"
                        className="hover:text-purple-400 transition"
                    >
                        Results
                    </Link>

                    <button
                        onClick={() => navigate("/generate-test")}
                        className="bg-purple-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-purple-500 transition"
                    >
                        Take Test
                    </button>

                </div>
            </div>
        </nav>
    );
}