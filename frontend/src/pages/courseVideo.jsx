import React, { useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

function CourseVideo({ courseId, userId, videoUrl }) {
  const [progress, setProgress] = useState(0);

  // Track progress %
  const handleProgress = (state) => {
    const percent = Math.floor(state.played * 100);
    setProgress(percent);
  };

  // When video ends → enroll student
  const handleComplete = async () => {
    try { await axios.post("http://localhost:5000/enrollment/enroll", {
        userId,
        courseId,
      });

      alert("🎉 Congrats! You are now officially enrolled.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-4">
      <h3>Watch Course Video</h3>

      <ReactPlayer
        url={videoUrl}
        width="100%"
        controls
        onProgress={handleProgress}
        onEnded={handleComplete}
      />

      <p className="mt-3">Progress: {progress}%</p>
    </div>
  );
}

export default CourseVideo