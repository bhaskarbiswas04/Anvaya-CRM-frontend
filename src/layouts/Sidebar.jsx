import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="sidebar bg-dark text-white p-3 d-none d-md-block"
      style={{ width: "220px" }}
    >
      <h4>Anvaya</h4>

      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <NavLink className="nav-link sidebar-link" to="/">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link sidebar-link" to="/leads">
            Leads
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link sidebar-link" to="/sales">
            Sales
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link sidebar-link" to="/agents">
            Agents
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link sidebar-link" to="/reports">
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
}