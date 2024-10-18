import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
// import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
