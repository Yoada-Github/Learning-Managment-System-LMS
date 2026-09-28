import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-primary text-white shadow-sm"
      : "text-white-50";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="d-flex flex-column p-3 text-white"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#0f172a",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      {/* ================= LOGO ================= */}
      <Link
        to="/"
        className="d-flex align-items-center mb-4 text-white text-decoration-none px-2"
      >
        <i className="bi bi-mortarboard-fill me-2 fs-3 text-info"></i>
        <span className="fs-4 fw-bold">Learnify</span>
      </Link>

      {/* ================= NAV LINKS ================= */}
      <ul className="nav nav-pills flex-column mb-auto gap-1">

        {/* --- PUBLIC LINKS --- */}
        <li>
          <Link to="/" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/")}`}>
            <i className="bi bi-house-door me-3 fs-5"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/courses" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/courses")}`}>
            <i className="bi bi-search me-3 fs-5"></i> Browse Courses
          </Link>
        </li>

        {/* --- LOGGED-IN USER LINKS --- */}
        {user && (
          <>
            <li>
              <Link to="/dashboard" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/dashboard")}`}>
                <i className="bi bi-grid me-3 fs-5"></i> Dashboard
              </Link>
            </li>

            <li>
              <Link to="/assignments" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/assignments")}`}>
                <i className="bi bi-file-earmark-text me-3 fs-5"></i> Assignments
              </Link>
            </li>

            <li>
              <Link to="/certificates" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/certificates")}`}>
                <i className="bi bi-award me-3 fs-5"></i> Certificates
              </Link>
            </li>

            {/* MESSAGES with badge */}
            <li>
              <Link to="/messages" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/messages")}`}>
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <span>
                    <i className="bi bi-envelope me-3 fs-5"></i> Messages
                  </span>
                  <span className="badge bg-danger rounded-pill">3</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/create" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/create")}`}>
                <i className="bi bi-plus-circle me-3 fs-5"></i> Create Course
              </Link>
            </li>
            <li>
              <Link to="/profile" className={`nav-link d-flex align-items-center rounded-3 py-2 px-3 ${isActive("/profile")}`}>
                <i className="bi bi-person me-3 fs-5"></i> Profile
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* ================= PROMO CARD ================= */}
      <div className="card border-0 rounded-4 p-3 mt-4" style={{ backgroundColor: "#1e3a8a" }}>
        <div className="text-center">
          <i className="bi bi-mortarboard fs-2 text-warning mb-2"></i>
          <h6 className="fw-bold mb-1">Keep Learning,</h6>
          <h6 className="fw-bold text-info mb-2">Keep Growing</h6>
          <p className="small text-white-50 mb-0" style={{ fontSize: "0.75rem" }}>
            Every step you take brings you closer to your goals.
          </p>
        </div>
      </div>

      {/* ================= LOGOUT / LOGIN ================= */}
      <div className="mt-3">
        {user ? (
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        ) : (
          <Link
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 rounded-3 py-2"
            to="/login"
          >
            <i className="bi bi-box-arrow-in-right"></i> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;