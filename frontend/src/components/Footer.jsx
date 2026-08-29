import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 mt-5 pb-3 px-2 rounded ">
      <div className="container">
        <div className="row gy-4 col-12">
          <div className="col-md-6 col-lg-3">
            <h4 className="fw-bold text-info mb-3">Learnify</h4>
            <p className="small">
              Empowering learners through interactive and personalized learning
              experiences. Join us and start your learning journey today!
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-6 col-lg-3">
            <h5 className="fw-semibold mb-3">Contact</h5>
            <ul className="list-unstyled small">
              <li>Email: <a href="mailto:support@learnify.com" className="text-decoration-none text-light ">support@learnify.com</a></li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Location: Addis Ababa, Ethiopia</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-6 col-lg-3">
            <h5 className="fw-semibold mb-3">Follow Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-light"><i className="bi bi-globe"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-4 pt-3 text-center small">
          <p className="mb-0"> © {new Date().getFullYear()} <span className="text-primary fw-bold">Learnify</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
