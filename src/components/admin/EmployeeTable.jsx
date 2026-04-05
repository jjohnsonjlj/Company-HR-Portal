export default function EmployeeTable({ users, onEdit, onDelete, onAdd }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employees</h2>

        <button
          onClick={onAdd}
          className="text-primary font-medium hover:underline"
        >
          + Add Employee
        </button>
      </div>

      <table className="w-full text-sm">
        <tbody>
          {users.map((u) => (
            <tr key={`user-${u.id}`} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.department}</td>
              <td>{u.role}</td>

              <td className="space-x-2">
                <button onClick={() => onEdit(u)} className="text-blue-500">
                  Edit
                </button>
                <button onClick={() => onDelete(u.id)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}