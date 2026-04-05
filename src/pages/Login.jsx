import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];
      login(user);

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="space-y-4 p-6">

      <input
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 
        dark:border-gray-600 bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 
        dark:border-gray-600 bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-primary text-black py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Login
      </button>

    </div>
  );
}