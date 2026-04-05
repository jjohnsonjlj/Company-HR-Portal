export default function RequestForm({
  type,
  setType,
  form,
  setForm,
  errors,
  setErrors,
  onSubmit,
}) {
  const inputClass = (field) =>
    `w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-800
     text-sm transition outline-none
     ${
       errors[field]
         ? "border-red-500 focus:ring-2 focus:ring-red-400"
         : "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
     }`;

  const labelClass =
    "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-6 border border-gray-200 dark:border-gray-700">

      {/* TYPE SELECT */}
      <div className="space-y-1">
        <label className={labelClass}>Request Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
        >
          <option value="timeoff">Time Off</option>
          <option value="service">Service</option>
          <option value="reimbursement">Reimbursement</option>
        </select>
      </div>

      {/* TIME OFF */}
      {type === "timeoff" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <label className={labelClass}>Start Date</label>
            <input
              type="date"
              className={inputClass("startDate")}
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
                setErrors({ ...errors, startDate: "" });
              }}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className={labelClass}>End Date</label>
            <input
              type="date"
              className={inputClass("endDate")}
              value={form.endDate}
              onChange={(e) => {
                setForm({ ...form, endDate: e.target.value });
                setErrors({ ...errors, endDate: "" });
              }}
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>

        </div>
      )}

      {/* SERVICE */}
      {type === "service" && (
        <div className="space-y-4">

          <div className="space-y-1">
            <label className={labelClass}>Service Needed</label>
            <input
              placeholder="Describe the service..."
              className={inputClass("serviceNeeded")}
              value={form.serviceNeeded}
              onChange={(e) => {
                setForm({ ...form, serviceNeeded: e.target.value });
                setErrors({ ...errors, serviceNeeded: "" });
              }}
            />
            {errors.serviceNeeded && (
              <p className="text-red-500 text-xs">{errors.serviceNeeded}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Requested Date</label>
            <input
              type="date"
              className={inputClass("startDate")}
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
                setErrors({ ...errors, startDate: "" });
              }}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

        </div>
      )}

      {/* REIMBURSEMENT */}
      {type === "reimbursement" && (
        <div className="space-y-4">

          <div className="space-y-1">
            <label className={labelClass}>Amount ($)</label>
            <input
              placeholder="0.00"
              className={inputClass("amount")}
              value={form.amount}
              onChange={(e) => {
                setForm({ ...form, amount: e.target.value });
                setErrors({ ...errors, amount: "" });
              }}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Reason</label>
            <input
              placeholder="Explain the purchase..."
              className={inputClass("reason")}
              value={form.reason}
              onChange={(e) => {
                setForm({ ...form, reason: e.target.value });
                setErrors({ ...errors, reason: "" });
              }}
            />
            {errors.reason && (
              <p className="text-red-500 text-xs">{errors.reason}</p>
            )}
          </div>

        </div>
      )}

      {/* SUBMIT */}
      <div className="pt-2">
        <button
          onClick={onSubmit}
          className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-green-600 transition border border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}