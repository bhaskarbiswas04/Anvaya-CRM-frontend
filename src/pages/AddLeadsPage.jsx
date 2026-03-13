import Sidebar from "../layouts/Sidebar";
import LeadForm from "../components/LeadForm";

export default function AddLeadsPage() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <main className="flex-grow-1 bg-light my-4">
        <LeadForm />
      </main>
    </div>
  );
}