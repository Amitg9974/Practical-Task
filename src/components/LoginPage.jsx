import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword, validateUrl } from "../Utils";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationUrl: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();


// Store Form data on state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: "" });

    // Validation Error for each field
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          setFormErrors({ ...formErrors, email: "Invalid email format" });
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          setFormErrors({
            ...formErrors,
            password: "Password does not meet criteria",
          });
        }
        break;
      case "organizationUrl":
        if (!validateUrl(value)) {
          setFormErrors({
            ...formErrors,
            organizationUrl: "Invalid URL format, ex - http://localhost:3000/",
          });
        }
        break;
      default:
        break;
    }
  };

  // Submit the Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formErrors).some((error) => error !== "")) {
      return;
    }

    if (!formData.email || !formData.password || !formData.organizationUrl) {
      setFormErrors({
        ...formErrors,
        form: "All fields are required",
      });
      return;
    }

    // Fetch Post api url and store auth_token in localStorage
    try {
      const response = await fetch("http://122.170.12.63:90/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        localStorage.setItem("auth_token", data.auth_token);
        navigate("/organization-list");
      } else {
        setFormErrors({
          ...formErrors,
          form: data.message || "Failed to login",
        });
      }
    } catch (err) {
      setFormErrors({ ...formErrors, form: "Network error" });
    }
  };

  return (
    <React.Fragment>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "11rem",
          }}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          {formErrors.email && (
            <div style={{ color: "red" }}>{formErrors.email}</div>
          )}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          {formErrors.password && (
            <div style={{ color: "red" }}>{formErrors.password}</div>
          )}
          <span style={{ fontSize: "10px", marginBottom: "8px" }}>
            Your password must be at least 8 characters long, include uppercase
            and lowercase letters, a number, and a special character such as @,
            #, $, etc'
          </span>
          <label>Organization URL</label>
          <input
            type="url"
            name="organizationUrl"
            placeholder="Enter organization URL"
            value={formData.organizationUrl}
            onChange={handleChange}
            style={{ margin: "8px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          {formErrors.organizationUrl && (
            <div style={{ color: "red" }}>{formErrors.organizationUrl}</div>
          )}
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "grey",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Login
          </button>
          {formErrors.form && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {formErrors.form}
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
