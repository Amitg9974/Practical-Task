import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function OrganizationListComp() {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/");
      return;
    }

    // fetch API for get organization list
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(
          "http://122.170.12.63:90/api/Organization/getAllOrganization",
          {
            headers: { Authorization: token },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrganizations(data?.data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        navigate("/");
      }
    };

    fetchOrganizations();
  }, [navigate]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="container">
        <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
          <button
            onClick={() => navigate("/add-organization")}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Add Organization
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            LOGOUT
          </button>
        </div>
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
              <th>Organization Name</th>
              <th>Short Name</th>
              <th>URL</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, index) => (
              <tr key={index}>
                <td>{org?.organizationName}</td>
                <td>{org?.organizationShortName}</td>
                <td>
                  <a
                    href={org?.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {org?.organizationURL}
                  </a>
                </td>
                <td>{org?.organizationLOGO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default OrganizationListComp;
