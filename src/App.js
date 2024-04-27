import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import OrganizationListComp from "./components/OrganizationList";
import AddOrganizationComp from "./components/AddOrganizationComp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/organization-list" element={<OrganizationListComp />} />
        <Route path="/add-organization" element={<AddOrganizationComp />} />
      </Routes>
    </Router>
  );
}

export default App;
