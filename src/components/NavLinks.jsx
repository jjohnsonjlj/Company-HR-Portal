import { Link, useLocation } from "react-router-dom";

export default function NavLinks({ user, mobile = false }) {
  const location = useLocation();

  const linkClass = (isActive = false) => {
  return isActive
    ? "px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary"
    : "px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition";
};

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={mobile ? "flex flex-col" : "flex gap-4"}>
      <Link to="/" className={linkClass(isActive("/"))}>Home</Link>

      {user?.isLoggedIn && user?.role === "EMPLOYEE" && (
        <>
          <Link to="/dashboard" className={linkClass(isActive("/dashboard"))}>Dashboard</Link>
          <Link to="/leave" className={linkClass(isActive("/leave"))}>Leave</Link>
          <Link to="/profile" className={linkClass(isActive("/profile"))}>Profile</Link>
        </>
      )}

      {user?.isLoggedIn && user?.role === "HR" && (
        <>
          <Link to="/dashboard" className={linkClass(isActive("/dashboard"))}>Dashboard</Link>
          <Link to="/employees" className={linkClass(isActive("/employees"))}>Employees</Link>
          <Link to="/approvals" className={linkClass(isActive("/approvals"))}>Approvals</Link>
          <Link to="/reports" className={linkClass(isActive("/reports"))}>Reports</Link>
          <Link to="/onboarding" className={linkClass(isActive("/onboarding"))}>Onboarding</Link>
        </>
      )}
    </nav>
  );
}