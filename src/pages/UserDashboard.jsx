import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import RequestForm from "../components/user/RequestForm";
import RequestList from "../components/user/RequestList";
import Toast from "../components/Toast";

export default function UserDashboard() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [type, setType] = useState("timeoff");

  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    serviceNeeded: "",
    amount: "",
    reason: "",
  });

  const fetchData = async () => {
    const data = await fetch("http://localhost:3001/requests").then(r => r.json());
    setRequests(data.filter(r => r.userId === user.id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const validate = () => {
    const e = {};

    if (type === "timeoff" && !form.startDate) e.startDate = "Required";

    if (type === "service") {
      if (!form.serviceNeeded) e.serviceNeeded = "Required";
      if (!form.startDate) e.startDate = "Required";
    }

    if (type === "reimbursement") {
      if (!form.amount) e.amount = "Required";
      if (!form.reason) e.reason = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    await fetch("http://localhost:3001/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: `req-${Date.now()}`,
        userId: user.id,
        type,
        status: "pending",
        ...form,
      }),
    });

    setForm({
      startDate: "",
      endDate: "",
      serviceNeeded: "",
      amount: "",
      reason: "",
    });

    showToast("Request submitted");
    fetchData();
  };

  return (
    <div className="space-y-8">

      <Toast message={toast} />

      <h1 className="text-2xl font-semibold">My Dashboard</h1>

      <RequestForm
        type={type}
        setType={setType}
        form={form}
        setForm={setForm}
        errors={errors}
        setErrors={setErrors}
        onSubmit={submit}
      />

      <RequestList
        requests={requests}
        onDelete={async (id) => {
          await fetch(`http://localhost:3001/requests/${id}`, {
            method: "DELETE",
          });
          fetchData();
        }}
      />

      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}