// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

// import ProtectedRoute from "./routes/ProtectedRoute"; // Import ProtectedRoute component;

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect to login by default */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
          {/* Protect the dashboard route */}
          {/* <Redirect from="/" to="/login" /> */}
          {/* Redirect to login by default */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
