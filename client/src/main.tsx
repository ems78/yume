import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AccountPage from "./pages/accountPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/" element={} />
          <Route path="/journal" element={Journal} />
          <Route path="/tags" element={Tags} />
          <Route path="/settings" element={Settings} /> */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
