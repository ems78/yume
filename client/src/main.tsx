import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import JournalPage from "./pages/JournalPage.tsx";
import DreamLogPage from "./pages/DreamLogPage.tsx";
import TagsPage from "./pages/TagsPage.tsx";
import FilteredDreamLogPage from "./pages/FilteredDreamLogPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/" element={} />
        <Route path="/settings" element={Settings} /> */}
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/dreamLog/:id" element={<DreamLogPage />} />
        <Route
          path="/logs/filtered"
          element={<FilteredDreamLogPage logs={[]} tagName="" />}
        />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
