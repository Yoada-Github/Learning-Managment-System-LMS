import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


const ProgressBar = ({ progress }) => (
  
  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
    <div
      className="bg-blue-600 h-3 rounded-full transition-all"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;

/* 
*/