import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  students: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

export default mongoose.model("Course", courseSchema);
