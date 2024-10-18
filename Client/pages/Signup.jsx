import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create user data object
    const userData = {
      name,
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Registration successful:", result);
        navigate("/login");
        // Redirect or show success message
      } else {
        console.error("Registration failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value="Sign Up" />
          </form>
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
