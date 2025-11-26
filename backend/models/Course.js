import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  students: { type: Number, default: 0 },
  duration: String,
  level: String,
  price: Number,
  videoUrl: String,
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
export default Course;

