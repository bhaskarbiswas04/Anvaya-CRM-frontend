export default function LeadList({ leads }) {
  return (
    <>
      <h4>Recent Leads</h4>
      {leads.map((lead, index) => (
        <div key={index} className="card mb-2 p-2">
          {lead}
        </div>
      ))}
    </>
  );
}