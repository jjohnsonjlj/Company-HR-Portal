import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Sidebar({ onLoginClick }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-primary text-white"
      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";

  const [dark, setDark] = useState(false);

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
  }, []);

  // apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <aside className="w-64 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">

      {/* Logo */}
      <div className="p-6 text-xl font-bold text-gray-900 dark:text-white text-center">
        HR<span className="text-primary">Portal</span>
      </div>

      <button
        onClick={() => setDark(!dark)}
        className="m-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
      >
        {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      {/* NAV */}
      <nav className="flex-1 flex flex-col space-y-1 px-4 py-2 text-md">

        {/* Public */}
        <Link to="/" className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/")}`}>
          Home
        </Link>

        <Link to="/about" className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/about")}`}>
          About
        </Link>

        {!user && (
          <Link to="/preview" className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/preview")}`}>
            Preview Dashboard
          </Link>
        )}

        {/* Logged-in USER */}
        {user && (
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/dashboard")}`}
          >
            User Dashboard
          </Link>
        )}

        {/* ADMIN ONLY */}
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/admin")}`}
          >
            Admin Dashboard
          </Link>
        )}
          {user?.role === "ADMIN" && (
          <Link to="/reports" className={`px-4 py-2 rounded text-black dark:text-gray-300 ${isActive("/reports")}`}>
            Reports
          </Link>
        )}

      </nav>

      {/* AUTH SECTION */}
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">

        {!user ? (
          <>
            <button
              onClick={onLoginClick}
              className="w-full bg-primary text-black py-2 rounded-lg hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-white dark:text-gray-300 transition-colors"
            >
              Login
            </button>

            <Link
              to="/register"
              className="block text-center text-sm text-gray-500 hover:underline"
            >
              New User? Register
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.name}
            </p>

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </aside>
  );
}