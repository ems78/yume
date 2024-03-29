import { NavLink } from "react-router-dom";
import {
  BsJournalText,
  BsTags,
  // BsGearWideConnected,
  BsPerson,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container-fluid vw-100 vh-100">
      <div className="row">
        {/* Side nav */}
        <div
          className="col-md-3 py-4 p-4 bg-dark position-fixed"
          style={{ color: "#E9D5CA", top: 0, bottom: 0, overflowY: "auto" }}>
          {/* Logo */}
          <div className="text-center mb-4">
            <h1 className="font-italic">Yume</h1>
            <img
              src="../public/batuso.jpeg"
              alt="Yume Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          {/* Nav buttons */}
          <nav
            className="nav flex-column bg-dark"
            style={{ backgroundColor: "#51557E" }}>
            <li className="nav-item">
              <NavLink
                to="/journal"
                className="nav-link fs-5"
                style={{ color: "#E9D5CA" }}>
                <BsJournalText /> Journal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/tags"
                className="nav-link fs-5"
                style={{ color: "#E9D5CA" }}>
                <BsTags /> Tags
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/settings"
                className="nav-link fs-5"
                style={{ color: "#E9D5CA" }}>
                <BsGearWideConnected /> Settings
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                to="/account"
                className="nav-link fs-5"
                style={{ color: "#E9D5CA" }}>
                <BsPerson /> Account
              </NavLink>
            </li>
          </nav>
        </div>
        <div
          className="col-md-9 py-4 text-light"
          style={{
            backgroundColor: "#3A3845",
            marginLeft: "25%",
            overflowY: "auto",
            height: "100vh",
          }}>
          {children}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
