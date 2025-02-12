import React, { useEffect, useState, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Inactivity timeout duration (1 hour)
// const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds

// Set inactivity timeout (10 seconds for testing)
const INACTIVITY_TIMEOUT = 10 * 1000; // 10 seconds in milliseconds

const ProtectedRoute: React.FC = () => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const inactivityTimeout = useRef<number | null>(null);
  useEffect(() => {
    const lastActivity = sessionStorage.getItem("lastActivity");

    // Check if the session has expired
    if (
      lastActivity &&
      Date.now() - Number(lastActivity) > INACTIVITY_TIMEOUT
    ) {
      setIsSessionExpired(true);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("lastActivity");
    }

    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
      console.log("User activity detected, resetting inactivity timer.");
      sessionStorage.setItem("lastActivity", Date.now().toString());

      // Clear the previous timeout
      if (inactivityTimeout.current !== null) {
        clearTimeout(inactivityTimeout.current);
      }

      // Set a new timeout
      inactivityTimeout.current = setTimeout(() => {
        console.log("User inactive for too long, logging out.");
        setIsSessionExpired(true);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("lastActivity");
      }, INACTIVITY_TIMEOUT);
    };

    // Initialize the inactivity timer
    resetInactivityTimer();

    // Add event listeners for user activity
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);

    // Cleanup event listeners and timeout on unmount
    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      if (inactivityTimeout.current !== null) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);

  // If the session is expired, navigate to login
  if (isSessionExpired) {
    return <Navigate to="/login" />;
  }

  // Check if the token exists, otherwise navigate to login
  const token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
