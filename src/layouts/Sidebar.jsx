import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggle }) {
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/leads", label: "Leads" },
    { path: "/sales", label: "Sales" },
    { path: "/agents", label: "Agents" },
    { path: "/reports", label: "Reports" },
  ];

  const NavLinks = ({ onClick }) => (
    <ul className="nav flex-column mt-3">
      {navItems.map((item) => (
        <li className="nav-item" key={item.path}>
          <NavLink
            to={item.path}
            className="nav-link sidebar-link"
            onClick={onClick}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={toggle}
        />
      )}

      {/* Mobile Sidebar */}
      {isOpen && (
        <aside
          className="bg-dark text-white p-3 position-fixed top-0 start-0 vh-100 d-md-none"
          style={{ width: "220px", zIndex: 1050 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Anvaya</h4>

            <button className="btn btn-sm btn-light" onClick={toggle}>
              ✕
            </button>
          </div>

          <NavLinks onClick={toggle} />
        </aside>
      )}

      {/* Desktop Sidebar */}
      <aside
        className="bg-dark text-white p-3 d-none d-md-block vh-100"
        style={{ width: "220px", minWidth: "220px" }}
      >
        <h4>Anvaya</h4>
        <NavLinks />
      </aside>
    </>
  );
}