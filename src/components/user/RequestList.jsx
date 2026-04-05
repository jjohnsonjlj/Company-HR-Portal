export default function RequestList({ requests, onDelete }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="mb-3 font-medium">My Requests</h2>

      {requests.map((r) => (
        <div key={r.id} className="flex justify-between border-b py-2 text-sm">

          <span>
            {r.type === "timeoff" && `${r.startDate} → ${r.endDate}`}
            {r.type === "service" && r.serviceNeeded}
            {r.type === "reimbursement" && `$${r.amount} - ${r.reason}`}
          </span>

          <div className="space-x-3">
            <span className="capitalize">{r.status}</span>

            <button
              onClick={() => onDelete(r.id)}
              className="text-red-400 text-xs"
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}