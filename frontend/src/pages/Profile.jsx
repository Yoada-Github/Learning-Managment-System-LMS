import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import lmsPic from "../assets/LMS.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(false);

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center shadow-sm rounded-4">
          <i className="bi bi-exclamation-circle me-2"></i>
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  // Use uploaded profile image if available.
  
  const profileImage =
    user.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name || "Student",
    )}&background=0d6efd&color=fff&size=200`;

  const role = user.role || "student";

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5" >
                            {/* <img src={lmsPic} alt="profile picture" style={ {height: "170px"}} /> */}

      <div className="container" >
        {/* =====================================================
            PROFILE HEADER
        ====================================================== */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" >

          {/* Cover */}
          <div className="profile-cover" style={{ height: "170px", 
                                         background: "linear-gradient(135deg, #0d6efd 0%, #084298 100%)",
            }}
          >
            <div className="container h-100" >
              <div className="d-flex justify-content-end align-items-start h-100 p-4">
                <span className="badge bg-white text-primary rounded-pill px-3 py-2">
                  <i className="bi bi-patch-check-fill me-1"></i>
                  Learnify Account
                </span>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="card-body px-4 px-md-5 pb-4" >
            <div className="row align-items-end">
              {/* Avatar */}
              <div className="col-auto">
                <img
                  src={profileImage}
                  alt={`${user.name} profile`}
                  className="rounded-circle border border-4 border-white shadow"
                  style={{
                    width: "125px",
                    height: "125px",
                    objectFit: "cover",
                    marginTop: "-65px",
                  }}
                />
              </div>

              {/* User information */}
              <div className="col mt-3">
                <h2 className="fw-bold mb-1">{user.name}</h2>

                <p className="text-muted mb-2">
                  <i className="bi bi-envelope me-2"></i>
                  {user.email}
                </p>

                <span className="badge bg-primary rounded-pill px-3 py-2">
                  <i className="bi bi-mortarboard-fill me-1"></i>
                  {role.toUpperCase()}
                </span>
              </div>

              {/* Edit */}
              <div className="col-auto mt-3">
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LEARNING STATISTICS
        ====================================================== */}
        <div className="row g-4 mb-4">
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-book" title="Enrolled Courses" value="—" />
          </div>

          <div className="col-6 col-lg-3">
            <StatCard icon="bi-check-circle" title="Completed" value="—" />
          </div>

          <div className="col-6 col-lg-3">
            <StatCard icon="bi-play-circle" title="In Progress" value="—" />
          </div>

          <div className="col-6 col-lg-3">
            <StatCard
              icon="bi-clock-history"
              title="Learning Hours"
              value="—"
            />
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="row g-4">
          {/* PERSONAL INFORMATION */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="section-icon me-3">
                    <i className="bi bi-person"></i>
                  </div>

                  <div>
                    <h5 className="fw-bold mb-0">Personal Information</h5>

                    <small className="text-muted">Your account details</small>
                  </div>
                </div>

                <InfoRow
                  icon="bi-person"
                  label="Full Name"
                  value={user.name || "Not provided"}
                />

                <InfoRow
                  icon="bi-envelope"
                  label="Email Address"
                  value={user.email || "Not provided"}
                />

                <InfoRow
                  icon="bi-telephone"
                  label="Phone Number"
                  value={user.phone || "Not provided"}
                />

                <InfoRow
                  icon="bi-person-badge"
                  label="Account Type"
                  value={role.toUpperCase()}
                />

                <InfoRow
                  icon="bi-calendar3"
                  label="Member Since"
                  value={
                    user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not available"
                  }
                  last
                />
              </div>
            </div>
          </div>

          {/* LEARNING OVERVIEW */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <div className="section-icon me-3">
                      <i className="bi bi-bar-chart"></i>
                    </div>

                    <div>
                      <h5 className="fw-bold mb-0">Learning Progress</h5>

                      <small className="text-muted">
                        Track your learning journey
                      </small>
                    </div>
                  </div>

                  <span className="badge bg-light text-secondary rounded-pill">
                    Overview
                  </span>
                </div>

                {/* Course progress placeholders */}
                <CourseProgress
                  title="React & Frontend Development"
                  progress={0}
                />

                <CourseProgress title="Node.js & Express" progress={0} />

                <CourseProgress title="MongoDB & Database" progress={0} />

                <CourseProgress
                  title="Full Stack Development"
                  progress={0}
                  last
                />

                <div className="alert alert-light border mt-4 mb-0 rounded-3">
                  <i className="bi bi-info-circle text-primary me-2"></i>
                  Your real course progress will appear here once enrollment and
                  progress tracking are connected.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">
              <i className="bi bi-lightning-charge-fill text-primary me-2"></i>
              Quick Actions
            </h5>

            <div className="row g-3">
              <div className="col-md-4">
                <a
                  href="/courses"
                  className="btn btn-outline-primary w-100 py-3 rounded-3"
                >
                  <i className="bi bi-search me-2"></i>
                  Browse Courses
                </a>
              </div>

              <div className="col-md-4">
                <a
                  href="/dashboard"
                  className="btn btn-outline-success w-100 py-3 rounded-3"
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  My Dashboard
                </a>
              </div>

              <div className="col-md-4">
                <button
                  className="btn btn-outline-secondary w-100 py-3 rounded-3"
                  onClick={() => setShowEdit(true)}
                >
                  <i className="bi bi-gear me-2"></i>
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            EDIT PROFILE
        ====================================================== */}
        {showEdit && (
          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-1">
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                    Edit Profile
                  </h5>

                  <small className="text-muted">
                    Update your Learnify account information
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEdit(false)}
                ></button>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    value={user.name || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg rounded-3"
                    value={user.email || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number</label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    value={user.phone || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Account Role</label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    value={role.toUpperCase()}
                    readOnly
                  />
                </div>
              </div>

              <div className="alert alert-info mt-4 mb-0 rounded-3">
                <i className="bi bi-info-circle me-2"></i>
                The fields are currently read-only. We can connect this section
                to your backend profile update API next.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =======================================================
          PAGE STYLES
      ======================================================== */}
      <style>{`

        .section-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(13, 110, 253, 0.1);
          color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .form-control {
          border-color: #e5e7eb;
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.1);
        }

        .progress {
          background-color: #e9ecef;
          border-radius: 20px;
        }

        .progress-bar {
          border-radius: 20px;
        }

        @media (max-width: 768px) {

          .profile-cover {
            height: 130px !important;
          }

          .col-auto.mt-3 {
            width: 100%;
          }

          .col-auto.mt-3 button {
            width: 100%;
          }

        }

      `}</style>
    </div>
  );
};

/* ============================================================
   STAT CARD
============================================================ */

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <div className="d-flex align-items-center">
          <div className="section-icon me-3">
            <i className={`bi ${icon}`}></i>
          </div>

          <div>
            <small className="text-muted d-block">{title}</small>

            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   INFORMATION ROW
============================================================ */

const InfoRow = ({ icon, label, value, last }) => {
  return (
    <div
      className={`d-flex align-items-center py-3 ${
        !last ? "border-bottom" : ""
      }`}
    >
      <div className="section-icon me-3">
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="flex-grow-1">
        <small className="text-muted d-block">{label}</small>

        <span className="fw-semibold text-dark">{value}</span>
      </div>
    </div>
  );
};

/* ============================================================
   COURSE PROGRESS
============================================================ */

const CourseProgress = ({ title, progress, last }) => {
  return (
    <div className={`${!last ? "mb-4" : ""}`}>
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-semibold">{title}</span>

        <span className="text-primary fw-bold">{progress}%</span>
      </div>

      <div className="progress" style={{ height: "9px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;
