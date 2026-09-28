const Certificates = () => {
  return (
    <div>
      <h2 className="fw-bold mb-1">Certificates</h2>
      <p className="text-muted mb-4">Your earned certificates</p>

      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="text-center py-5">
          <i className="bi bi-award display-1 text-warning"></i>
          <h4 className="mt-3">No Certificates Yet</h4>
          <p className="text-muted">Complete a course to earn your first certificate.</p>
        </div>
      </div>
    </div>
  );
};

export default Certificates;