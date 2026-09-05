import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const navigate = useNavigate();

  // ==========================================
  // FETCH COURSES AND ENROLLMENTS
  // ==========================================
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  // ==========================================
  // GET ALL COURSES
  // ==========================================
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");

      console.log("Courses:", res.data);

      setCourses(res.data);
    } catch (err) {
      console.error(
        "Error fetching courses:",
        err.response?.data || err.message,
      );
    }
  };

  // ==========================================
  // GET ALL ENROLLMENTS
  // ==========================================
  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await axios.get("http://localhost:5000/enrollment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Enrollments:", res.data);

      setEnrollments(res.data);
    } catch (err) {
      console.error(
        "Error fetching enrollments:",
        err.response?.data || err.message,
      );
    }
  };

  // ==========================================
  // ADD COURSE
  // ==========================================
  const handleAddCourse = () => {
    navigate("/create");
  };

  // ==========================================
  // EDIT COURSE
  // ==========================================
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // ==========================================
  // DELETE COURSE
  // ==========================================
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/courses/${id}`);

        setCourses(courses.filter((course) => course._id !== id));

        // Refresh enrollments after deletion
        fetchEnrollments();
      } catch (error) {
        console.error(
          "Error deleting course:",
          error.response?.data || error.message,
        );
      }
    }
  };

  // ==========================================
  // TOTAL STUDENTS
  // ==========================================
  const totalStudents = courses.reduce((sum, course) => {
    return sum + (Number(course.students) || 0);
  }, 0);

  // ==========================================
  // TOTAL ENROLLMENTS
  // ==========================================
  const totalEnrolled = enrollments.length;

  // ==========================================
  // STUDENTS ENROLLED IN EACH COURSE
  // ==========================================
  const getStudentsForCourse = (courseId) => {
    return enrollments.filter((enrollment) => {
      const enrollmentCourseId =
        enrollment.courseId?._id ||
        enrollment.courseId ||
        enrollment.course?._id ||
        enrollment.course;

      return String(enrollmentCourseId) === String(courseId);
    }).length;
  };

  // ==========================================
  // TOTAL REVENUE FROM ENROLLMENTS
  // ==========================================
  const totalRevenue = enrollments.reduce((sum, enrollment) => {
    return sum + (Number(enrollment.price) || 0);
  }, 0);

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* =====================================
          HEADER
      ====================================== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">
            <i className="bi bi-speedometer2 text-primary me-2"></i>
            Dashboard Overview
          </h2>
        </div>

        <button
          className="btn btn-primary px-4 py-2 shadow-sm rounded-pill"
          onClick={handleAddCourse}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Course
        </button>
      </div>

      {/* =====================================
          COURSES TABLE
      ====================================== */}
      <div className="card shadow-sm border-0 mb-5 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="text-white">
                <tr className="bg-dark">
                  <th className="ps-4 bg-dark text-white">#</th>

                  <th className="ps-4 bg-dark text-white">Course Name</th>

                  <th className="ps-4 bg-dark text-white">Category</th>

                  <th className="ps-4 bg-dark text-white">
                    Number of Students
                  </th>

                  <th className="ps-4 bg-dark text-white">Enrolled Students</th>

                  <th className="ps-4 bg-dark text-white">Price (ETB)</th>

                  <th className="ps-4 bg-dark text-white text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={course._id}>
                      {/* Number */}
                      <td className="ps-4 fw-semibold">{index + 1}</td>

                      {/* Course Name */}
                      <td className="fw-medium">
                        {course.name || course.title || "N/A"}
                      </td>

                      {/* Category */}
                      <td>{course.category || "N/A"}</td>

                      {/* Number of Students */}
                      <td>
                        <span className="badge bg-primary">
                          {course.students || 0}
                        </span>
                      </td>

                      {/* Enrolled Students */}
                      <td>
                        <span className="badge bg-success">
                          {getStudentsForCourse(course._id)}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="fw-semibold text-success">
                        {course.price
                          ? `${Number(course.price).toLocaleString()} ETB`
                          : "0 ETB"}
                      </td>

                      {/* Actions */}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =====================================
          SUMMARY CARDS
      ====================================== */}
      <div className="row g-4">
        {/* TOTAL COURSES */}
        <div className="col-md-3">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-primary fs-2 mb-2">
              <i className="bi bi-book-fill"></i>
            </div>

            <h6 className="text-muted">Total Courses</h6>

            <h3 className="fw-bold text-dark">{courses.length}</h3>
          </div>
        </div>

        {/* TOTAL STUDENTS */}
        <div className="col-md-3">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-warning fs-2 mb-2">
              <i className="bi bi-people-fill"></i>
            </div>

            <h6 className="text-muted">Total Students</h6>

            <h3 className="fw-bold text-dark">{totalStudents}</h3>
          </div>
        </div>

        {/* TOTAL ENROLLED */}
        <div className="col-md-3">
          <div className="card text-center border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-info fs-2 mb-2">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <h6 className="text-muted">Total Enrolled</h6>

            <h3 className="fw-bold text-dark">{totalEnrolled}</h3>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div className="col-md-3">
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
