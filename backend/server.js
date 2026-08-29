import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // only import once

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js"



console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASSWORD exists:",
  !!process.env.EMAIL_PASSWORD
);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/progress", progressRoutes);
app.use("/enrollment",enrollmentRoutes)
// Start server and connect to DB
const startServer = async () => {
  try {
    await connectDB(); // connect to MongoDB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
