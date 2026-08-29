import express from "express";
import User from "../models/User.js";
import authController from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);

// Reset Password
router.post("/reset-password/:token", authController.resetPassword);

// Stats
router.get("/stats", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    res.json({
      totalStudents,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
