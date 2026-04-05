import { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("admin");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  if (view === "user") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("admin")}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          ← Back to Admin
        </button>
        <UserDashboard />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={() => setView("user")}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:opacity-80"
        >
          View as User
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Total Users", value: users.length },
          { label: "Admins", value: users.filter(u => u.role === "ADMIN").length },
          { label: "Employees", value: users.filter(u => u.role === "USER").length },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.label}
            </p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900">
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3">{u.name}</td>
                <td className="p-3 text-gray-500">{u.email}</td>
                <td className="p-3">{u.department}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs">
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}