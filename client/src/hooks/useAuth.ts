import { useState, useEffect } from "react";
import { register, login } from "../services/authService";

import { User } from "../types/types";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Use the User type here
  const [error, setError] = useState<string | null>(null); // Store error messages

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as User); // Type assertion to User
    }
  }, []);

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
      setUser(data.user); // Type safe now
      setError(null); // Reset error if registration is successful
    } catch (err: unknown) {
      // Catch the error and set the error state to the message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user); // Type safe now
        localStorage.setItem("token", data.token); // Persist token in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Persist user info
        setError(null); // Reset error if login is successful
      } else {
        setError("Login failed, no token or user info received");
      }
    } catch (err) {
      // Catch the error and set the error state to the message
      if (err instanceof Error) {
        console.error(err); // Log the error for debugging
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return { token, user, handleRegister, handleLogin, error };
};
