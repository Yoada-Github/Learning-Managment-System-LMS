import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Function to add "active" style to current route
  const isActive = (path) =>
    location.pathname === path ? "text-primary fw-bold" : "text-dark";

  // function to logout to home page
  const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
};

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container py-2">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary">
          <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
          LMS<span className="text-dark ms-1">LEARN</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/"> <i className="bi bi-people-fill me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/courses")}`} to="/courses">
                Courses
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/profile")}`} to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm px-3 ms-lg-2" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary px-4 ms-lg-2" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
