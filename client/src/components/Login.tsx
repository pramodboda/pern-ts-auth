import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { handleLogin, token, user } = useAuth();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    handleLogin(email, password)
      .then((data) => {
        console.log("Login successful:", data);
        console.log(token);
        console.log(user);
      })
      .catch((err) => {
        // Handle error
        console.error("Login error:", err);
        setLoading(false);
      });
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
        {loading ? "Login..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
