export default function EmployeeModal({
  show,
  onClose,
  onSave,
  newUser,
  setNewUser,
  errors,
  setErrors,
  editingUser,
}) {
  if (!show) return null;

  const inputClass = (field) =>
    `p-2 border rounded w-full dark:bg-gray-700 ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-fade">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-3 animate-scale-in">

        <input
          placeholder="Full Name"
          value={newUser.name}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
            setErrors({ ...errors, name: "" });
          }}
          className={inputClass("name")}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            setErrors({ ...errors, email: "" });
          }}
          className={inputClass("email")}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        {!editingUser && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </>
        )}

        <input
          placeholder="Department"
          value={newUser.department}
          onChange={(e) => {
            setNewUser({ ...newUser, department: e.target.value });
            setErrors({ ...errors, department: "" });
          }}
          className={inputClass("department")}
        />
        {errors.department && (
          <p className="text-red-500 text-xs">{errors.department}</p>
        )}

        <input
          placeholder="Position"
          value={newUser.position}
          onChange={(e) => {
            setNewUser({ ...newUser, position: e.target.value });
            setErrors({ ...errors, position: "" });
          }}
          className={inputClass("position")}
        />
        {errors.position && (
          <p className="text-red-500 text-xs">{errors.position}</p>
        )}

        <button
          onClick={onSave}
          className="bg-primary text-white px-4 py-2 rounded w-full"
        >
          {editingUser ? "Update" : "Create"}
        </button>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}