import API from "../../services/api";

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getProfile = () =>
  API.get("/auth/me")

export const generateTestAPI = (data) =>
  API.post("/test/generate", data);

export const getCurrentTestAPI = () =>
  API.get("/test/current");

export const deleteCurrentTestAPI = () =>
  API.delete("/test/current");

export const saveResultAPI = (data) =>
  API.post("/results/submit", data);

export const getResultsAPI = () =>
  API.get("/results/my");

export const getDashboardAPI = () =>
  API.get("/results/dashboard");

export const generateStudyPlanAPI = (data) =>
  API.post("/studyplan/generate", data);

export const getStudyPlanAPI = () =>
  API.get("/studyplan");

export const markDayCompletedAPI = (day) =>
  API.patch("/studyplan/complete-day", {
    day
  });


// ================= AUTH EXTRA =================

// Forgot Password
export const forgotPasswordAPI = (data) =>
  API.post("/auth/forgot-password", data);

// Reset Password
export const resetPasswordAPI = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);

// OTP
export const sendOTPAPI = (data) =>
  API.post("/auth/send-otp", data);

export const verifyOTPAPI = (data) =>
  API.post("/auth/verify-otp", data);