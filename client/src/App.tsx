import { NavLink } from "react-router-dom";
import {
  BsJournalText,
  BsTags,
  BsGearWideConnected,
  BsPerson,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container-fluid vw-100 vh-100">
      <div className="row">
        {/* Side nav */}
        <div className="col-md-3 bg-dark text-light py-4 vh-100 p-4">
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src="/path/to/logo.png"
              alt="Yume Logo"
              style={{ maxWidth: "80%", height: "auto" }}
            />
            <h5 className="mb-5">Yume</h5>
          </div>
          {/* Nav buttons */}
          <nav className="nav flex-column bg-dark">
            <li className="nav-item">
              <NavLink
                to="/journal"
                className="nav-link fs-5"
                style={{ color: "#F0ECE5" }}>
                <BsJournalText /> Journal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/tags"
                className="nav-link fs-5"
                style={{ color: "#F0ECE5" }}>
                <BsTags /> Tags
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/settings"
                className="nav-link fs-5"
                style={{ color: "#F0ECE5" }}>
                <BsGearWideConnected /> Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/account"
                className="nav-link fs-5"
                style={{ color: "#F0ECE5" }}>
                <BsPerson /> Account
              </NavLink>
            </li>
          </nav>
        </div>
        <div
          className="col-md-9 py-4 text-light"
          style={{ backgroundColor: "#2d3748" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
