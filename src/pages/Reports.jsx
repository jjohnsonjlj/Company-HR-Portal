import { useEffect, useState } from "react";

export default function Reports() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users").then(r => r.json()).then(setUsers);
    fetch("http://localhost:3001/requests").then(r => r.json()).then(setRequests);
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Reports</h1>

      {users.map(u => (
        <div key={u.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow ">

          <h2 className="font-semibold">{u.name}</h2>
          <p className="text-sm text-gray-500">{u.department} • {u.position}</p>

          <ul className="mt-2 text-sm space-y-1">
            {requests.filter(r => r.userId === u.id).map(r => (
              <li key={r.id}>

                {r.type === "timeoff" && (
                  <>Time Off: {r.startDate} → {r.endDate}</>
                )}

                {r.type === "service" && (
                  <>Service: {r.serviceNeeded}</>
                )}

                {r.type === "reimbursement" && (
                  <>Reimbursement: ${r.amount} - {r.reason}</>
                )}

                {" - "}
                <span className="capitalize">{r.status}</span>

              </li>
            ))}
          </ul>

        </div>
      ))}

    </div>
  );
}