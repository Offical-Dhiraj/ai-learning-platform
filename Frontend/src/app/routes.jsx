import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/auth/dashboard/Dashboard";
import GenerateTest from "../pages/test/GenerateTest";
import Test from "../pages/test/Test";
import Results from "../pages/test/Result";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/generate-test" element={<GenerateTest />} />
                <Route path="/results" element={<Results />} />

                <Route path="/test" element={<Test />} />
            </Routes>

        </BrowserRouter>
    )
}