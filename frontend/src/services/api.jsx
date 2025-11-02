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

// // ✅ COURSES
// export const getCourses = async () => {
//   return [
//     {
//       _id: "1",
//       title: "Frontend Web Development",
//       description: "Learn React, Bootstrap, and modern UI design.",
//       thumbnail: "https://source.unsplash.com/600x400/?reactjs,frontend",
//     },
//     {
//       _id: "2",
//       title: "Backend with Node.js",
//       description: "Master API development and database integration.",
//       thumbnail: "https://source.unsplash.com/600x400/?nodejs,backend",
//     },
//     {
//       _id: "3",
//       title: "Full Stack MERN",
//       description: "Build complete applications using MongoDB, Express, React, and Node.",
//       thumbnail: "https://source.unsplash.com/600x400/?mern,webdev",
//     },
//     {
//       _id: "4",
//       title: "Full Stack MERN",
//       description: "Build complete applications using MongoDB, Express, React, and Node.",
//       thumbnail: "https://source.unsplash.com/600x400/?mern,webdev",
//     },
//     {
//       _id: "5",
//       title: "Full Stack MERN",
//       description: "Build complete applications using MongoDB, Express, React, and Node.",
//       thumbnail: "https://source.unsplash.com/600x400/?mern,webdev",
//     },
//     {
//       _id: "6",
//       title: "Full Stack MERN",
//       description: "Build complete applications using MongoDB, Express, React, and Node.",
//       thumbnail: "https://source.unsplash.com/600x400/?mern,webdev",
//     },
//   ];
// };


// // ✅ PROGRESS
// export const getProgress = async (userId) => {
//   const res = await API.get(`/progress?userId=${userId}`);
//   return res.data;
// };

