import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ onLoginClick }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const nav = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Approvals", path: "/approvals" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">

      {/* Logo */}
      <div className="p-6 text-xl font-bold text-gray-900 dark:text-white">
        HR<span className="text-primary">Portal</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 px-4">
        {nav.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${active
                  ? "bg-primary text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Auth Section */}
      <div className="mt-auto p-4 border-t border-gray-500 dark:border-gray-500 text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
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
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:opacity-90"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </aside>
  );
}