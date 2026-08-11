const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../services/email.service");
//  Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d", issuer: "ai-learning-app" }
  );
};

//  Send token securely (HTTP only cookie)
const sendToken = (res, user) => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token;
};


// ================= REGISTER =================
const register = async (req, res, next) => {
  try {
    const { username, email, password, targetExam } = req.body;

    if (!username || !email || !password || !targetExam) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔐 Strong password validation
    if (password.length < 6 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6+ chars & include 1 uppercase letter",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      targetExam,
    });

    const token = sendToken(res, user);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      token,
      user: userResponse,
    });

  } catch (error) {
    next(error);
  }
};


// ================= LOGIN =================
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Username and password required",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = sendToken(res, user);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      token,
      user: userResponse,
    });

  } catch (error) {
    next(error);
  }
};


// ================= LOGOUT =================
const logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out successfully"
  });
};


// ================= GET PROFILE =================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Don't reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If this email is registered, a reset link has been sent.",
      });
    }

    // Generate token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token for database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // 15 minute expiry
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // Frontend reset URL
    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,

      subject: "EduAI - Reset Your Password",

      html: `
        <!DOCTYPE html>
        <html>
        <body style="
          margin:0;
          padding:0;
          background:#f4f7fb;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:600px;
            margin:40px auto;
            background:white;
            padding:35px;
            border-radius:12px;
          ">

            <h1 style="
              color:#2563eb;
              margin-bottom:20px;
            ">
              EduAI
            </h1>

            <h2>
              Reset Your Password
            </h2>

            <p>
              Hello ${user.username || "User"},
            </p>

            <p>
              We received a request to reset your
              EduAI account password.
            </p>

            <p>
              Click the button below to create a new password.
            </p>

            <div style="margin:30px 0;">

              <a
                href="${resetUrl}"
                style="
                  display:inline-block;
                  padding:14px 25px;
                  background:#2563eb;
                  color:white;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                "
              >
                Reset Password
              </a>

            </div>

            <p>
              This link will expire in
              <strong>15 minutes</strong>.
            </p>

            <p style="color:#777;">
              If you did not request this password reset,
              you can safely ignore this email.
            </p>

            <hr />

            <p style="
              color:#999;
              font-size:12px;
            ">
              EduAI - AI Learning Platform
            </p>

          </div>

        </body>
        </html>
      `,
    });

    console.log(
      "Password reset email sent to:",
      user.email
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset link sent successfully.",
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    next(error);
  }
};

// ================= RESET PASSWORD =================
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const {
      newPassword,
      confirmPassword,
    } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirm password are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired reset link",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
};