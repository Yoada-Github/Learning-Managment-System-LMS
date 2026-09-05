import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-light mt-5"
      style={{
        borderRadius: "20px 20px 0 0",
      }}
    >
      <div className="container py-5">

        {/* Main Footer Content */}
        <div className="row g-4 justify-content-between">

          {/* Brand */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fw-bold text-info mb-3">
              Learnify
            </h4>

            <p className="text-secondary small mb-0">
              Empowering learners through interactive and
              personalized learning experiences. Join us and
              start your learning journey today!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-semibold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled small mb-0">
              <li className="mb-2">
                <a
                  href="/"
                  className="text-secondary text-decoration-none"
                >
                  Home
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="/courses"
                  className="text-secondary text-decoration-none"
                >
                  Courses
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="/about"
                  className="text-secondary text-decoration-none"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-semibold mb-3">
              Contact
            </h5>

            <ul className="list-unstyled small text-secondary mb-0">

              <li className="mb-2">
                <i className="bi bi-envelope text-info me-2"></i>
                <a
                  href="mailto:support@learnify.com"
                  className="text-secondary text-decoration-none"
                >
                  support@learnify.com
                </a>
              </li>

              <li className="mb-2">
                <i className="bi bi-telephone text-info me-2"></i>
                +1 (800) 123-4567
              </li>

              <li>
                <i className="bi bi-geo-alt text-info me-2"></i>
                Addis Ababa, Ethiopia
              </li>

            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-semibold mb-3">
              Follow Us
            </h5>

            <p className="text-secondary small">
              Stay connected with Learnify.
            </p>

            <div className="d-flex gap-3">

              <a
                href="#"
                className="text-light fs-4"
                aria-label="Website"
              >
                <i className="bi bi-globe"></i>
              </a>

              <a
                href="#"
                className="text-light fs-4"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>

              <a
                href="#"
                className="text-light fs-4"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="#"
                className="text-light fs-4"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="#"
                className="text-light fs-4"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-5 pt-4">

          <div className="row align-items-center">

            {/* Copyright */}
            <div className="col-md-6 text-center text-md-start">
              <p className="small text-secondary mb-0">
                © {new Date().getFullYear()}{" "}
                <span className="text-info fw-bold">
                  Learnify
                </span>
                . All rights reserved.
              </p>
            </div>

            {/* Bottom Links */}
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <a
                href="#"
                className="small text-secondary text-decoration-none me-3"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="small text-secondary text-decoration-none"
              >
                Terms of Service
              </a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;