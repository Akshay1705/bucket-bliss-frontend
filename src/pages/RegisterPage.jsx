import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful 🎉 Please login now.");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );

      if (error.response?.data?.error) {
        setMessage(error.response.data.error); // Display backend error message (like "Email already registered")
      } else {
        setMessage("Registration failed.");
      }
    }
  };

  return (
    <div>
      <h2>Create Bucket Bliss Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegisterPage;
