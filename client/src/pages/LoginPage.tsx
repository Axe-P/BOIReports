// src/pages/LoginPage.tsx
import React, { useState } from "react";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://boireports-production.up.railway.app/api/superuser/login", { username, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/admin";
    } catch {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-page">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;