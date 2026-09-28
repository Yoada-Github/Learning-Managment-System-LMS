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
  // FETCH DATA (Kept exactly as you had it)
  // ==========================================
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err.response?.data || err.message);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No authentication token found");

      const res = await axios.get("http://localhost:5000/enrollment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollments(res.data);
    } catch (err) {
      console.error("Error fetching enrollments:", err.response?.data || err.message);
    }
  };

  // ==========================================
  // CALCULATIONS (Kept from your code)
  // ==========================================
  const totalStudents = courses.reduce((sum, course) => sum + (Number(course.students) || 0), 0);
  const totalEnrolled = enrollments.length;
  const totalRevenue = enrollments.reduce((sum, enrollment) => sum + (Number(enrollment.price) || 0), 0);

  // ==========================================
  // MOCK DATA FOR UI (Replace with real data later)
  // ==========================================
  const userProfile = {
    name: "Yoseph Adane",
    email: "yoseph@example.com",
    location: "Addis Ababa, Ethiopia",
    joinDate: "March 2025",
    phone: "+251 912 345 678",
    role: "Student",
    bio: "Small steps every day lead to big results."
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* =====================================
          MAIN CONTENT AREA
      ====================================== */}
      <div className="container py-4">
        
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">My Profile</h2>
          <p className="text-muted">Manage your account and track your learning progress</p>
        </div>

        {/* =====================================
            HERO PROFILE BANNER
        ====================================== */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden position-relative">
          {/* Background Image */}
          <div 
            style={{
              height: "220px",
              backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative"
            }}
          >
            {/* Dark Overlay for text readability */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}></div>
            
            {/* Quote */}
            <div className="position-absolute bottom-0 end-0 p-4 text-white text-end d-none d-md-block">
              <p className="mb-0 fst-italic">"{userProfile.bio}"</p>
              <hr className="my-2 border-light opacity-50" style={{ width: "100px", marginLeft: "auto" }} />
            </div>
          </div>

          <div className="card-body p-4 position-relative">
            <div className="row align-items-center">
              {/* Avatar */}
              <div className="col-md-2 text-center text-md-start mb-3 mb-md-0">
                <img 
                  src="https://i.pravatar.cc/150?img=11" 
                  alt="Profile" 
                  className="rounded-circle border border-4 border-white shadow-sm"
                  style={{ width: "120px", height: "120px", marginTop: "-80px", objectFit: "cover" }}
                />
              </div>
              {/* Name & Details */}
              <div className="col-md-7">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <h3 className="fw-bold mb-0">{userProfile.name}</h3>
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">{userProfile.role}</span>
                </div>
                <div className="d-flex flex-wrap gap-4 text-muted small">
                  <span><i className="bi bi-envelope me-2"></i>{userProfile.email}</span>
                  <span><i className="bi bi-geo-alt me-2"></i>{userProfile.location}</span>
                  <span><i className="bi bi-calendar3 me-2"></i>Joined {userProfile.joinDate}</span>
                </div>
              </div>
              {/* Edit Button */}
              <div className="col-md-3 text-md-end mt-3 mt-md-0">
                <button className="btn btn-outline-secondary rounded-pill px-4 bg-white">
                  <i className="bi bi-pencil me-2"></i> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            STATS CARDS (Top 4)
        ====================================== */}
        <div className="row g-4 mb-4">
          {[
            { title: "Enrolled Courses", value: totalEnrolled || 8, icon: "bi-book", color: "primary", bg: "bg-primary bg-opacity-10", trend: "+2 new" },
            { title: "Completed Courses", value: 3, icon: "bi-check-circle", color: "success", bg: "bg-success bg-opacity-10", trend: "+1 new" },
            { title: "In Progress", value: 5, icon: "bi-play-circle", color: "purple", bg: "bg-info bg-opacity-10", trend: "+1 new", customColor: "#8b5cf6" },
            { title: "Learning Hours", value: "42h", icon: "bi-clock-history", color: "warning", bg: "bg-warning bg-opacity-10", trend: "+5h" },
          ].map((stat, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${stat.bg}`} style={{ width: "50px", height: "50px" }}>
                    <i className={`bi ${stat.icon} fs-4`} style={{ color: stat.customColor || `var(--bs-${stat.color})` }}></i>
                  </div>
                  <div>
                    <h6 className="text-muted mb-1 small">{stat.title}</h6>
                    <h4 className="fw-bold mb-0">{stat.value}</h4>
                  </div>
                  <div className="ms-auto text-end">
                    <small className="text-success d-block">{stat.trend}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            BOTTOM TWO COLUMNS
        ====================================== */}
        <div className="row g-4 mb-4">
          {/* LEFT: Personal Information */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-person text-primary me-2"></i> Personal Information
              </h5>
              
              <div className="d-flex flex-column gap-3">
                {[
                  { label: "Full Name", value: userProfile.name, icon: "bi-person" },
                  { label: "Email Address", value: userProfile.email, icon: "bi-envelope" },
                  { label: "Phone Number", value: userProfile.phone, icon: "bi-telephone" },
                  { label: "Account Type", value: userProfile.role, icon: "bi-shield-check", isBadge: true },
                  { label: "Member Since", value: userProfile.joinDate, icon: "bi-clock" },
                ].map((item, idx) => (
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2" key={idx}>
                    <span className="text-muted small d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon}`}></i> {item.label}
                    </span>
                    {item.isBadge ? (
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">{item.value}</span>
                    ) : (
                      <span className="fw-medium text-dark">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Info Alert */}
              <div className="mt-auto pt-4">
                <div className="p-3 rounded-3 d-flex gap-3" style={{ backgroundColor: "#f0f7ff", border: "1px solid #e0f2fe" }}>
                  <i className="bi bi-info-circle text-primary fs-5"></i>
                  <small className="text-muted mb-0">
                    Your profile helps us provide a more personalized learning experience. Keep your information up to date.
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Learning Progress */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center">
                  <i className="bi bi-graph-up-arrow text-primary me-2"></i> Learning Progress
                </h5>
                <button className="btn btn-link text-decoration-none p-0 small">View All</button>
              </div>

              <div className="d-flex flex-column gap-4">
                {[
                  { name: "React for Beginners", progress: 75, status: "In Progress", icon: "bi-braces", color: "#61dafb" },
                  { name: "Node.js & Express", progress: 45, status: "In Progress", icon: "bi-server", color: "#68a063" },
                  { name: "MongoDB Essentials", progress: 100, status: "Completed", icon: "bi-database", color: "#4db33d" },
                  { name: "JavaScript Fundamentals", progress: 30, status: "In Progress", icon: "bi-filetype-js", color: "#f7df1e" },
                ].map((course, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between align-items-end mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", backgroundColor: `${course.color}20`, color: course.color }}>
                          <i className={`bi ${course.icon}`}></i>
                        </div>
                        <span className="fw-semibold small">{course.name}</span>
                      </div>
                      <small className="text-muted">{course.progress}%</small>
                    </div>
                    {/* Progress Bar */}
                    <div className="progress rounded-pill" style={{ height: "8px" }}>
                      <div 
                        className="progress-bar rounded-pill" 
                        role="progressbar" 
                        style={{ width: `${course.progress}%`, backgroundColor: course.status === "Completed" ? "#10b981" : "#3b82f6" }}
                      ></div>
                    </div>
                    <div className="text-end mt-1">
                      <span className={`badge rounded-pill ${course.status === "Completed" ? "bg-success bg-opacity-10 text-success" : "bg-primary bg-opacity-10 text-primary"}`} style={{ fontSize: "0.65rem" }}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            QUICK ACTIONS (Bottom)
        ====================================== */}
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <h5 className="fw-bold mb-4 d-flex align-items-center">
            <i className="bi bi-lightning-charge text-primary me-2"></i> Quick Actions
          </h5>
          <div className="row g-3">
            <div className="col-md-3">
              <button className="btn btn-primary w-100 py-3 rounded-3 d-flex align-items-center justify-content-between px-4" onClick={() => navigate("/courses")}>
                <span><i className="bi bi-search me-2"></i> Browse Courses</span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-success w-100 py-3 rounded-3 d-flex align-items-center justify-content-between px-4" onClick={() => navigate("/dashboard")}>
                <span><i className="bi bi-bar-chart me-2"></i> My Dashboard</span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn w-100 py-3 rounded-3 d-flex align-items-center justify-content-between px-4" style={{ backgroundColor: "#8b5cf6", color: "white" }} onClick={() => navigate("/settings")}>
                <span><i className="bi bi-gear me-2"></i> Settings</span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-danger w-100 py-3 rounded-3 d-flex align-items-center justify-content-between px-4" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
                <span><i className="bi bi-box-arrow-right me-2"></i> Logout</span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;