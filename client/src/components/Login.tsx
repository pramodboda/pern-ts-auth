import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { handleLogin, error } = useAuth(); // Destructure handleLogin and error from useAuth
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleLogin(email, password); // Await the login function
      console.log("Login successful");

      // Redirect user to dashboard page after successful login
      navigate("/dashboard"); // Adjust route as needed
    } catch (err) {
      console.error("Login error:", err);
      // The error is already set in handleLogin, so no need to set it here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      ex: Email: pro143@dev.com
      <br />
      Password: prodev@143
      <br />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {/* Display error if login failed */}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default Login;
