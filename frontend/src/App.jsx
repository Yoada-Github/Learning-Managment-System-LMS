import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";   // ← ADD THIS
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CoursesDetail";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import LoginRegister from "./pages/LoginRegister";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassward";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Home from "./pages/Home";
import Assignments from "./pages/Assignments";
import Certificates from "./pages/Certificates";
import Messages from "./pages/Messages";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div
          className="d-flex flex-column min-vh-100"
          style={{
            marginLeft: "260px",
            backgroundColor: "#f8fafc",
          }}
        >
          {/* TOP BAR WITH SEARCH */}
          <Topbar />

          {/* MAIN CONTENT */}
          <main className="flex-grow-1 p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<Home />} />

              {/* Course Routes */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/create" element={<CreateCourse />} />
              <Route path="/edit/:id" element={<EditCourse />} />

              {/* User Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;