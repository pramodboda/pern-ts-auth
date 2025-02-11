import { useState } from "react";
import { register, login } from "../services/authService";
// import axios, { AxiosError } from "axios"; // Import AxiosError for proper type inference

// import { ErrorResponse } from "../types/types";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Store error messages

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
      setToken(data.token);
      setError(null); // Reset error if login is successful
    } catch (err) {
      // Catch the error and set the error state to the message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return { token, handleRegister, handleLogin, error };
};
