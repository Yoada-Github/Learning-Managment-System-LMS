const Assignments = () => {
  return (
    <div>
      <h2 className="fw-bold mb-1">Assignments</h2>
      <p className="text-muted mb-4">View and submit your assignments</p>

      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="text-center py-5">
          <i className="bi bi-file-earmark-text display-1 text-primary"></i>
          <h4 className="mt-3">No Assignments Yet</h4>
          <p className="text-muted">Your assignments will appear here once you enroll in a course.</p>
        </div>
      </div>
    </div>
  );
};

export default Assignments;