// src/pages/EditCourse.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ name: "", students: "", revenue: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/courses/${id}`, course)
      .then(() => {
        alert("Course updated successfully!");
        navigate("/dashboard");
      })
      .catch((err) => console.error("Error updating course:", err));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Edit Course</h2>
      <div className="card shadow-sm p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={course.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Students</label>
            <input
              type="number"
              className="form-control"
              name="students"
              value={course.students}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Revenue (ETB)</label>
            <input
              type="number"
              className="form-control"
              name="revenue"
              value={course.revenue}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
