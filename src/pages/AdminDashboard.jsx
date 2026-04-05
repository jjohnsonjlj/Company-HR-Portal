import { useEffect, useState } from "react";
import EmployeeTable from "../components/admin/EmployeeTable";
import EmployeeModal from "../components/admin/EmployeeModal";
import RequestsTable from "../components/admin/RequestsTable";
import Toast from "../components/Toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState("");

  const [errors, setErrors] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    department: "",
    position: "",
  });

  const fetchData = async () => {
    const u = await fetch("http://localhost:3001/users").then(r => r.json());
    const r = await fetch("http://localhost:3001/requests").then(r => r.json());

    setUsers(u);
    setRequests(r);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const saveEmployee = async () => {
    const e = {};
    if (!newUser.name) e.name = "Required";
    if (!newUser.email) e.email = "Required";
    if (!editingUser && !newUser.password) e.password = "Required";
    if (!newUser.department) e.department = "Required";
    if (!newUser.position) e.position = "Required";

    setErrors(e);
    if (Object.keys(e).length) return;

    if (editingUser) {
      await fetch(`http://localhost:3001/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      showToast("Updated");
    } else {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser, id: `user-${Date.now()}` }),
      });
      showToast("Created");
    }

    setShowModal(false);
    fetchData();
  };

  return (
    <div className="space-y-8">

      <Toast message={toast} />

      <RequestsTable
        requests={requests}
        users={users}
        onUpdate={async (r, status) => {
          await fetch(`http://localhost:3001/requests/${r.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...r, status }),
          });
          fetchData();
        }}
        onDelete={async (id) => {
          await fetch(`http://localhost:3001/requests/${id}`, { method: "DELETE" });
          fetchData();
        }}
      />

      <EmployeeTable
        users={users}
        onAdd={() => setShowModal(true)}
        onEdit={(u) => {
          setEditingUser(u);
          setNewUser(u);
          setShowModal(true);
        }}
        onDelete={async (id) => {
          await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
          fetchData();
        }}
      />

      <EmployeeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={saveEmployee}
        newUser={newUser}
        setNewUser={setNewUser}
        errors={errors}
        setErrors={setErrors}
        editingUser={editingUser}
      />

      <style>{`
        .animate-fade { animation: fade 0.2s ease-in; }
        .animate-scale-in { animation: scaleIn 0.2s ease; }
        .animate-slide-in { animation: slideIn 0.3s ease; }

        @keyframes fade { from {opacity:0} to {opacity:1} }
        @keyframes scaleIn { from {transform:scale(.9);opacity:0} to {transform:scale(1);opacity:1} }
        @keyframes slideIn { from {transform:translateX(100%);opacity:0} to {transform:translateX(0);opacity:1} }
      `}</style>
    </div>
  );
}