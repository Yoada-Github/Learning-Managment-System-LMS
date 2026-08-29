import React from "react";
import img from "../assets/LMS.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <section className="container-fluid bg-light py-5">
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center g-5">
          {/* Left Text */}
          <div className="col-12 col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold text-primary mb-3">
              Empower Your Future Through Learning
            </h1>
            <p className="lead text-secondary mb-4">
              Build real-world skills that open doors to new opportunities. 
              Whether you're starting your journey or advancing your career, 
              we’re here to guide you every step of the way.
            </p>
            <a
              href="/login"
              className="btn btn-primary btn-lg px-4 shadow-sm"
            >
              Get Started
            </a>
          </div>

          {/* Right Image */}
          <div className="col-12 col-md-6 text-center">
            <img
              src={img}
              alt="Learning illustration"
              className="img-fluid rounded-4 shadow-lg w-100"
              style={{ maxWidth: "520px" }}
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-5 pt-5 text-center">
          <h2 className="fw-bold text-dark mb-4">Why Learn With Us?</h2>
          <p className="text-muted mb-5">
            We combine expert instruction, flexible learning, and proven results to help you succeed.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mb-3 text-primary fs-2">
                  <i className="bi bi-person-badge"></i>
                </div>
                <h5 className="fw-semibold text-primary">Expert Instructors</h5>
                <p className="text-muted">
                  Learn from experienced professionals who bring practical industry knowledge to every lesson.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mb-3 text-primary fs-2">
                  <i className="bi bi-laptop"></i>
                </div>
                <h5 className="fw-semibold text-primary">Flexible Learning</h5>
                <p className="text-muted">
                  Study at your own pace — anytime, anywhere. Access resources and track your progress online.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="mb-3 text-primary fs-2">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h5 className="fw-semibold text-primary">Career Growth</h5>
                <p className="text-muted">
                  Upgrade your skills, gain certifications, and unlock new opportunities in your professional path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
