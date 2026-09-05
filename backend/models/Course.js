
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },

  description: {
    type: String,
  },

  students: {
    type: Number,
    default: 0,
  },

  duration:{
    type: String,
  },

  level: {
    type: String,
  },

  videoUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },

  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Course", courseSchema);