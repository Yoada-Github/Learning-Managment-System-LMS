import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user)
    return (
      <div className="container text-center my-5">
        <div className="alert alert-warning shadow-sm">
          Please log in to view your profile.
        </div>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center p-5">
          {/* Profile Image */}
          <div className="mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D6EFD&color=fff&size=100`}
              alt="Profile Avatar"
              className="rounded-circle border border-3 border-primary"
              style={{ width: "100px", height: "100px" }}
            />
          </div>

          {/* Profile Info */}
          <h3 className="card-title mb-3">{user.name}</h3>
          <p className="text-muted mb-4">{user.email}</p>

          <div className="d-flex justify-content-center mb-3">
            <span className="badge bg-primary fs-6 px-3 py-2">
              {user.role ? user.role.toUpperCase() : "STUDENT"}
            </span>
          </div>

          {/* Extra Info Section */}
          <div className="border-top pt-4">
            <p className="text-secondary mb-1">
              Welcome back, <strong>{user.name}</strong> 👋
            </p>
            <p className="text-muted small">
              Keep learning and tracking your progress in your personalized dashboard.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 d-flex justify-content-center gap-3">
            <button className="btn btn-outline-primary">Edit Profile</button>
            <button className="btn btn-outline-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
