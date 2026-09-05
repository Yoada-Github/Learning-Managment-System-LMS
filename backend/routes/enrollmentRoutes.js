import express from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ========================================
// ENROLL STUDENT
// ========================================
router.post("/enroll", protect, async (req, res) => {
  const { userId, courseId, price } = req.body;

  try {
    // Check if already enrolled
    const exist = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (exist) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      price,
      date: new Date(),
    });

    // Update course
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          enrolledStudents: userId,
        },
        $inc: {
          students: 1,
        },
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
      course,
    });

  } catch (error) {
    console.error("Enrollment error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ========================================
// GET ALL ENROLLMENTS
// ========================================
router.get("/", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("courseId")
      .populate("userId", "name email");

    res.json(enrollments);

  } catch (error) {
    console.error("Get enrollments error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course updated successfully",
      course,
    });

  } catch (error) {
    console.error("Update course error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course deleted successfully",
    });

  } catch (error) {
    console.error("Delete course error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;