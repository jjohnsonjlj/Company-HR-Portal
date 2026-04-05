import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthGuard({ role }) {
  const { user } = useAuth();

  // ❌ no redirect anymore
  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Please log in to access this page.
      </div>
    );
  }

  if (role && user.role !== role) {
    return (
      <div className="p-6 text-center text-red-500">
        Access denied.
      </div>
    );
  }

  return <Outlet />;
}