export default function LeadStats({ leads }) {
  const stats = {
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    proposalSent: leads.filter((l) => l.status === "Proposal Sent").length,
    closed: leads.filter((l) => l.status === "Closed").length,
  };

  const cards = [
    { title: "New", value: stats.new, color: "bg-info text-dark" },
    {
      title: "Contacted",
      value: stats.contacted,
      color: "bg-warning text-dark",
    },
    {
      title: "Qualified",
      value: stats.qualified,
      color: "bg-success text-white",
    },
    {
      title: "Proposal Sent",
      value: stats.proposalSent,
      color: "bg-primary text-white",
    },
    { title: "Closed", value: stats.closed, color: "bg-dark text-white" },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, index) => (
        <div key={index} className="col-xl col-lg-3 col-md-4 col-sm-6 col-12">
          <div className={`card shadow-sm border-0 p-3 ${card.color}`}>
            <h6 className="mb-2 fs-5">{card.title}</h6>
            <h3>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
