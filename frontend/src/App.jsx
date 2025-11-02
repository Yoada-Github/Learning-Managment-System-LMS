import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CoursesDetail";
// import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import LoginRegister from "./pages/LoginRegister";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow-1 container my-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateCourse />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/edit/:id" element={<EditCourse />} />
              <Route path="/" element={<Home />} />

              {/*<Route path="/lesson/:id" element={<Lesson />} /> */}

              {/* Protected Routes */}
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
