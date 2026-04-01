import API
    from "../../services/api";

export const registerUser = (data) =>
    API.post("/auth/register", data);

export const loginUser = (data) =>
    API.post("/auth/login", data);

export const getProfile =()=>
    API.get("/auth/me")

export const generateTestAPI = (data) =>
    API.post("/test/generate", data);

export const saveResultAPI = (data) =>
  API.post("/results/submit", data);

export const getResultsAPI = () =>
  API.get("/results");

export const getDashboardAPI=()=>
    API.get("/results/dashboard");

// ================= AUTH EXTRA =================

// Forgot Password
export const forgotPasswordAPI = (data) =>
  API.post("/auth/forgot-password", data);

// Send OTP
export const sendOTPAPI = (data) =>
  API.post("/auth/send-otp", data);

// Verify OTP
export const verifyOTPAPI = (data) =>
  API.post("/auth/verify-otp", data);