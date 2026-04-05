import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onLoginClick }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];
      login(user);

      // role redirect
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
    <div className="mt-auto p-4 border-t dark:border-gray-700">

  {!user ? (
    <button
      onClick={onLoginClick}
      className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
    >
      Login
    </button>
  ) : (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {user.username}
      </p>

      <button
        onClick={logout}
        className="w-full bg-red-500 text-white py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  )}

</div>
  );
}