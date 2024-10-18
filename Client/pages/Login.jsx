import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import NavBar from "../Components/NavBar";

function Login() {
  const [uname, setUname] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading state

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uname: uname,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);

        // Store the token and userId (ensure userId is retrieved from backend)
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId || uname); // Store userId from response or use uname as fallback

        window.location.href = "https://callwithai.netlify.app";
      } else {
        console.error("Login failed:", result.message);
        alert(result.message); // Show error message to the user
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2>Login to VIDEO AI</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              value={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </form>
          <div className="forgot-password">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
