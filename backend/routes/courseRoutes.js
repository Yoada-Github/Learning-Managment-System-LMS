import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// ✅ Create a new course
router.post("/", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
    console.log(savedCourse)
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
  
});


// ✅ Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// ✅ Get single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Update course by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, students, revenue } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name, students, revenue },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete course by ID
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

export default router;
