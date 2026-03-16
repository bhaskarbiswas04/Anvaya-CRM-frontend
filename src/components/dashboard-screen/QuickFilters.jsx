export default function QuickFilters({ filter, setFilter }) {
  const getClass = (value) =>
    `btn ${filter === value ? "btn-primary" : "btn-outline-primary"}`;

  const getSuccessClass = (value) =>
    `btn ${filter === value ? "btn-success" : "btn-outline-success"}`;

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <button className={getClass("New")} onClick={() => setFilter("New")}>
        New
      </button>

      <button
        className={getClass("Contacted")}
        onClick={() => setFilter("Contacted")}
      >
        Contacted
      </button>

      <button
        className={getSuccessClass("Qualified")}
        onClick={() => setFilter("Qualified")}
      >
        Qualified
      </button>

      <button
        className={getSuccessClass("Proposal Sent")}
        onClick={() => setFilter("Proposal Sent")}
      >
        Proposal Sent
      </button>

      <button
        className={`btn ${
          filter === "" ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={() => setFilter("")}
      >
        Recent
      </button>
    </div>
  );
}