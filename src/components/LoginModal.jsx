import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];
      login(user);

      onClose();

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5 animate-fadeIn">

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign In
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border dark:bg-gray-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
        >
          Login
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}