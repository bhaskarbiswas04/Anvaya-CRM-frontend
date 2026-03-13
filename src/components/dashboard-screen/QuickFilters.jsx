export default function QuickFilters({ filter, setFilter }) {
  const getClass = (value) =>
    `btn me-2 ${filter === value ? "btn-primary" : "btn-outline-primary"}`;

  const getSuccessClass = (value) =>
    `btn ms-2 ${filter === value ? "btn-success" : "btn-outline-success"}`;

  return (
    <div className="mb-4">
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
        className={`btn ms-2 ${
          filter === "" ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={() => setFilter("")}
      >
        Recent
      </button>
    </div>
  );
}