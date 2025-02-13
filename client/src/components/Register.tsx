import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { handleRegister, error } = useAuth(); // Destructure handleLogin and error from useAuth
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handleRegister(firstname, lastname, username, email, password);

    setLoading(true);

    try {
      await handleRegister(firstname, lastname, username, email, password);

      console.log("Register successful! Please log in.");

      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        ex: First Name: pramod
        <br />
        Last Name: boda
        <br />
        User Name: prodev
        <br />
        Email: pro143@dev.com
        <br />
        Password: prodev@143
        <br />
        <br />
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          id="firstname"
          required
        />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          id="lastname"
          required
        />
        <br />
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          required
        />
        <br />
        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          required
        />
        <br />
        <label htmlFor="password">Passsword:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Display error if registration failed */}
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default Register;
