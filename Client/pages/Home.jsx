import React from "react";
import { FaUsers, FaConnectdevelop, FaHandshake } from "react-icons/fa";
import "./Home.css"; // Add styles for creativity
import NavBar from "../Components/NavBar";

function Home() {
  const styl = {
    color: "blue",
  };
  return (
    <>
      <NavBar />
      <div className="home-container">
        <header className="home-header">
          <h1 style={styl}>Welcome to VIDEO AI</h1>
          <p style={styl}>
            Connecting people, building relationships, sharing moments.
          </p>
        </header>

        <section className="networking-section">
          <div className="networking-card">
            <FaUsers style={{ fontSize: "50px", color: "rgb(0, 123, 255)" }} />
            <h2>Join the Community</h2>
            <p>Connect with millions of people across the globe.</p>
          </div>

          <div className="networking-card">
            <FaConnectdevelop
              style={{ fontSize: "50px", color: "rgb(0, 123, 255)" }}
            />
            <h2>Build Networks</h2>
            <p>Expand your professional and personal circles with ease.</p>
          </div>

          <div className="networking-card">
            <FaHandshake
              style={{ fontSize: "50px", color: "rgb(0, 123, 255)" }}
            />
            <h2>Collaborate & Grow</h2>
            <p>Share knowledge, work together, and grow stronger.</p>
          </div>
        </section>

        <footer className="home-footer">
          <p style={styl}>Start your journey with Video AI today!</p>
        </footer>
      </div>
      {/* <SplineA /> */}
    </>
  );
}

export default Home;
