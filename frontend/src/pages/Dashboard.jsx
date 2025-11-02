import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [courses, setCourses] = useState([
    {
      _id: "1",
      name: "Frontend Development with React",
      students: 120,
      price: 24000,
    },
    {
      _id: "2",
      name: "Backend Development with Node.js",
      students: 95,
      price: 19000,
    },
    {
      _id: "3",
      name: "Full Stack MERN Mastery",
      students: 80,
      price: 16000,
    },
    {
      _id: "4",
      name: "UI/UX Design Essentials",
      students: 60,
      price: 9000,
    },
  ]);
  const navigate = useNavigate();

  // Fetch or mock courses
  useEffect(() => {
    // Temporary mock data – replace with backend API later
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // 👇 Navigate to Create Course Page
  const handleAddCourse = () => {
    navigate("/create");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // navigate to edit page
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course._id !== id));
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-0">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard Overview
        </h2>
        <button className="btn btn-success" onClick={handleAddCourse}>
          <i className="bi bi-plus-circle me-2"></i>Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="card shadow-sm border-1">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Course Catagories</th>
                  <th>Course Name</th>
                  <th>Students</th>
                  <th>price (ETB)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1 || "0"}</td>
                    <td>{course.name || "N/A"}</td>
                    <td>{course.category || "N/A"}</td>
                    <td>{course.students ?? 0}</td>
                    <td>
                      {course.price
                        ? `${course.price.toLocaleString()} ETB`
                        : "0 ETB"}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(course._id)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(course._id)}>
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
      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm border-0">
            <h6 className="text-secondary">Total Courses</h6>
            <h3 className="fw-bold">{courses.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm border-0">
            <h6 className="text-secondary">Total Students</h6>
            <h3 className="fw-bold">
              {courses.reduce((acc, c) => acc + c.students, 0)}
            </h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm border-0">
            <h6 className="text-secondary">Total Price</h6>
            <h3 className="fw-bold text-success">
              ETB{" "}
              {courses.reduce((acc, c) => acc + c.price, 0).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
