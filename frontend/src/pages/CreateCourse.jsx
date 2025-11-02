import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
                                       name: "",
                                       description: "",
                                       students: "",
                                       price: "",
                                       category: "",
                                      });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = {
    ...formData,
    students: Number(formData.students),
    price: Number(formData.price),
    revenue: Number(formData.students) * Number(formData.price), // optional
  };
    try {
      // replace this URL with your backend API endpoint
      await axios.post("http://localhost:5000/courses", newCourse);
      alert("Course created successfully!");
      navigate("/dashboard");
      console.log(formData)
    } catch (error) {
      console.error(error);
      alert("Failed to create course!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 border-0">
        <h3 className="fw-bold text-primary mb-4">
          <i className="bi bi-plus-circle me-2"></i>Create New Course
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter course name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="Write a short course description..."
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Students</label>
            <input
              type="number"
              name="students"
              className="form-control"
              placeholder="e.g. 50"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course Price (ETB)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="e.g. 2500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="e.g. Web Development"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-check2-circle me-2"></i>Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
