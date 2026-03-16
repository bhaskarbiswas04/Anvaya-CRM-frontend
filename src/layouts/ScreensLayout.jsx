import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ScreensLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Mobile Toggle */}
        {!sidebarOpen && (
          <button
            className="btn btn-dark d-md-none position-fixed"
            style={{ top: "15px", left: "15px", zIndex: 1100 }}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        )}

        {children}
      </main>
    </div>
  );
}
