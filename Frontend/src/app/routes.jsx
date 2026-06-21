import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/auth/dashboard/Dashboard";
import GenerateTest from "../pages/test/GenerateTest";
import Test from "../pages/test/Test";
import Results from "../pages/test/Result";
import StudyPlan from "../pages/StudyPlan";
import Chat from "../pages/Chat";

import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/generate-test" element={<GenerateTest />} />
      <Route path="/results" element={<Results />} />
      <Route path="/study-plan" element={<StudyPlan />} />
      <Route path="/test" element={<Test />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
