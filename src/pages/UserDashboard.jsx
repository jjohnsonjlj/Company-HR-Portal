import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function UserDashboard() {
  const { user, login } = useAuth();
  const [form, setForm] = useState(user);
  const [tab, setTab] = useState("profile");

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const updated = await res.json();
    login(updated);
  };

  return (
    <div className="space-y-6 max-w-3xl">

      <h1 className="text-3xl font-semibold">My Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {["profile", "requests", "onboarding"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm capitalize transition
              ${
                tab === t
                  ? "bg-white dark:bg-gray-900 shadow"
                  : "text-gray-500"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">

        {tab === "profile" && (
          <div className="grid gap-4">

            <input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 border rounded bg-gray-50 dark:bg-gray-700"
            />

            <input
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 border rounded bg-gray-50 dark:bg-gray-700"
            />

            <button
              onClick={handleUpdate}
              className="bg-primary text-white px-4 py-2 rounded-lg w-fit"
            >
              Save Changes
            </button>
          </div>
        )}

        {tab === "requests" && (
          <p className="text-gray-500">Requests coming next...</p>
        )}

        {tab === "onboarding" && (
          <ul className="space-y-2 text-sm">
            <li>✔ Profile complete</li>
            <li>✔ Documents submitted</li>
            <li>⬜ Team intro pending</li>
          </ul>
        )}

      </div>

    </div>
  );
}