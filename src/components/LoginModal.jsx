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
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
          dark:border-gray-600 bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
          dark:border-gray-600 bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:placeholder-gray-400"
        />

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl hover:opacity-90 transition shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Login
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-800 py-3 px-7 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}