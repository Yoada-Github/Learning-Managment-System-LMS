import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../index.css";

const backButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-btn " onClick={() => navigate(-1)}>
      <i className="bi bi-arrow-left-circle me-2"></i>
    </button>
  );
};

export default backButton;
