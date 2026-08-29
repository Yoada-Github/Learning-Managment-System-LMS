import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


const LessonPlayer = ({ lesson }) => (
  <div className="mt-6">
    <h3 className="text-2xl font-semibold mb-4">{lesson.title}</h3>
    <video controls className="w-full rounded-lg shadow-lg mb-4">
      <source src={lesson.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <p className="text-gray-700 whitespace-pre-line">{lesson.content}</p>
  </div>
);

export default LessonPlayer

/* 

export default LessonPlayer;
*/