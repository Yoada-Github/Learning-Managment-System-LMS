import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await forgotPassword(email.trim());

      setMessage(
        response.message ||
          "If an account with that email exists, a password reset link has been sent."
      );

      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">

      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          maxWidth: "95%",
          borderRadius: "15px",
        }}
      >

        {/* Title */}
        <h2 className="text-center fw-bold text-primary mb-3">
          Forgot Password?
        </h2>

        <p className="text-center text-muted mb-4">
          Enter your email address and we'll send you a
          password reset link.
        </p>

        {/* Success Message */}
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">

          <button
            type="button"
            className="btn btn-link text-decoration-none"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;