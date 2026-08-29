import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: String,
  videoUrl: String,
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course" 
  },
});

export default mongoose.model("Lesson", lessonSchema);
