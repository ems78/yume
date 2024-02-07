import { NavLink } from "react-router-dom";
import { BsJournalText, BsTags, BsGearWideConnected } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
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
              <NavLink to="/journal" className="nav-link text-light fs-5">
                <BsJournalText /> Journal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tags" className="nav-link text-light fs-5">
                <BsTags /> Tags
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link text-light fs-5">
                <BsGearWideConnected /> Settings
              </NavLink>
            </li>
          </nav>
        </div>
        <div className="col-md-9 py-4">
          {/* content goes here... */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
