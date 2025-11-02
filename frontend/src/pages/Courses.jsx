import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import aiImg from "../assets/AI.jfif";
import { useNavigate } from "react-router-dom";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();


  // Fetch courses from backend
  useEffect(() => {
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

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary fw-bold mb-4">
        <i className="bi bi-book-half me-2"></i>Available Courses
      </h2>

      {courses.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No courses found. Please create a course to get started.</p>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="text-secondary mb-3">
                      <i className="bi bi-layers me-2"></i>
                      {course.category}
                    </h6>
                    <h3 className="card-title text-primary fw-bold text-center">
                      {course.name}
                    </h3>
                    <img
                      src={aiImg}
                      alt="Course"
                      className="rounded-top img-fluid"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                        borderBottom: "3px solid #0d6efd",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <p className="card-text text-muted">{course.description}</p>
                  </div>

                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold text-success"></span>
                      <span className="fw-bold text-dark"></span>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light border-0 text-center">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    <i className="bi bi-eye me-2"></i>View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
