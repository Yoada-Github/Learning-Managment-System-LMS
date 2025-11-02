// src/pages/DeleteCourse.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DeleteCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch the course details
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      alert("Course deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to delete course!");
    }
  };

  if (!course) return <p className="text-center mt-5">Loading course...</p>;

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm border-0 p-4">
        <i className="bi bi-exclamation-triangle text-danger display-4 mb-3"></i>
        <h4 className="fw-bold">Delete Course</h4>
        <p>
          Are you sure you want to permanently delete the course{" "}
          <strong>{course.name}</strong>? This action cannot be undone.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-arrow-left me-2"></i>Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourse;
