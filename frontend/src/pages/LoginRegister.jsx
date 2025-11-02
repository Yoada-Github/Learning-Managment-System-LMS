import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginRegister = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = isLogin
      ? await login({ email: formData.email, password: formData.password })
      : await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

    console.log("API Response:", response); // ✅ Should show { _id, name, email, token }

    if (!response?.token) {
      throw new Error("No token returned from server");
    }

    // Save to localStorage or context
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify({
                                          id: response._id,
                                          name: response.name,
                                          email: response.email,
                                        })
    );

    setUser(response); 
    navigate("/dashboard"); 

  } catch (err) {
    console.error("Auth error:", err);
    alert(err.response?.data?.message || err.message);
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center vh-200 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center fw-bold text-primary">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => setIsLogin(!isLogin)}
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
