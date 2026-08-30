import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// LOGIN
// ================================
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// ================================
// REGISTER
// ================================
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// ================================
// FORGOT PASSWORD
// ================================
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

// ================================
// RESET PASSWORD
// ================================
export const resetPassword = async (token, password) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};

export default api;