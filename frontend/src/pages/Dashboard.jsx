import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  // Fetch courses and enrollment data
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/enrollments");
      setEnrollments(res.data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  const handleAddCourse = () => navigate("/create");
  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/courses/${id}`);
        setCourses(courses.filter((course) => course._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // 🧮 Calculate stats
  const totalStudents = enrollments.length;
  const totalRevenue = enrollments.reduce((sum, e) => sum + (e.price || 0), 0);

  const getStudentsForCourse = (courseId) =>
    enrollments.filter((enroll) => enroll.courseId === courseId).length;

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">
            <i className="bi bi-speedometer2 text-primary me-2"></i>
            Dashboard Overview
          </h2>
          <p className="text-muted small mb-0">
            Manage your courses and track student enrollments
          </p>
        </div>
        <button
          className="btn btn-primary px-4 py-2 shadow-sm rounded-pill"
          onClick={handleAddCourse}
        >
          <i className="bi bi-plus-circle me-2"></i>Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="card shadow-sm border-0 mb-5 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="ps-4">#</th>
                  <th>Course Name</th>
                  <th>Category</th>
                  <th>Enrolled Students</th>
                  <th>Price (ETB)</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course._id}>
                    <td className="ps-4 fw-semibold">{index + 1}</td>
                    <td className="fw-medium">{course.name || "N/A"}</td>
                    <td>{course.category || "N/A"}</td>
                    <td>{getStudentsForCourse(course._id)}</td>
                    <td className="fw-semibold text-success">
                      {course.price
                        ? `${course.price.toLocaleString()} ETB`
                        : "0 ETB"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2 rounded-pill"
                        onClick={() => handleEdit(course._id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill"
                        onClick={() => handleDelete(course._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-primary fs-2 mb-2">
              <i className="bi bi-book-fill"></i>
            </div>
            <h6 className="text-muted">Total Courses</h6>
            <h3 className="fw-bold text-dark">{courses.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-warning fs-2 mb-2">
              <i className="bi bi-people-fill"></i>
            </div>
            <h6 className="text-muted">Total Students</h6>
            <h3 className="fw-bold text-dark">{totalStudents}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-success fs-2 mb-2">
              <i className="bi bi-currency-exchange"></i>
            </div>
            <h6 className="text-muted">Total Revenue</h6>
            <h3 className="fw-bold text-success">
              ETB {totalRevenue.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
