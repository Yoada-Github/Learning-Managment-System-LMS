// routes/enrollmentRoutes.js
import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// POST enroll
router.post("/", protect, async (req, res) => {
  const { userId, courseId, price } = req.body;
  try {
    const enrollment = await Enrollment.create({ userId, courseId, price });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Enroll a student
router.post("/enroll", protect, async (req, res) => {
  const { userId, courseId } = req.body;

  // If already enrolled
  const exist = await Enrollment.findOne({ userId, courseId });
  if (exist) return res.json({ message: "Already enrolled" });

  const enroll = new Enrollment({ userId, courseId, date: new Date() });
  await enroll.save();

  res.json({ message: "Enrollment successful" });
});

// GET all enrollments
router.get("/", protect, async (req, res) => {
  const enrollments = await Enrollment.find().populate("courseId userId", "name email");
  res.json(enrollments);
});

export default router;
