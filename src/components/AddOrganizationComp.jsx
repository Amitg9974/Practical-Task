import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUrl } from "../Utils";

function AddOrganizationComp() {
  const [organizationDetails, setOrganizationDetails] = useState({
    organizationName: "",
    organizationShortName: "",
    organizationURL: "",
    organizationLOGO: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // It is used for validation of Form
  const validateForm = () => {
    const newErrors = {};

    if (
      !organizationDetails.organizationName ||
      organizationDetails.organizationName.length > 100
    ) {
      newErrors.organizationName =
        "Organization Name is required and must be under 100 characters.";
    }
    if (
      !organizationDetails.organizationShortName ||
      organizationDetails.organizationShortName.length > 50
    ) {
      newErrors.organizationShortName =
        "Organization Short Name is required and must be under 50 characters.";
    }
    if (
      !organizationDetails.organizationURL ||
      !validateUrl.test(organizationDetails.organizationURL)
    ) {
      newErrors.organizationURL = "A valid Organization URL is required.";
    }
    if (
      !organizationDetails.organizationLOGO ||
      organizationDetails.organizationLOGO.length > 200
    ) {
      newErrors.organizationLOGO =
        "Logo is required and must be under 200 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setOrganizationDetails({
      ...organizationDetails,
      [e.target.name]: e.target.value,
    });
  };

  // For Fubmit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch API
    try {
      const response = await fetch(process.env.REACT_APP_ADD_ORGANIZATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(organizationDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/organization-list");
    } catch (error) {
      console.error("Failed to save organization:", error);
    }
  };

  // Cancel Button
  const handleCancel = () => {
    navigate("/organization-list");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={organizationDetails.organizationName}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", width: "100%" }}
          />
          {errors.organizationName && (
            <div style={{ color: "red" }}>{errors.organizationName}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="organizationShortName"
            placeholder="Organization Short Name"
            value={organizationDetails.organizationShortName}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", width: "100%" }}
          />
          {errors.organizationShortName && (
            <div style={{ color: "red" }}>{errors.organizationShortName}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="organizationURL"
            placeholder="Organization URL"
            value={organizationDetails.organizationURL}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", width: "100%" }}
          />
          {errors.organizationURL && (
            <div style={{ color: "red" }}>{errors.organizationURL}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="organizationLOGO"
            placeholder="Logo"
            value={organizationDetails.organizationLOGO}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", width: "100%" }}
          />
          {errors.organizationLOGO && (
            <div style={{ color: "red" }}>{errors.organizationLOGO}</div>
          )}
        </div>
        <div style={{ margin: "20px 0" }}>
          <button type="submit" style={{ padding: "10px", marginRight: "8px" }}>
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ padding: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOrganizationComp;
