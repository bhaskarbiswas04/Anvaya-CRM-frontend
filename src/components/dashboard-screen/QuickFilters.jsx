export default function QuickFilters({ setFilter }) {
  return (
    <div className="mb-4">
      <button
        className="btn btn-outline-primary me-2"
        onClick={() => setFilter("new")}
      >
        New
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => setFilter("contacted")}
      >
        Contacted
      </button>

      <button
        className="btn btn-outline-success ms-2"
        onClick={() => setFilter("qualified")}
      >
        Qualified
      </button>

      <button
        className="btn btn-outline-success ms-2"
        onClick={() => setFilter("proposal send")}
      >
        Proposal Sent
      </button>

      <button
        className="btn btn-outline-secondary ms-2"
        onClick={() => setFilter("")}
      >
        All
      </button>
    </div>
  );
}