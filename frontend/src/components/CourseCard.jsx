import "bootstrap/dist/css/bootstrap.min.css";

const CourseCard = ({ course }) => {
  return (
    <div className="card shadow-sm h-100">
      <img src={course.thumbnail || "https://via.placeholder.com/300x180"} className="card-img-top" alt={course.name}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{course.Catagories}</h5>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}> {course.description?.slice(0, 100)}...</p>
        <a href={`/course/${course._id}`} className="btn btn-primary w-100"> View Details </a>
      </div>
    </div>
  );
};

export default CourseCard;
