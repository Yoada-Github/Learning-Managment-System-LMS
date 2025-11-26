import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ AUTH
export const login = async ({ email, password }) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    // console.log("Login Response:", res.data); // optional debug
    return res.data; // returns { _id, name, email, token }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const res = await API.post("/auth/register", { name, email, password });
    // console.log("Register Response:", res.data); // optional debug
    return res.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
    throw err;
  }
};

