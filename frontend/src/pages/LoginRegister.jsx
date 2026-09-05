import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginRegister = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Handle Login / Register
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = isLogin
        ? await login({
            email: formData.email.trim(),
            password: formData.password,
          })
        : await register({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          });

      console.log("API Response:", response);

      // Make sure backend returned JWT token
      if (!response?.token) {
        throw new Error("No authentication token returned from server.");
      }

      // ==========================================
      // Save Token
      // ==========================================
      localStorage.setItem("token", response.token);

      // ==========================================
      // Save User Information
      // ==========================================
      const userData = {
        id: response._id,
        name: response.name,
        email: response.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      // ==========================================
      // Update Auth Context
      // ==========================================
      setUser({
        ...response,
        ...userData,
      });

      // ==========================================
      // Redirect to Dashboard
      // ==========================================
      navigate("/dashboard");

    } catch (err) {
      console.error("Auth error:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Switch Login / Register
  // ==========================================
  const handleSwitch = () => {
    setIsLogin(!isLogin);

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setError("");
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

        {/* ======================================
            Title
        ======================================= */}
        <h2 className="text-center fw-bold text-primary mb-4">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-center text-muted mb-4">
          {isLogin
            ? "Login to continue to your account"
            : "Create your LMS account"}
        </p>

        {/* ======================================
            Error Message
        ======================================= */}
        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* ======================================
            Form
        ======================================= */}
        <form onSubmit={handleSubmit}>

          {/* Name - Register Only */}
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required
              minLength={6}
            />
          </div>

          {/* ======================================
              Forgot Password
          ======================================= */}
          {isLogin && (
            <div className="text-end mb-4">

              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none"
                onClick={() =>
                  navigate("/forgot-password")
                }
              >
                Forgot Password?
              </button>

            </div>
          )}

          {/* Register spacing */}
          {!isLogin && (
            <div className="mb-4"></div>
          )}

          {/* ======================================
              Login / Register Button
          ======================================= */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Loggin..."
                : "Creating Account..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>

        </form>

        {/* ======================================
            Switch Login / Register
        ======================================= */}
        <div className="text-center mt-4">

          <small className="text-muted">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            {" "}

            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={handleSwitch}
              disabled={loading}
            >
              {isLogin ? "Register" : "Login"}
            </button>

          </small>

        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
