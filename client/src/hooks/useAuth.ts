import { useState } from "react";
import { register, login } from "../services/authService";

import { User } from "../types/types";

import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Use the User type here
  const [error, setError] = useState<string | null>(null); // Store error messages

  const navigate = useNavigate();

  // handle Register: Register a new user
  const handleRegister = async (
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await register(
        firstname,
        lastname,
        username,
        email,
        password
      );
      setToken(data.token);
      setUser(data.user);

      // sessionStorage.setItem("token", data.token);
      // sessionStorage.setItem("user", JSON.stringify(data.user));
      // sessionStorage.setItem("lastActivity", Date.now().toString()); // Set last activity time

      setError(null); // Reset error if registration is successful
    } catch (err: unknown) {
      // Catch the error and set the error state to the message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong during registration.");
      }
    }
  };

  // handle Login - Log the user in
  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user); // Type safe now

        sessionStorage.setItem("token", data.token); // Persist token in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data.user)); // Persist user info
        sessionStorage.setItem("lastActivity", Date.now().toString()); // Set last activity time

        setError(null); // Reset error if login is successful
      } else {
        setError("Login failed, no token or user info received.");
      }
    } catch (err) {
      // Catch the error and set the error state to the message
      if (err instanceof Error) {
        console.error(err); // Log the error for debugging
        setError(err.message);
      } else {
        setError("Something went wrong during login.");
      }
    }
  };

  // handle user Logout
  const handleLogout = () => {
    console.log("Logging out.");
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("lastActivity");

    setError(null); // Clear any existing error on logout

    navigate("/login");
  };

  // Refresh the token or handle session expiration logic if necessary
  const refreshSession = () => {
    // Here you could call a backend service to refresh the token
    // Example: request a new token if the session is still valid (in case of refresh tokens)
  };

  return {
    token,
    user,
    handleRegister,
    handleLogin,
    handleLogout,
    error,
    refreshSession,
  };
};
