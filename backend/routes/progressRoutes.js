// backend/routes/progressRoutes.js
import express from "express";
import Progress from "../models/progressModel.js"; // ✅ correct import with file extension

const router = express.Router();

// Get all progress data
router.get("/", async (req, res) => {
  try {
    const progress = await Progress.find();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress data", error });
  }
});

// Add new progress data
router.post("/", async (req, res) => {
  try {
    const { userId, week, completedWorkouts, caloriesBurned } = req.body;

    const newProgress = new Progress({
      userId,
      week,
      completedWorkouts,
      caloriesBurned,
    });

    const savedProgress = await newProgress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    res.status(400).json({ message: "Error adding progress", error });
  }
});

export default router;
