import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [dark, setDark] = useState(false);
  const { user, logout } = useAuth();

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-500 dark:border-gray-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Welcome to HR-<span className="text-primary">Portal!</span>
        </h1>
        <h2 className="text-sm text-gray-500 dark:text-gray-400">Where we make HR easier.</h2>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          
          <Link to="/" className="hover:text-primary">
            Home
          </Link>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(prev => !prev)}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
          >
            {dark ? "Light" : "Dark"}
          </button>

        </nav>

      </div>
    </header>
  );
}