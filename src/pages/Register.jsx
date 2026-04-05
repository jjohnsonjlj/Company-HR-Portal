import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    const newUser = {
      ...form,
      username: form.email,
      role: "USER",
      phone: "",
      dateOfJoining: new Date().toISOString().split("T")[0],
      profilePicture: "",
    };

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    alert("Account created!");
    navigate("/"); // back to home
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <h1 className="text-3xl font-semibold text-center">Create Account</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4 border border-gray-200 dark:border-gray-700">

        <input          
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700"
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700"
        />

        <input
          placeholder="Position"
          value={form.position}
          onChange={(e) =>
            setForm({ ...form, position: e.target.value })
          }
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700"
        />

        <button
          onClick={handleRegister}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-3 rounded-xl hover:opacity-90 transition shadow-lg text-sm font-medium w-full"
        >
          Register
        </button>

      </div>

    </div>
  );
}