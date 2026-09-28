import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/courses?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    
    <div
      className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-2"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        height: "70px",
      }}
    >
      {/* ================= SEARCH BAR ================= */}
      <div className="flex-grow-1 me-4" style={{ maxWidth: "500px" }}>
        <div
          className="d-flex align-items-center rounded-pill px-3"
          style={{
            backgroundColor: "#f1f5f9",
            height: "42px",
          }}
        >
          <i className="bi bi-search text-muted me-2"></i>
          <input
            type="text"
            className="form-control border-0 shadow-none bg-transparent p-0"
            placeholder="Search courses, topics, or instructors..."
            style={{ fontSize: "0.9rem" }}
          />
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="d-flex align-items-center gap-3">

        {/* NOTIFICATION BELL */}
        <button
          className="btn btn-light rounded-circle position-relative d-flex align-items-center justify-content-center"
          style={{ width: "42px", height: "42px" }}
        >
          <i className="bi bi-bell fs-5 text-dark"></i>
          <span
            className="position-absolute badge rounded-pill bg-danger"
            style={{
              top: "4px",
              right: "4px",
              fontSize: "0.6rem",
              padding: "3px 6px",
            }}
          >
            3
          </span>
        </button>

        {/* USER INFO + DROPDOWN */}
        {user && (
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://i.pravatar.cc/40?img=11"
              alt="user"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ objectFit: "cover" }}
            />
            <div className="d-none d-md-block">
              <div className="fw-semibold" style={{ fontSize: "0.9rem" }}>
                {user.name || "Yoseph"}
              </div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                Student
              </div>
            </div>
            <i className="bi bi-chevron-down small text-muted"></i>
          </div>
        )}
      </div>
    </div>
  );
   return (
    <form
      onSubmit={handleSearch}
      className="d-flex align-items-center rounded-pill px-3"
      style={{ backgroundColor: "#f1f5f9", height: "42px", maxWidth: "500px" }}
    >
      <i className="bi bi-search text-muted me-2"></i>
      <input
        type="text"
        className="form-control border-0 shadow-none bg-transparent p-0"
        placeholder="Search courses, topics, or instructors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ fontSize: "0.9rem" }}
      />
    </form>
  );
};

export default Topbar;