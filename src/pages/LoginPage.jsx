import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("bucketBlissToken", token); // save token

      setMessage("Login successful 🎉");
      window.location.href = "/dashboard"; // redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed 😔");
    }
  };

  return (
    <div>
      <h2>Login to Bucket Bliss</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
