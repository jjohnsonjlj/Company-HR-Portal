export default function RequestsTable({ requests, users, onUpdate, onDelete }) {
  const normalizeType = (type) => type?.toLowerCase();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Details</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => {
            const user = users.find((u) => u.id === r.userId);
            const type = normalizeType(r.type);

            return (
              <tr key={`request-${r.id}`} className="border-b">
                <td>{user?.name || "Unknown"}</td>
                <td className="capitalize">{type}</td>

                <td>
                  {type === "timeoff" && `${r.startDate} → ${r.endDate}`}
                  {type === "service" && r.serviceNeeded}
                  {type === "reimbursement" && `$${r.amount} - ${r.reason}`}
                </td>

                <td className="capitalize">{r.status}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => onUpdate(r, "approved")}
                    className="text-green-500"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => onUpdate(r, "denied")}
                    className="text-red-500"
                  >
                    Deny
                  </button>

                  <button
                    onClick={() => onDelete(r.id)}
                    className="text-gray-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}