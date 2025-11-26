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
router.post("/enroll/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const userId = req.user._id;

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(userId);
    await course.save();

    res.json({ message: "Enrollment successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all enrollments
router.get("/", protect, async (req, res) => {
  const enrollments = await Enrollment.find().populate("courseId userId", "name email");
  res.json(enrollments);
});

export default router;
