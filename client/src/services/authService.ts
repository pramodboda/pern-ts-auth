import axios, { AxiosError } from "axios";

const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

export const register = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      firstname,
      lastname,
      username,
      email,
      password,
    });
    return response.data; // Return successful response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with an error status
        const errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          "Registration failed.";
        console.error("Response error:", error.response.data);
        throw new Error(errorMessage); // Use error message from response
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        throw new Error("Server did not respond. Please try again later.");
      } else {
        // General error (e.g., something wrong with the setup)
        console.error("Axios error:", error.message);
        throw new Error("An error occurred during the request.");
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors (non-Axios related)
      console.error("Error message:", error.message);
      throw new Error(error.message || "Registration failed.");
    } else {
      // Handle unknown errors (fallback)
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred.");
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the successful response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with an error status
        const errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          "Login failed.";
        console.error("Response error:", error.response.data);
        throw new Error(errorMessage); // Use error message from response
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        throw new Error("Server did not respond. Please try again later.");
      } else {
        // General error (e.g., something wrong with the setup)
        console.error("Axios error:", error.message);
        throw new Error("An error occurred during the request.");
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript errors (non-Axios related)
      console.error("Error message:", error.message);
      throw new Error(error.message || "Login failed.");
    } else {
      // Handle unknown errors (fallback)
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred.");
    }
  }
};
