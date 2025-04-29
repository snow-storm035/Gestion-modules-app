import "../style/styleLogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../Axios/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      // Send login request to Laravel Sanctum endpoint
      const response = await axiosClient.post("/login", {
        email,
        password,
      });

      // If login successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        // Store user data (adjust according to your API response)
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect to protected route
        navigate("/app/home");
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with error status (4xx, 5xx)
        setError(err.response.data.message || "Login failed");
      } else {
        // Network or other errors
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              placeholder="Enter email" 
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              placeholder="Enter password" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}