import { useState } from "react";
import { generateTestAPI } from "../../features/auth/auth.api";
import { toast } from "react-toastify";
import { useTestStore } from "../../store/testStore";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";



export default function GenerateTest() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        exam: "placement",
        difficulty: "easy",
    });

    const [loading, setLoading] = useState(false);

    const { testActive, startTest } = useTestStore();
    const handleGenerate = async () => {
        console.log(form.exam);

        try {
            if (testActive) {
                alert("⚠️ Finish current test first!");
                return;
            }

            setLoading(true);

            const res = await generateTestAPI(form);

            startTest(res.data.questions); // store in Zustand

            navigate("/test"); // 🔥 IMPORTANT

        } catch (err) {
            console.log(err);
            alert("Failed to generate test");
        } finally {
            setLoading(false);
        }
    };
    const handleSelect = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleSubmit = () => {
        console.log("User Answers:", answers);
        toast.success("Test Submitted successful")
    };
    return (
        <>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] to-[#1e293b] p-6 text-white">

            <div className="w-full max-w-3xl">

                {/* HEADER */}
                <h1 className="text-3xl font-bold mb-6 text-center">
                    AI Test Generator
                </h1>

                {/* FORM */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">

                    {/* Exam */}
                    <label className="text-sm mb-1 block">Select Exam</label>
                    <select
                        className="w-full p-3 rounded-lg bg-white/20 border border-white/30 mb-4"
                        value={form.exam}
                        onChange={(e) =>
                            setForm({ ...form, exam: e.target.value })
                        }
                    >
                        <option className="bg-gray-400 text-shadow-white" value="placement">Placement</option>
                        <option className="bg-gray-400 text-shadow-white" value="neet">NEET</option>
                        <option className="bg-gray-400 text-shadow-white" value="jee">IIT JEE</option>
                    </select>

                    {/* Difficulty */}
                    <label className="text-sm mb-1 block">Difficulty</label>
                    <select
                        className="w-full p-3 rounded-lg bg-white/20 border border-white/30 mb-4"
                        value={form.difficulty}
                        onChange={(e) =>
                            setForm({ ...form, difficulty: e.target.value })
                        }
                    >
                        <option className="bg-gray-400 text-shadow-white" value="easy">Easy</option>
                        <option className="bg-gray-400 text-shadow-white" value="medium">Medium</option>
                        <option className="bg-gray-400 text-shadow-white" value="hard">Hard</option>
                    </select>

                    {/* BUTTON */}
                    <button
                        onClick={handleGenerate}
                        className="w-full py-3 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105 transition font-semibold"
                    >
                        {loading ? "Generating..." : "✨ Generate Test"}
                    </button>
                </div>



            </div>
        </div>

</>
    );

}