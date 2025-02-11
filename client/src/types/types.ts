// types.ts

// Define the ErrorResponse interface for better typing of error responses
export interface ErrorResponse {
  error: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  // Add other fields that are relevant to your user object
}
