const Messages = () => {
  return (
    <div>
      <h2 className="fw-bold mb-1">Messages</h2>
      <p className="text-muted mb-4">Chat with instructors and classmates</p>

      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="text-center py-5">
          <i className="bi bi-envelope-open display-1 text-info"></i>
          <h4 className="mt-3">No Messages Yet</h4>
          <p className="text-muted">Your conversations will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;