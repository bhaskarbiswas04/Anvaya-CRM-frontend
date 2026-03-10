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
        className="btn btn-outline-success"
        onClick={() => setFilter("contacted")}
      >
        Contacted
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