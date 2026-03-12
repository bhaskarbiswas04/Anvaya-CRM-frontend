export default function QuickFilters({ setFilter }) {
  return (
    <div className="mb-4">
      <button
        className="btn btn-outline-primary me-2"
        onClick={() => setFilter("New")}
      >
        New
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => setFilter("Contacted")}
      >
        Contacted
      </button>

      <button
        className="btn btn-outline-success ms-2"
        onClick={() => setFilter("Qualified")}
      >
        Qualified
      </button>

      <button
        className="btn btn-outline-success ms-2"
        onClick={() => setFilter("Proposal Sent")}
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