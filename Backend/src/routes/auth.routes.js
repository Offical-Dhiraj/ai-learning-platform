// const express = require("express");
// const router = express.Router();

// const {
//   register,
//   login,
//   forgotPassword,
//   resetPassword,
//   getProfile
// } = require("../controllers/auth.controller");

// const limiter = require("../middlewares/rateLimiter.middleware");
// const authMiddleware = require("../middlewares/auth.middleware");

// router.post("/register", limiter, register);
// router.post("/login", limiter, login);
// router.post("/forgot-password", limiter, forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.get("/me",authMiddleware,getProfile);



// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile
} = require("../controllers/auth.controller");

const limiter = require("../middlewares/rateLimiter.middleware");
const { protect } = require("../middlewares/auth.middleware"); 

router.post("/register", limiter, register);
router.post("/login", limiter, login);
router.post("/forgot-password", limiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getProfile); 

module.exports = router;