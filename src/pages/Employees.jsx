import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Employees() {
  const { user } = useAuth(); // 🔥 get logged-in user
  const isAdmin = user?.role === "ADMIN";

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data.filter((u) => u.role === "USER"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!isAdmin) return;

    const payload = {
      ...form,
      username: form.email,
      password: "1234",
      role: "USER",
      phone: "",
      dateOfJoining: new Date().toISOString().split("T")[0],
    };

    if (editingId) {
      await fetch(`http://localhost:3001/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setForm({ name: "", email: "", department: "", position: "" });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    if (!isAdmin) return;
    setForm(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Employees</h1>

      {/* 🔒 Admin-only form */}
      {isAdmin && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <input
            placeholder="Position"
            value={form.position}
            onChange={(e) =>
              setForm({ ...form, position: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      )}

      {/* 👀 View-only message for non-admin */}
      {!isAdmin && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          You have view-only access.
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              {isAdmin && <th></th>}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.department}</td>
                <td>{u.position}</td>

                {/* 🔒 Actions only for admin */}
                {isAdmin && (
                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}