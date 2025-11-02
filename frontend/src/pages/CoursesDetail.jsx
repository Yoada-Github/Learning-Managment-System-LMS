import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CoursesDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="container my-5">
      <BackButton />
      <div className="row align-items-start g-4 mb-5">
        <div className="col-lg-7">
          <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden">
            <iframe
              src={
                course.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"
              }
              title="Course Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="col-lg-5">
          <div
            className="card border-0 shadow-lg p-4 h-100"
            style={{
              borderRadius: "18px",
              background: "linear-gradient(145deg, #ffffff, #f8f9ff)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            }}
          >
            <div
              className="p-3 mb-3 rounded text-white"
              style={{
                background: "linear-gradient(90deg, #007bff 0%, #6610f2 100%)",
                borderRadius: "12px",
              }}
            >
              <h2 className="fw-bold mb-1">{course.name}</h2>
              <p className="mb-0">
                <i className="bi bi-folder-fill me-2 text-warning"></i>
                {course.category}
              </p>
            </div>
            <p className="fs-6 lh-base text-secondary mb-4">
              {course.description}
            </p>

            {/* Details */}
            <div className="mb-3">
              <h6 className="fw-bold text-dark mb-1">
                <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                Level:{" "}
                <span className="text-secondary">
                  {course.level || "Beginner"}
                </span>
              </h6>
              <h6 className="fw-bold text-dark mb-1">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                Duration:{" "}
                <span className="text-secondary">
                  {course.duration || "8 weeks"}
                </span>
              </h6>
              <h6 className="fw-bold text-success mt-3">
                <i className="bi bi-cash-coin me-2 text-success"></i>
                Price: ETB {course.price?.toLocaleString() || "0"}
              </h6>
            </div>

            {/* Enroll Button */}
            <button
              className="btn w-100 fw-bold text-white"
              style={{
                background: "linear-gradient(90deg, #00b09b 0%, #96c93d 100%)",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "1.05rem",
              }}
            >
              <i className="bi bi-play-circle me-2"></i>Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetail;
